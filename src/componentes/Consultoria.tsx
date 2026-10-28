import { BotaoZap, IconeZap } from "@/componentes/BotaoZap";
import { contaDoPlano, PLANOS } from "@/dados/junior";

const PASSOS = [
  [
    "Anamnese inicial",
    "Entendo sua rotina, seu histórico, suas limitações e o que você quer alcançar.",
  ],
  [
    "Treinos periodizados",
    "O treino é organizado em fases, com progressão planejada, em vez de exercícios soltos.",
  ],
  [
    "Do seu jeito",
    "Para quem mora em outra cidade, tem horários difíceis ou prefere treinar sozinho com orientação.",
  ],
] as const;

const PASSO_PAGAMENTO = "Você fala com o Junior no WhatsApp e recebe o link de pagamento.";

/** Consultoria online e os três planos. */
export function Consultoria() {
  const tri = contaDoPlano(PLANOS.trimestral);
  const sem = contaDoPlano(PLANOS.semestral);
  return (
    <section className="secao consult" id="consultoria">
      <div className="wrap consult-grade">
        <div className="consult-texto revela">
          <span className="rotulo">Consultoria online</span>
          <h2>
            Treine comigo <em className="acento">de onde você estiver.</em>
          </h2>
          <p>
            A mesma experiência das aulas presenciais, adaptada à sua rotina. Você treina na
            academia, em casa ou em viagem, com um plano montado para você.
          </p>
          <ol className="consult-passos">
            {PASSOS.map(([t, p], i) => (
              <li key={t}>
                <span>{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="incluso revela" aria-label="Incluído em todos os planos">
          <span className="plano-rotulo">Em todos os planos</span>
          <ul>
            <li>
              <span>
                <b>Anamnese inicial</b> e avaliação de partida
              </span>
            </li>
            <li>
              <span>
                <b>Treinos periodizados</b> no aplicativo MFIT, com vídeos de execução
              </span>
            </li>
            <li>
              <span>
                <b>Dietas por biótipo</b> (ectomorfo, mesomorfo e endomorfo), elaboradas por
                nutricionista parceira
              </span>
            </li>
            <li>
              <span>
                <b>Bioimpedância</b> feita por mim, na academia, para quem mora em Aracaju
              </span>
            </li>
          </ul>
        </aside>
      </div>
      <div className="wrap planos revela" id="planos">
        <article className="plano-card">
          <span className="plano-rotulo">Mensal</span>
          <p className="preco">
            {PLANOS.mensal.preco}
            <small>/mês</small>
          </p>
          <ul>
            <li>
              <span>Sem fidelidade: experimente antes de um plano maior</span>
            </li>
            <li>
              <span>{PLANOS.mensal.bio} bioimpedância*</span>
            </li>
          </ul>
          <BotaoZap assunto="mensal" className="btn btn-linha">
            Quero o mensal
          </BotaoZap>
          <p className="plano-passo">{PASSO_PAGAMENTO}</p>
        </article>
        <article className="plano-card">
          <span className="plano-rotulo">Trimestral</span>
          <p className="preco">
            {PLANOS.trimestral.preco}
            <small>/mês</small>
          </p>
          <ul>
            <li>
              <span>
                3x de {PLANOS.trimestral.preco} no cartão: total de {tri.total}
              </span>
            </li>
            <li className="economia">
              <span>Economia de {tri.economia} em relação ao mensal</span>
            </li>
            <li>
              <span>{PLANOS.trimestral.bio} bioimpedâncias*</span>
            </li>
          </ul>
          <BotaoZap assunto="trimestral" className="btn btn-linha">
            Quero o trimestral
          </BotaoZap>
          <p className="plano-passo">{PASSO_PAGAMENTO}</p>
        </article>
        <article className="plano-card destaque">
          <span className="selo-plano">Menor valor por mês</span>
          <span className="plano-rotulo">Semestral</span>
          <p className="preco">
            {PLANOS.semestral.preco}
            <small>/mês</small>
          </p>
          <ul>
            <li>
              <span>
                6x de {PLANOS.semestral.preco} no cartão: total de {sem.total}
              </span>
            </li>
            <li className="economia">
              <span>Economia de {sem.economia} em relação ao mensal</span>
            </li>
            <li>
              <span>{PLANOS.semestral.bio} bioimpedâncias*</span>
            </li>
          </ul>
          <BotaoZap assunto="semestral" className="btn btn-sol">
            <IconeZap />
            Quero o semestral
          </BotaoZap>
          <p className="plano-passo">{PASSO_PAGAMENTO}</p>
        </article>
        <p className="planos-nota">
          * Bioimpedância para alunos que moram em Aracaju. Trimestral e semestral só no cartão de
          crédito, com fidelidade de 3 e 6 meses.
        </p>
      </div>
    </section>
  );
}
