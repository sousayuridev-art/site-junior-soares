import { BotaoZap, IconeZap } from "@/componentes/BotaoZap";
import { Copiar } from "@/componentes/Copiar";
import { useNegocio } from "@/componentes/negocio";
import { LinkInstagram } from "@/componentes/Sobre";
import { PESSOA } from "@/dados/junior";
import { telefoneExibicao } from "@/lib/negocio";

/** Chamada final com o cartão de contato (WhatsApp, e-mail, Instagram, onde e quando). */
export function Contato() {
  const { whatsapp, endereco, horario } = useNegocio();
  const tel = telefoneExibicao(whatsapp);
  return (
    <section className="final" id="contato">
      <svg
        className="simbolo-fundo"
        viewBox="0 0 100 100"
        aria-hidden="true"
        style={{ color: "var(--nevoa)" }}
      >
        <use href="#i-simbolo" />
      </svg>
      <div className="wrap">
        <div className="revela">
          <h2>
            Vamos conversar sobre o seu <em className="acento">próximo passo?</em>
          </h2>
          <p>
            Conte o que você busca e qual modalidade te interessa. A resposta vem pelo WhatsApp, sem
            compromisso.
          </p>
          <div className="hero-acoes" style={{ marginTop: 32 }}>
            <BotaoZap className="btn btn-sol">
              <IconeZap />
              Falar no WhatsApp
            </BotaoZap>
          </div>
        </div>
        <div className="cartao revela">
          <dl>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                {tel} <Copiar texto={tel.replace(/\D/g, "")} />
              </dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>
                {PESSOA.email} <Copiar texto={PESSOA.email} />
              </dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <LinkInstagram />
              </dd>
            </div>
            <div>
              <dt>Onde atendo</dt>
              <dd>{endereco}</dd>
            </div>
            <div>
              <dt>Horários</dt>
              <dd>{horario}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
