import { createContext, useContext, type ReactNode } from "react";

import { NEGOCIO_RESERVA, type Negocio } from "@/lib/negocio";

/** Dados do negócio (Hub ou reserva) disponíveis para qualquer seção da página. */
const Contexto = createContext<Negocio>(NEGOCIO_RESERVA);

export function NegocioProvider({ valor, children }: { valor: Negocio; children: ReactNode }) {
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export const useNegocio = () => useContext(Contexto);
