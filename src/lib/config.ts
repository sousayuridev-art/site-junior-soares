/**
 * Configurações públicas do site. Nada aqui é segredo: a chave do Supabase do Hub é a
 * "publishable" (feita para o navegador; a segurança está nas regras do banco). Card SITE-CLI-1.
 * Variáveis VITE_* substituem os valores padrão quando definidas.
 */
const env = import.meta.env as Record<string, string | undefined>;

/**
 * Endereço do site. Ainda sem domínio próprio: usa o endereço provisório da publicação.
 * Quando o domínio chegar, troque aqui e na ficha do site no Hub (o banco identifica o site
 * pelo domínio).
 */
export const SITE_URL: string = env["VITE_SITE_URL"] || "https://juniorsoarespersonal.lovable.app";
/** Domínio do site no Hub (RPCs `site_publico_*` e `site_contato_registrar`). */
export const SITE_DOMINIO = new URL(SITE_URL).host;

export const SUPABASE_URL: string =
  env["VITE_SUPABASE_URL"] || "https://cjzzbpqwlpjvlawllfqy.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY: string =
  env["VITE_SUPABASE_PUBLISHABLE_KEY"] || "sb_publishable_wRX6xKN-zw5FrYY02chi5g_vZBtznAE";

/**
 * Cache das páginas lidas do Hub: CDN até 2 min + 1 min servindo a cópia antiga enquanto
 * renova. Somado aos 2 min do cache em memória do servidor, dá no máximo 5 min.
 */
export const CABECALHO_CACHE = "public, max-age=0, s-maxage=120, stale-while-revalidate=60";
