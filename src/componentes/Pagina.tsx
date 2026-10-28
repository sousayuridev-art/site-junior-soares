import type { Data } from "@puckeditor/core";
import { Component, lazy, Suspense, type ReactNode } from "react";

import { NegocioProvider } from "@/componentes/negocio";
import { PaginaJunior } from "@/componentes/PaginaJunior";
import type { Negocio } from "@/lib/negocio";

// O editor de seções só vai para o navegador quando há página publicada no Hub.
const PaginaDoHub = lazy(() => import("@/componentes/PaginaDoHub"));

/**
 * Se uma seção publicada quebrar ao desenhar (campo num formato que o site não espera),
 * o visitante vê o visual estático do site em vez de uma tela de erro (card SITE-CLI-1).
 */
class ComReserva extends Component<
  { children: ReactNode; reserva: ReactNode },
  { falhou: boolean }
> {
  override state = { falhou: false };
  static getDerivedStateFromError() {
    return { falhou: true };
  }
  override componentDidCatch(erro: unknown) {
    console.warn("[hub] página do painel não renderizou; usando a reserva.", String(erro));
  }
  override render() {
    return this.state.falhou ? this.props.reserva : this.props.children;
  }
}

/** Página do banco quando publicada; senão, o visual estático do site (reserva). */
export function Pagina({ negocio, pagina }: { negocio: Negocio; pagina: Data | null }) {
  return (
    <NegocioProvider valor={negocio}>
      {pagina ? (
        <ComReserva reserva={<PaginaJunior />}>
          <Suspense fallback={null}>
            <PaginaDoHub pagina={pagina} negocio={negocio} />
          </Suspense>
        </ComReserva>
      ) : (
        <PaginaJunior />
      )}
    </NegocioProvider>
  );
}
