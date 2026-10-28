import { useNegocio } from "@/componentes/negocio";
import { PESSOA } from "@/dados/junior";

export function LinkInstagram() {
  const { instagram } = useNegocio();
  return (
    <a href={`https://www.instagram.com/${instagram}/`} target="_blank" rel="noopener">
      @{instagram}
    </a>
  );
}

/** Sobre o Junior, com a ficha (formação, CREF, onde atende e Instagram). */
export function Sobre() {
  const { endereco } = useNegocio();
  return (
    <section className="secao" id="sobre">
      <div className="wrap sobre-grade">
        <div className="sobre-fotos revela">
          <div className="principal">
            <img
              src="/midia/midia-20.webp"
              alt="Junior Soares treinando levantamento com barra na academia"
              loading="lazy"
              style={{ objectPosition: "50% 40%" }}
            />
          </div>
          <div className="menor">
            <img
              src="/midia/midia-21.webp"
              alt="Junior correndo ao lado de uma aluna na orla"
              loading="lazy"
            />
          </div>
          <div className="sol-marca" aria-hidden="true">
            <div>
              15+<small>anos</small>
            </div>
          </div>
        </div>
        <div className="sobre-texto revela">
          <span className="rotulo">Sobre</span>
          <h2>Experiência de quem já passou por cada modalidade.</h2>
          <p>
            Sou {PESSOA.nome}, treinador há mais de 15 anos. Nesse tempo, dei aulas de Yoga,
            Spinning e Pilates solo, acompanhei alunos na musculação e levei o treino para a areia e
            para a orla.
          </p>
          <p>
            Essa variedade me ensinou que não existe um treino certo para todo mundo. Existe o
            treino certo para você, agora. Meu trabalho é encontrar esse caminho junto com cada
            aluno, com técnica, paciência e atenção ao corpo.
          </p>
          <dl className="ficha">
            <div>
              <dt>Formação</dt>
              <dd>{PESSOA.formacao}</dd>
            </div>
            <div>
              <dt>Registro CREF</dt>
              <dd>{PESSOA.cref}</dd>
            </div>
            <div>
              <dt>Onde atendo</dt>
              <dd>{endereco}</dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <LinkInstagram />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
