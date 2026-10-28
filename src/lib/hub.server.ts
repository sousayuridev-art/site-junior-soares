import type { Data } from "@puckeditor/core";

import { FalhaNoBanco, rpcPublica, type OpcoesBanco } from "@/lib/banco";
import { SITE_DOMINIO } from "@/lib/config";
import { montarNegocio, NEGOCIO_RESERVA, type Negocio } from "@/lib/negocio";
import { tiposDeSecao } from "@/secoes/config";

/**
 * Leitura do Hub no servidor, com reserva (card SITE-CLI-1, req. 3, 4 e 7).
 * - Banco falhou ou demorou mais de 2 s: reserva estática, o visitante nunca vê erro.
 * - Cache em memória: 2 min com o banco, 30 s na reserva. Somado ao `CABECALHO_CACHE`
 *   das páginas, uma publicação no painel aparece em até 5 minutos.
 */

export const CACHE_MS = 120_000;
export const CACHE_RESERVA_MS = 30_000;

export type Fonte = "banco" | "reserva";
type Entrada<T> = { valor: Promise<{ dado: T; fonte: Fonte }>; ate: number };
type Opcoes = OpcoesBanco & { agora?: () => number };

/**
 * Teto de entradas: cada endereço inventado por um robô (/a1, /a2…) viraria uma entrada para
 * sempre. Cheio, sai primeiro o que já venceu e, se precisar, o mais antigo (revisão de 28/10).
 */
export const MAX_ENTRADAS = 200;
const caches = new Map<string, Entrada<unknown>>();
export const tamanhoCacheHub = () => caches.size;

function guardar(chave: string, e: Entrada<unknown>, agora: number) {
  caches.delete(chave);
  if (caches.size >= MAX_ENTRADAS) {
    for (const [k, v] of caches) if (v.ate <= agora) caches.delete(k);
    while (caches.size >= MAX_ENTRADAS) {
      const maisAntiga = caches.keys().next().value;
      if (maisAntiga === undefined) break;
      caches.delete(maisAntiga);
    }
  }
  caches.set(chave, e);
}
export function limparCacheHub() {
  caches.clear();
}

async function comCache<T>(
  chave: string,
  produzir: () => Promise<{ dado: T; fonte: Fonte }>,
  agora: () => number,
): Promise<{ dado: T; fonte: Fonte }> {
  const atual = caches.get(chave) as Entrada<T> | undefined;
  if (atual && atual.ate > agora()) return atual.valor;
  // Enquanto a busca corre, pedidos iguais esperam a mesma promessa.
  const entrada: Entrada<T> = { valor: produzir(), ate: agora() + CACHE_MS };
  guardar(chave, entrada as Entrada<unknown>, agora());
  const r = await entrada.valor;
  entrada.ate = agora() + (r.fonte === "banco" ? CACHE_MS : CACHE_RESERVA_MS);
  return r;
}

export function negocioComReserva(o: Opcoes = {}) {
  return comCache<Negocio>(
    "negocio",
    async () => {
      try {
        const r = await rpcPublica(
          "site_publico_negocio",
          { p_dominio: o.dominio ?? SITE_DOMINIO },
          o,
        );
        // null = domínio ainda não cadastrado no Hub.
        if (r === null) throw new FalhaNoBanco("site_publico_negocio: site não encontrado");
        return { dado: montarNegocio(r), fonte: "banco" };
      } catch (erro) {
        console.warn("[hub] dados do negócio: usando a reserva.", String(erro));
        return { dado: NEGOCIO_RESERVA, fonte: "reserva" };
      }
    },
    o.agora ?? Date.now,
  );
}

const SECOES = new Set<string>(tiposDeSecao);

/**
 * Confere o formato da página publicada. Seção que o site não conhece (pacote novo no Hub)
 * sai da página e o resto renderiza; aviso no log. Fora do formato: null (usa a reserva).
 */
export function conferirPagina(v: unknown): Data | null {
  if (!v || typeof v !== "object") return null;
  const d = v as Record<string, unknown>;
  if (!Array.isArray(d["content"])) return null;
  const desconhecidas: string[] = [];
  const content = (d["content"] as unknown[]).filter((item) => {
    if (!item || typeof item !== "object") return false;
    const i = item as Record<string, unknown>;
    if (typeof i["type"] !== "string" || !i["props"] || typeof i["props"] !== "object")
      return false;
    if (!SECOES.has(i["type"])) {
      desconhecidas.push(i["type"]);
      return false;
    }
    return true;
  });
  if (desconhecidas.length)
    console.warn(`[hub] seções desconhecidas ignoradas: ${desconhecidas.join(", ")}`);
  if (content.length === 0) return null;
  const root = d["root"] && typeof d["root"] === "object" ? d["root"] : { props: {} };
  return { root, content } as Data;
}

/** Página publicada no caminho, ou null (sem página, fora do formato ou banco fora). */
export function paginaComReserva(caminho: string, o: Opcoes = {}) {
  return comCache<Data | null>(
    `pagina:${caminho}`,
    async () => {
      try {
        const r = await rpcPublica(
          "site_publico_pagina",
          { p_dominio: o.dominio ?? SITE_DOMINIO, p_caminho: caminho },
          o,
        );
        return { dado: r === null ? null : conferirPagina(r), fonte: "banco" };
      } catch (erro) {
        console.warn(`[hub] página ${caminho}: usando a reserva.`, String(erro));
        return { dado: null, fonte: "reserva" };
      }
    },
    o.agora ?? Date.now,
  );
}
