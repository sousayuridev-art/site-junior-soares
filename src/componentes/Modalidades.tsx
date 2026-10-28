import type { ReactNode } from "react";

import { BotaoZap, IconeSeta } from "@/componentes/BotaoZap";
import type { Assunto } from "@/dados/junior";

type Mod = {
  classe: string;
  midia: ReactNode;
  selo: string;
  onde: string;
  titulo: string;
  texto: string;
  itens: string[];
  assunto: Assunto;
  botao: string;
};

const foto = (n: string, alt: string, pos: string) => (
  <img src={`/midia/midia-${n}.webp`} alt={alt} loading="lazy" style={{ objectPosition: pos }} />
);

const MODS: Mod[] = [
  {
    classe: "mod span2",
    midia: foto("17", "Alunas em treino funcional na areia, puxando uma corda", "50% 60%"),
    selo: "Força e agilidade",
    onde: "Academia · condomínio · ao ar livre",
    titulo: "Treinamento funcional",
    texto:
      "Treinos com movimentos do dia a dia, cordas, cones e o próprio peso do corpo, com foco em resistência, agilidade e coordenação motora.",
    itens: ["Força, agilidade e coordenação", "Intensidade ajustada ao seu nível"],
    assunto: "funcional",
    botao: "Quero treino funcional",
  },
  {
    classe: "mod span2 calma",
    midia: foto("18", "Turma de Yoga na areia ao entardecer, sob tendas brancas", "50% 62%"),
    selo: "Respiração e mobilidade",
    onde: "Academia · na sua casa",
    titulo: "Yoga",
    texto:
      "Posturas, respiração e atenção ao corpo. Uma prática que melhora a mobilidade e ajuda a desacelerar, conduzida com orientação para cada nível.",
    itens: ["Flexibilidade e consciência corporal", "Para todas as idades e níveis"],
    assunto: "yoga",
    botao: "Quero fazer Yoga",
  },
  {
    classe: "mod span2 calma",
    midia: foto("19", "Turma de Pilates solo alongando com bola", "50% 55%"),
    selo: "No solo, com acessórios",
    onde: "Academia · na sua casa",
    titulo: "Pilates solo",
    texto:
      "Exercícios no colchonete, com bola e acessórios, para fortalecer o centro do corpo, melhorar a postura e controlar cada movimento.",
    itens: ["Estabilidade, postura e controle", "Baixo impacto, com progressão gradual"],
    assunto: "pilates",
    botao: "Quero fazer Pilates",
  },
];

/** Aulas presenciais em Aracaju: destaque do treino periodizado e três modalidades. */
export function Modalidades() {
  return (
    <section className="secao" id="modalidades">
      <div className="wrap">
        <div className="cabeca revela">
          <span className="rotulo">Aulas presenciais</span>
          <h2>
            Aulas presenciais em <em className="acento">Aracaju.</em>
          </h2>
          <p>
            Força, condicionamento, mobilidade e respiração. A modalidade muda conforme o seu
            objetivo e o seu momento; a atenção à técnica e ao seu limite continua a mesma.
          </p>
        </div>

        <div className="mods">
          <article className="mod mod-destaque revela">
            <div className="mod-midia">
              <div className="duo">
                <img
                  src="/midia/midia-15.webp"
                  alt="Junior acompanhando uma aluna em exercício de abdômen com roda"
                  loading="lazy"
                />
                <img
                  src="/midia/midia-16.webp"
                  alt="Junior correndo ao lado de uma aluna na orla"
                  loading="lazy"
                />
              </div>
              <span className="selo">Atendimento individual</span>
            </div>
            <div className="mod-corpo">
              <span className="onde">Academia · condomínio</span>
              <h3>Treino periodizado</h3>
              <p>
                Um plano montado em fases a partir da sua história, da sua rotina e do que você quer
                alcançar. Cada aula é acompanhada de perto, com correção de movimento e ajuste de
                carga conforme a sua evolução.
              </p>
              <ul>
                <li>Treino de força com técnica antes da carga</li>
                <li>Condicionamento e corrida orientada</li>
                <li>Adaptações para quem está começando ou voltando a treinar</li>
              </ul>
              <BotaoZap assunto="personal" className="link">
                Quero treino periodizado <IconeSeta />
              </BotaoZap>
            </div>
          </article>

          {MODS.map((m) => (
            <article key={m.titulo} className={`${m.classe} revela`}>
              <div className="mod-midia">
                {m.midia}
                <span className="selo">{m.selo}</span>
              </div>
              <div className="mod-corpo">
                <span className="onde">{m.onde}</span>
                <h3>{m.titulo}</h3>
                <p>{m.texto}</p>
                <ul>
                  {m.itens.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <BotaoZap assunto={m.assunto} className="link">
                  {m.botao} <IconeSeta />
                </BotaoZap>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
