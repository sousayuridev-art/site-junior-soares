import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/config";

/**
 * Chamada às funções públicas do banco do Hub (card SITE-CLI-1). `fetch` direto no PostgREST
 * com a chave publishable, sem o pacote supabase-js (mesmo padrão do site da Fora do Papel).
 */

export type OpcoesBanco = {
  buscar?: typeof fetch;
  /** Tempo máximo de cada chamada, em milissegundos (padrão 2 s). */
  tempoLimite?: number;
  dominio?: string;
};

export const TEMPO_LIMITE_PADRAO = 2000;

export class FalhaNoBanco extends Error {
  /** Código do erro do banco (ex.: `muitas_tentativas`), quando houver. */
  codigo: string | null;
  constructor(mensagem: string, codigo: string | null = null) {
    super(mensagem);
    this.codigo = codigo;
  }
}

export async function rpcPublica(
  nome: string,
  corpo: object,
  o: OpcoesBanco & { manterAberta?: boolean } = {},
): Promise<unknown> {
  const buscar = o.buscar ?? fetch;
  const controle = new AbortController();
  const tempo = setTimeout(() => controle.abort(), o.tempoLimite ?? TEMPO_LIMITE_PADRAO);
  try {
    const resposta = await buscar(`${SUPABASE_URL}/rest/v1/rpc/${nome}`, {
      method: "POST",
      signal: controle.signal,
      // Clique que abre o WhatsApp: o registro continua mesmo se a página sair.
      ...(o.manterAberta ? { keepalive: true } : {}),
      headers: { "Content-Type": "application/json", apikey: SUPABASE_PUBLISHABLE_KEY },
      body: JSON.stringify(corpo),
    });
    if (!resposta.ok) {
      let codigo: string | null = null;
      try {
        const e = (await resposta.json()) as { message?: unknown };
        codigo = typeof e.message === "string" ? e.message : null;
      } catch {
        codigo = null;
      }
      throw new FalhaNoBanco(`${nome}: HTTP ${resposta.status}`, codigo);
    }
    return (await resposta.json()) as unknown;
  } catch (erro) {
    if (erro instanceof FalhaNoBanco) throw erro;
    throw new FalhaNoBanco(
      `${nome}: ${controle.signal.aborted ? "tempo esgotado" : "sem conexão"}`,
    );
  } finally {
    clearTimeout(tempo);
  }
}
