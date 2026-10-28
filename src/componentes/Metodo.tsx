const PASSOS = [
  [
    "Conversa inicial",
    "Pelo WhatsApp ou pessoalmente. Você conta sua rotina, seu histórico com atividade física e o que quer mudar.",
  ],
  [
    "Avaliação e objetivos",
    "Observamos movimento, limitações e condicionamento para definir metas realistas e a modalidade mais adequada.",
  ],
  [
    "Aulas acompanhadas",
    "Treinos planejados para você, com correção de técnica em cada exercício e intensidade ajustada aula a aula.",
  ],
  [
    "Revisão do progresso",
    "De tempos em tempos revemos o que avançou e o que precisa mudar. O plano acompanha a sua evolução.",
  ],
] as const;

const PRINCIPIOS = [
  [
    "Técnica antes da carga",
    "Aprender o movimento certo vem antes de aumentar peso, velocidade ou repetições.",
  ],
  [
    "Respeito ao seu momento",
    "Idade, rotina, histórico de lesões e nível de experiência definem o ponto de partida.",
  ],
  [
    "Constância sem exagero",
    "Resultado vem da regularidade. Nada de promessas rápidas: o objetivo é treinar bem por muitos anos.",
  ],
] as const;

/** Como trabalho: quatro passos e três princípios. */
export function Metodo() {
  return (
    <section className="secao escuro" id="metodo">
      <div className="wrap">
        <div className="cabeca revela">
          <span className="rotulo">Como trabalho</span>
          <h2>
            Do primeiro contato à evolução, <em className="acento">passo a passo.</em>
          </h2>
          <p>
            Nenhum treino começa pela carga. Começa por entender quem você é, o que você busca e o
            que o seu corpo precisa agora.
          </p>
        </div>
        <ol className="passos revela" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {PASSOS.map(([t, p], i) => (
            <li key={t} className="passo">
              <span className="num">{i + 1}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
        <div className="principios">
          {PRINCIPIOS.map(([t, p]) => (
            <div key={t} className="principio revela">
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
