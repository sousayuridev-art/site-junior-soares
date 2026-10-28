import { createFileRoute } from "@tanstack/react-router";

import { CABECALHO_CACHE, SITE_URL } from "@/lib/config";

/**
 * Mapa do site. Hoje só a página inicial: o Hub ainda não tem uma função pública que liste as
 * páginas publicadas de um site (pedido registrado no card SITE-CLI-1 deste repositório).
 * Não pode existir `public/sitemap.xml`: arquivo em `public/` é servido antes desta rota.
 */
export function gerarSitemap(caminhos: string[] = ["/"]): string {
  const urls = caminhos
    .map((c) => `  <url>\n    <loc>${SITE_URL}${c === "/" ? "/" : c}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(gerarSitemap(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": CABECALHO_CACHE,
          },
        }),
    },
  },
});
