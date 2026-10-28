import { useState } from "react";

import { BotaoZap, IconeZap } from "@/componentes/BotaoZap";

const LINKS = [
  ["#consultoria", "Consultoria online"],
  ["#planos", "Planos"],
  ["#modalidades", "Aulas presenciais"],
  ["#metodo", "Como trabalho"],
  ["#sobre", "Sobre"],
  ["#duvidas", "Dúvidas"],
] as const;

/** Cabeçalho fixo; no celular o menu abre por baixo com o botão de WhatsApp. */
export function Topo() {
  const [aberto, setAberto] = useState(false);
  return (
    <header className="topo">
      <div className="wrap">
        <a href="#inicio" className="marca" aria-label="Junior Soares Personal, ir para o início">
          <img src="/midia/midia-04.svg" alt="Junior Soares Personal" width="250" height="40" />
        </a>
        <nav
          className={aberto ? "menu aberto" : "menu"}
          id="menu"
          aria-label="Seções do site"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setAberto(false);
          }}
        >
          {LINKS.map(([href, nome]) => (
            <a key={href} href={href}>
              {nome}
            </a>
          ))}
          {aberto && (
            <BotaoZap className="btn btn-sol so-menu">
              <IconeZap />
              Falar no WhatsApp
            </BotaoZap>
          )}
        </nav>
        <a className="btn btn-sol" href="#planos">
          Ver planos
        </a>
        <button
          className="abrir-menu"
          type="button"
          aria-expanded={aberto}
          aria-controls="menu"
          onClick={() => setAberto((a) => !a)}
        >
          <span className="sr">{aberto ? "Fechar menu" : "Abrir menu"}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
