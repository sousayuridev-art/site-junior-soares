import { createServerFn } from "@tanstack/react-start";

import { negocioComReserva, paginaComReserva } from "@/lib/hub.server";

const CAMINHO = /^\/([a-z0-9-]+(\/[a-z0-9-]+)*)?$/;

/**
 * Dados de uma rota: página publicada no Hub (ou null) e dados do negócio. No carregamento roda
 * direto no servidor; na navegação o navegador chama o servidor. O banco nunca é chamado pelo
 * navegador para ler conteúdo (só para registrar o clique no WhatsApp).
 */
export const dadosDaRota = createServerFn({ method: "GET" })
  .validator((caminho: unknown) => {
    const c = typeof caminho === "string" ? caminho.toLowerCase().replace(/\/+$/, "") || "/" : "/";
    return CAMINHO.test(c) && c.length <= 120 ? c : null;
  })
  .handler(async ({ data: caminho }) => {
    const [negocio, pagina] = await Promise.all([
      negocioComReserva(),
      caminho
        ? paginaComReserva(caminho)
        : Promise.resolve({ dado: null, fonte: "banco" as const }),
    ]);
    return { negocio: negocio.dado, pagina: pagina.dado };
  });
