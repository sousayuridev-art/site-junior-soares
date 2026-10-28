import type { Data } from "@puckeditor/core";
import { lazy, Suspense } from "react";

import { NegocioProvider } from "@/componentes/negocio";
import { PaginaJunior } from "@/componentes/PaginaJunior";
import type { Negocio } from "@/lib/negocio";

// O editor de seções só vai para o navegador quando há página publicada no Hub.
const PaginaDoHub = lazy(() => import("@/componentes/PaginaDoHub"));

/** Página do banco quando publicada; senão, o visual estático do site (reserva). */
export function Pagina({ negocio, pagina }: { negocio: Negocio; pagina: Data | null }) {
  return (
    <NegocioProvider valor={negocio}>
      {pagina ? (
        <Suspense fallback={null}>
          <PaginaDoHub pagina={pagina} negocio={negocio} />
        </Suspense>
      ) : (
        <PaginaJunior />
      )}
    </NegocioProvider>
  );
}
