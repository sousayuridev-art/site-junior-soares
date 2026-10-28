import { BotaoZap, IconeZap } from "@/componentes/BotaoZap";
import { PLANOS } from "@/dados/junior";

const PERGUNTAS: [string, string][] = [
  [
    "Preciso ter experiência para começar?",
    "Não. O ponto de partida é definido na conversa inicial e na avaliação. Os exercícios e a intensidade são adaptados ao seu nível, seja você iniciante ou já treine há anos.",
  ],
  [
    "Qual modalidade é melhor para mim?",
    "Depende do seu objetivo, da sua rotina e do seu histórico. Musculação e funcional trabalham força, condicionamento e composição corporal; Yoga e Pilates solo focam mobilidade, postura e controle. Na primeira conversa indicamos o melhor caminho, que pode combinar mais de uma.",
  ],
  [
    "Onde acontecem as aulas?",
    "Em Aracaju, nas academias onde atendo (B&M Fit Club, Selfit, Equilíbrio Academia e Paulo Bedeu) ou no condomínio do aluno. Yoga e Pilates solo também podem ser feitos na sua casa. O horário é combinado com cada aluno.",
  ],
  [
    "As aulas são individuais?",
    "Sim. O atendimento é individual, com toda a atenção em você. Também dá para treinar em dupla, com uma pessoa no mesmo horário.",
  ],
  [
    "Quanto custa?",
    "Os planos presenciais variam conforme a frequência (de 2 a 5 vezes por semana) e se você treina sozinho ou em dupla, com desconto na fidelidade de 3 ou 6 meses. Fale comigo no WhatsApp para receber a tabela.",
  ],
  [
    "Posso fazer só uma avaliação?",
    "Pode. A avaliação com bioimpedância custa R$ 40,00 e é feita por mim, na academia, em Aracaju.",
  ],
  [
    "Tenho dor ou lesão. Posso treinar?",
    "Conte sobre isso na conversa inicial. Em muitos casos é possível adaptar o treino. Quando necessário, pedimos a liberação do seu médico ou fisioterapeuta antes de começar.",
  ],
  [
    "Como funciona a consultoria online?",
    "Você escolhe um dos três planos e paga pelo link que eu envio no WhatsApp. Depois, preenche a anamnese online, com seu histórico de treinos e de saúde, e passa a receber treinos periodizados no aplicativo MFIT. Se mora em Aracaju, agendamos a bioimpedância na academia. Respondo suas dúvidas no mesmo dia e ajusto o treino sempre que for preciso. Serve para quem mora em outra cidade, tem horários difíceis ou prefere treinar sozinho com orientação.",
  ],
  [
    "Quais são os planos e valores da consultoria?",
    `Mensal por ${PLANOS.mensal.preco}, trimestral por ${PLANOS.trimestral.preco} por mês e semestral por ${PLANOS.semestral.preco} por mês. Os planos trimestral e semestral são pagos no cartão de crédito, com fidelidade de 3 e 6 meses. Todos incluem anamnese, treinos periodizados e dietas por biótipo; quem mora em Aracaju também tem bioimpedância.`,
  ],
  [
    "O que são as dietas por biótipo?",
    "São três opções de dieta, uma para cada biótipo (ectomorfo, mesomorfo e endomorfo), elaboradas por uma nutricionista parceira. Servem como ponto de partida. Para um plano alimentar individual, procure uma nutricionista.",
  ],
];

/** Dúvidas frequentes. */
export function Duvidas() {
  return (
    <section className="secao" id="duvidas" style={{ paddingTop: 0 }}>
      <div className="wrap duvidas">
        <div className="lado revela">
          <span className="rotulo" style={{ color: "var(--sol-tinta)" }}>
            Dúvidas
          </span>
          <h2>Antes de começar.</h2>
          <p>Não encontrou o que procurava? Mande sua pergunta pelo WhatsApp.</p>
          <div>
            <BotaoZap assunto="duvida" className="btn btn-mare">
              <IconeZap />
              Falar no WhatsApp
            </BotaoZap>
          </div>
        </div>
        <div className="revela">
          {PERGUNTAS.map(([p, r]) => (
            <details key={p}>
              <summary>{p}</summary>
              <p>{r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
