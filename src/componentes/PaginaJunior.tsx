import { useEffect } from "react";

import { Consultoria } from "@/componentes/Consultoria";
import { Contato } from "@/componentes/Contato";
import { Duvidas } from "@/componentes/Duvidas";
import { Galeria } from "@/componentes/Galeria";
import { Metodo } from "@/componentes/Metodo";
import { Modalidades } from "@/componentes/Modalidades";
import { Faixa, Palco } from "@/componentes/Palco";
import { Rodape, ZapFlutuante } from "@/componentes/Rodape";
import { Simbolos } from "@/componentes/Simbolos";
import { Sobre } from "@/componentes/Sobre";
import { Topo } from "@/componentes/Topo";

/** Revelar ao rolar: parte de um estado visível e só desloca o que está abaixo da tela. */
function useRevelar() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("antes");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".revela").forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add("antes");
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, []);
}

/** Página inicial do Junior com o visual aprovado (reserva estática do card SITE-CLI-1). */
export function PaginaJunior() {
  useRevelar();
  return (
    <>
      <Simbolos />
      <Topo />
      <main>
        <Palco />
        <Faixa />
        <Consultoria />
        <Modalidades />
        <Metodo />
        <Sobre />
        <Galeria />
        <Duvidas />
        <Contato />
      </main>
      <Rodape />
      <ZapFlutuante />
    </>
  );
}
