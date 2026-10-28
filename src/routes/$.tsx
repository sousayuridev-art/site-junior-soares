import { createFileRoute, notFound } from "@tanstack/react-router";

import { Pagina } from "@/componentes/Pagina";
import { cabecaDaPagina } from "@/lib/cabeca";
import { CABECALHO_CACHE } from "@/lib/config";
import { dadosDaRota } from "@/lib/hub";

/**
 * Qualquer outro endereço: página criada no Hub para este site (ex.: /promocao).
 * Sem página publicada no caminho: 404.
 */
export const Route = createFileRoute("/$")({
  loader: async ({ params }) => {
    const caminho = `/${params._splat ?? ""}`;
    const dados = await dadosDaRota({ data: caminho });
    if (!dados.pagina) throw notFound();
    return { ...dados, caminho };
  },
  headers: () => ({ "Cache-Control": CABECALHO_CACHE }),
  head: ({ loaderData }) =>
    loaderData ? cabecaDaPagina(loaderData.caminho, loaderData.negocio, loaderData.pagina) : {},
  component: PaginaInterna,
});

function PaginaInterna() {
  const { negocio, pagina } = Route.useLoaderData();
  return <Pagina negocio={negocio} pagina={pagina} />;
}
