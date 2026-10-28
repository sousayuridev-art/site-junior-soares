import type { Data } from "@puckeditor/core";

import { PESSOA } from "@/dados/junior";
import { SITE_URL } from "@/lib/config";
import type { Negocio } from "@/lib/negocio";
import secoesCss from "../secoes.css?url";

/**
 * Dados estruturados dentro de <script>: o texto vem do painel (Ajustes), então "<", ">" e "&"
 * viram escapes do JSON. Sem isso, um "</script>" na descrição fecharia o bloco e rodaria
 * código no site (revisão de segurança de 28/10). O JSON continua o mesmo para o Google.
 */
export function jsonLdSeguro(dados: unknown): string {
  return JSON.stringify(dados)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Título, descrição e dados estruturados de cada página. Na inicial, título e descrição vêm de
 * "Como aparece no Google" (Ajustes, no painel); nas páginas do Hub, do título da página.
 */
export function cabecaDaPagina(caminho: string, negocio: Negocio, pagina: Data | null) {
  const url = `${SITE_URL}${caminho === "/" ? "" : caminho}`;
  const tituloPagina = (pagina?.root?.props as { titulo?: unknown } | undefined)?.titulo;
  const titulo =
    caminho === "/" || typeof tituloPagina !== "string" || !tituloPagina.trim()
      ? negocio.google.titulo
      : `${tituloPagina.trim()} | ${negocio.nome}`;
  const descricao = negocio.google.descricao;
  return {
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:url", content: url },
    ],
    links: [
      { rel: "canonical", href: url },
      // Seções do Hub usam Tailwind; só carrega quando a página vem do banco.
      ...(pagina ? [{ rel: "stylesheet", href: secoesCss }] : []),
    ],
    scripts:
      caminho === "/"
        ? [
            {
              type: "application/ld+json",
              children: jsonLdSeguro({
                "@context": "https://schema.org",
                "@type": "SportsActivityLocation",
                name: negocio.nome,
                description: descricao,
                url: SITE_URL,
                telephone: `+${negocio.whatsapp}`,
                email: PESSOA.email,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Aracaju",
                  addressRegion: "SE",
                  addressCountry: "BR",
                },
                sameAs: [`https://www.instagram.com/${negocio.instagram}/`],
              }),
            },
          ]
        : [],
  };
}
