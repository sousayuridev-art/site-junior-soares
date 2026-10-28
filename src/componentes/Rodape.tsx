import { useEffect, useState } from "react";

import { BotaoZap, IconeZap } from "@/componentes/BotaoZap";
import { useNegocio } from "@/componentes/negocio";
import { LinkInstagram } from "@/componentes/Sobre";
import { PESSOA } from "@/dados/junior";

/** Rodapé de todas as páginas: nome, navegação e contato vêm dos dados do negócio. */
export function Rodape({ ancoras = true }: { ancoras?: boolean }) {
  const { nome, horario } = useNegocio();
  const base = ancoras ? "" : "/";
  return (
    <footer className="rodape">
      <div className="wrap">
        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <img src="/midia/midia-48.svg" alt={nome} width="350" height="56" />
          <p style={{ maxWidth: "28em" }}>
            Treinador com mais de 15 anos de experiência. Consultoria online e aulas presenciais de
            treino periodizado, musculação, funcional, Yoga e Pilates solo.
          </p>
        </div>
        <div>
          <p className="rodape-tit">Navegação</p>
          <ul>
            {[
              ["planos", "Planos"],
              ["modalidades", "Modalidades"],
              ["metodo", "Como trabalho"],
              ["sobre", "Sobre"],
              ["galeria", "Galeria"],
              ["duvidas", "Dúvidas"],
            ].map(([id, n]) => (
              <li key={id}>
                <a href={`${base}#${id}`}>{n}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="rodape-tit">Contato</p>
          <ul>
            <li>
              <BotaoZap>WhatsApp</BotaoZap>
            </li>
            <li>
              <LinkInstagram />
            </li>
            <li>
              <a href={`mailto:${PESSOA.email}`}>{PESSOA.email}</a>
            </li>
            <li>{PESSOA.cidade}</li>
            <li>Horários: {horario}</li>
            <li>CREF: {PESSOA.cref}</li>
          </ul>
        </div>
        <div className="base">
          <span>
            © {new Date().getFullYear()} {nome}
          </span>
          <span>As informações deste site não substituem avaliação médica.</span>
        </div>
      </div>
    </footer>
  );
}

/** Botão flutuante: aparece depois do topo, que já tem os próprios botões. */
export function ZapFlutuante() {
  const [oculto, setOculto] = useState(true);
  useEffect(() => {
    const hero = document.getElementById("inicio");
    const atualiza = () => setOculto(scrollY < (hero?.offsetHeight ?? 0) * 0.7);
    addEventListener("scroll", atualiza, { passive: true });
    atualiza();
    return () => removeEventListener("scroll", atualiza);
  }, []);
  return (
    <BotaoZap className={oculto ? "zap oculto" : "zap"} rotulo="Falar no WhatsApp">
      <IconeZap />
      <span>WhatsApp</span>
    </BotaoZap>
  );
}
