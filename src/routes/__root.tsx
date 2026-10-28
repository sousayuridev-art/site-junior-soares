import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import juniorCss from "../junior.css?url";

const FONTES =
  "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@1&display=swap";

function NaoEncontrada() {
  return (
    <>
      <title>Página não encontrada | Junior Soares Personal</title>
      <meta name="robots" content="noindex" />
      <main
        className="final"
        style={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}
      >
        <div className="wrap" style={{ display: "block", textAlign: "center" }}>
          <h2>Esta página não existe.</h2>
          <p style={{ marginInline: "auto" }}>
            O endereço pode ter mudado ou ter sido digitado errado.
          </p>
          <p>
            <a className="btn btn-sol" href="/">
              Voltar ao início
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0E2A33" },
      { property: "og:site_name", content: "Junior Soares Personal" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONTES },
      { rel: "stylesheet", href: juniorCss },
      { rel: "icon", href: "/midia/midia-01.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/midia/midia-02.png", sizes: "192x192", type: "image/png" },
      { rel: "apple-touch-icon", href: "/midia/midia-03.png" },
    ],
  }),
  shellComponent: Casca,
  component: Outlet,
  notFoundComponent: NaoEncontrada,
});

function Casca({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
