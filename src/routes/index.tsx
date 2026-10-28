import { createFileRoute } from "@tanstack/react-router";

import { Pagina } from "@/componentes/Pagina";
import { cabecaDaPagina } from "@/lib/cabeca";
import { CABECALHO_CACHE } from "@/lib/config";
import { dadosDaRota } from "@/lib/hub";

/**
 * Página inicial (card SITE-CLI-1). Busca no servidor a página "/" publicada no Hub e os dados
 * do negócio; sem página publicada (ou com o banco fora), mostra o visual estático do site.
 */
export const Route = createFileRoute("/")({
  loader: () => dadosDaRota({ data: "/" }),
  headers: () => ({ "Cache-Control": CABECALHO_CACHE }),
  head: ({ loaderData }) =>
    loaderData ? cabecaDaPagina("/", loaderData.negocio, loaderData.pagina) : {},
  component: Inicio,
});

function Inicio() {
  const { negocio, pagina } = Route.useLoaderData();
  return <Pagina negocio={negocio} pagina={pagina} />;
}
