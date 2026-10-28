import { RESERVA_GOOGLE, RESERVA_NEGOCIO, MENSAGENS, type Assunto } from "@/dados/junior";

/**
 * Dados do negócio publicados em Ajustes, no painel (card PC-6), num lugar só: rodapé,
 * contato, todos os botões de WhatsApp e o título e a descrição no Google (SITE-CLI-1, req. 4).
 * Cada campo sem valor no banco usa o valor estático de `src/dados/junior.ts`.
 */

export type LinhaHorario = { dias: string; fechado?: boolean; abre?: string; fecha?: string };

export type Negocio = {
  nome: string;
  /** Só números, com DDI 55. */
  whatsapp: string;
  /** Sem @. */
  instagram: string;
  endereco: string;
  /** Pronto para mostrar ("Seg a sex: 6h às 21h · Sáb: 7h às 12h"). */
  horario: string;
  google: { titulo: string; descricao: string };
};

export const NEGOCIO_RESERVA: Negocio = { ...RESERVA_NEGOCIO, google: { ...RESERVA_GOOGLE } };

const texto = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";
const HORA = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;

/** "06:00" → "6h"; "06:30" → "6h30". */
export function hora(h: string): string {
  const m = HORA.exec(h);
  if (!m) return h;
  return `${Number(m[1])}h${m[2] === "00" ? "" : m[2]}`;
}

/** Linhas do Hub em uma frase. Lista vazia ou fora do formato: null (usa a reserva). */
export function horarioEmTexto(v: unknown): string | null {
  if (!Array.isArray(v) || v.length === 0) return null;
  const partes: string[] = [];
  for (const l of v as unknown[]) {
    if (!l || typeof l !== "object") return null;
    const { dias, fechado, abre, fecha } = l as Record<string, unknown>;
    if (!texto(dias)) return null;
    if (fechado === true) partes.push(`${dias.trim()}: fechado`);
    else if (texto(abre) && texto(fecha) && HORA.test(abre) && HORA.test(fecha))
      partes.push(`${dias.trim()}: ${hora(abre)} às ${hora(fecha)}`);
    else return null;
  }
  return partes.join(" · ");
}

/** Número para o wa.me: só dígitos, com 55 na frente quando vier só com DDD. */
export function numeroWhatsapp(v: string): string {
  const n = v.replace(/\D/g, "");
  return n.length === 10 || n.length === 11 ? `55${n}` : n;
}

/** Resposta de `site_publico_negocio` → dados do site, campo a campo com reserva. */
export function montarNegocio(resposta: unknown): Negocio {
  const r = resposta && typeof resposta === "object" ? (resposta as Record<string, unknown>) : {};
  const n = (r["negocio"] && typeof r["negocio"] === "object" ? r["negocio"] : {}) as Record<
    string,
    unknown
  >;
  const g = (r["google"] && typeof r["google"] === "object" ? r["google"] : {}) as Record<
    string,
    unknown
  >;
  const zap = texto(n["whatsapp"]) ? numeroWhatsapp(n["whatsapp"]) : "";
  const insta = texto(n["instagram"]) ? n["instagram"].trim().replace(/^@/, "") : "";
  return {
    nome: texto(n["nome"]) ? n["nome"].trim() : NEGOCIO_RESERVA.nome,
    whatsapp: zap.length >= 12 && zap.length <= 13 ? zap : NEGOCIO_RESERVA.whatsapp,
    instagram: /^[A-Za-z0-9._]{1,30}$/.test(insta) ? insta : NEGOCIO_RESERVA.instagram,
    endereco: texto(n["endereco"]) ? n["endereco"].trim() : NEGOCIO_RESERVA.endereco,
    horario: horarioEmTexto(n["horario"]) ?? NEGOCIO_RESERVA.horario,
    google: {
      titulo: texto(g["titulo"]) ? g["titulo"].trim() : NEGOCIO_RESERVA.google.titulo,
      descricao: texto(g["descricao"]) ? g["descricao"].trim() : NEGOCIO_RESERVA.google.descricao,
    },
  };
}

export const linkWhatsapp = (numero: string, assunto: Assunto = "geral") =>
  `https://wa.me/${numero}?text=${encodeURIComponent(MENSAGENS[assunto])}`;

/** "5579991417553" → "(79) 99141-7553". */
export function telefoneExibicao(numero: string): string {
  const l = numero.replace(/\D/g, "").replace(/^55/, "");
  return `(${l.slice(0, 2)}) ${l.slice(2, -4)}-${l.slice(-4)}`;
}
