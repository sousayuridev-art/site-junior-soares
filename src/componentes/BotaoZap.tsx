import type { ReactNode } from "react";

import { useNegocio } from "@/componentes/negocio";
import type { Assunto } from "@/dados/junior";
import { registrarCliqueWhatsapp } from "@/lib/contato";
import { linkWhatsapp } from "@/lib/negocio";

/**
 * Todo botão de WhatsApp do site: número dos dados do negócio, mensagem pronta do assunto e
 * clique registrado em Contatos no painel, sem segurar a abertura do WhatsApp.
 */
export function BotaoZap({
  assunto = "geral",
  className,
  children,
  rotulo,
}: {
  assunto?: Assunto;
  className?: string;
  children: ReactNode;
  rotulo?: string;
}) {
  const { whatsapp } = useNegocio();
  return (
    <a
      className={className}
      href={linkWhatsapp(whatsapp, assunto)}
      target="_blank"
      rel="noopener"
      aria-label={rotulo}
      onClick={() => {
        void registrarCliqueWhatsapp(`${window.location.pathname}#${assunto}`);
      }}
    >
      {children}
    </a>
  );
}

export function IconeZap() {
  return (
    <svg aria-hidden="true">
      <use href="#i-zap" />
    </svg>
  );
}

export function IconeSeta() {
  return (
    <svg aria-hidden="true">
      <use href="#i-seta" />
    </svg>
  );
}
