import { rpcPublica, type OpcoesBanco } from "@/lib/banco";
import { SITE_DOMINIO } from "@/lib/config";

/**
 * Clique no WhatsApp entra na caixa de Contatos do painel (card PC-5, SITE-CLI-1 req. 6).
 * Não atrasa a abertura do WhatsApp: o link abre normalmente e o registro vai em paralelo,
 * com `keepalive` para continuar se a página sair. Falha é ignorada em silêncio: o banco
 * fora do ar nunca impede a conversa.
 */
export function registrarCliqueWhatsapp(pagina: string, o: OpcoesBanco = {}): Promise<void> {
  return rpcPublica(
    "site_contato_registrar",
    {
      p_dominio: o.dominio ?? SITE_DOMINIO,
      p_dados: { origem: "whatsapp", pagina: pagina.slice(0, 120) },
    },
    { ...o, manterAberta: true, tempoLimite: o.tempoLimite ?? 5000 },
  ).then(
    () => undefined,
    () => undefined,
  );
}
