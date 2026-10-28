import { useEffect, useRef, useState } from "react";

import { contaDoPlano, PESSOA, PLANOS } from "@/dados/junior";

const QUADROS = [
  ["Treino periodizado", "Treino periodizado", "Técnica antes da carga", "05", "06"],
  ["Musculação", "Musculação", "Hipertrofia e emagrecimento", "07", "08"],
  ["Funcional", "Treinamento funcional", "Resistência, agilidade e coordenação", "09", "10"],
  ["Yoga", "Yoga", "Mobilidade e respiração", "11", "12"],
  ["Pilates solo", "Pilates solo", "Controle e respiração", "13", "14"],
] as const;

const DUR = 5500;

/**
 * Topo "Palco": cinco quadros de vídeo em arco. No computador todos tocam e o ativo ganha cor,
 * trocando sozinho a cada 5,5 s; no celular só o quadro no centro da rolagem toca.
 * Vídeos só carregam quando tocam (preload="none"); com movimento reduzido, começam pausados.
 */
export function Palco() {
  const trilho = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [sobre, setSobre] = useState(false);
  const [visivel, setVisivel] = useState(true);
  const [estreito, setEstreito] = useState(false);
  const [andando, setAndando] = useState(false);

  // Preferências do aparelho (só no navegador)
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setPausado(true);
    const mq = matchMedia("(max-width:760px)");
    setEstreito(mq.matches);
    const muda = () => setEstreito(mq.matches);
    mq.addEventListener("change", muda);
    return () => mq.removeEventListener("change", muda);
  }, []);

  // Toca ou pausa cada vídeo
  useEffect(() => {
    const vids = [...(trilho.current?.querySelectorAll("video") ?? [])];
    vids.forEach((v, i) => {
      if (!pausado && visivel && (!estreito || i === atual)) {
        if (!v.getAttribute("src")) v.src = v.dataset["src"] ?? "";
        // Navegador que bloqueia o autoplay: fica no pôster, sem erro.
        Promise.resolve()
          .then(() => v.play())
          .catch(() => {});
      } else v.pause();
    });
  }, [atual, pausado, visivel, estreito]);

  // Troca automática e barra de progresso
  useEffect(() => {
    setAndando(false);
    if (pausado || sobre || !visivel || estreito) return;
    const quadro = requestAnimationFrame(() => setAndando(true));
    const t = setTimeout(() => setAtual((a) => (a + 1) % QUADROS.length), DUR);
    return () => {
      cancelAnimationFrame(quadro);
      clearTimeout(t);
    };
  }, [atual, pausado, sobre, visivel, estreito]);

  // Palco fora da tela: tudo para. No celular, o quadro no centro vira o ativo.
  useEffect(() => {
    const el = trilho.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const fora = new IntersectionObserver(([e]) => setVisivel(!!e?.isIntersecting));
    fora.observe(el);
    const qs = [...el.querySelectorAll(".quadro")];
    const centro = new IntersectionObserver(
      (es) => {
        if (!matchMedia("(max-width:760px)").matches) return;
        es.forEach((e) => {
          if (e.isIntersecting) setAtual(qs.indexOf(e.target));
        });
      },
      { root: el, threshold: 0.75 },
    );
    qs.forEach((q) => centro.observe(q));
    return () => {
      fora.disconnect();
      centro.disconnect();
    };
  }, []);

  const reduz = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conta = contaDoPlano(PLANOS.semestral);

  return (
    <section className="hero" id="inicio">
      <div className="palco" role="region" aria-label="Vídeos do Junior em aula">
        <div
          className="trilho"
          id="trilho"
          ref={trilho}
          onMouseEnter={() => setSobre(true)}
          onMouseLeave={() => setSobre(false)}
        >
          {QUADROS.map(([vert, titulo, sub, poster, video], i) => (
            <button
              key={titulo}
              className={i === atual ? "quadro ativo" : "quadro"}
              type="button"
              aria-pressed={i === atual}
              aria-label={`${titulo}: ${sub}`}
              onMouseEnter={() => !estreito && setAtual(i)}
              onFocus={() => !estreito && setAtual(i)}
              onClick={(e) => {
                if (estreito)
                  e.currentTarget.scrollIntoView({
                    behavior: reduz() ? "auto" : "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                else setAtual(i);
              }}
            >
              <video
                muted
                playsInline
                loop
                preload="none"
                poster={`/midia/midia-${poster}.webp`}
                data-src={`/midia/midia-${video}.mp4`}
                aria-hidden="true"
              />
              <span className="q-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="q-vert" aria-hidden="true">
                {vert}
              </span>
              <span className="q-hor" aria-hidden="true">
                <b>{titulo}</b>
                <small>{sub}</small>
              </span>
              <span
                className={i === atual && andando ? "q-barra anda" : "q-barra"}
                style={{ "--dur": `${DUR}ms` } as React.CSSProperties}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
        <a
          className="sol"
          href="#consultoria"
          aria-label={`Consultoria online a partir de ${PLANOS.semestral.preco} por mês`}
        >
          <svg className="sol-anel" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="anel" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
            </defs>
            <text>
              <textPath href="#anel">Consultoria online · treine de onde estiver ·</textPath>
            </text>
          </svg>
          <span className="sol-disco" aria-hidden="true">
            <small>a partir de</small>
            <strong>R$ {conta.curto}</strong>
            <small>por mês</small>
          </span>
        </a>
        <div className="chao">
          <button
            className="pausar"
            id="pausar"
            type="button"
            aria-label={pausado ? "Reproduzir vídeos" : "Pausar vídeos"}
            onClick={() => setPausado((p) => !p)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                fill="currentColor"
                d={pausado ? "M4 2l10 6-10 6z" : "M3 2h3.5v12H3zM9.5 2H13v12H9.5z"}
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="wrap base">
        <div className="base-titulo">
          <span className="rotulo">Treinador · {PESSOA.cidade} e online</span>
          <h1>
            Mais de 15 anos ensinando o corpo a <em className="acento">se mover bem.</em>
          </h1>
        </div>
        <div className="base-lado">
          <p className="hero-sub">
            Consultoria online com treinos periodizados, para treinar de onde você estiver. E aulas
            presenciais em Aracaju, na academia ou no seu condomínio.
          </p>
          <div className="hero-acoes">
            <a className="btn btn-sol" href="#consultoria">
              Conhecer a consultoria online
            </a>
            <a className="btn btn-linha" href="#modalidades">
              Aulas presenciais
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAIXA = [
  "Treino periodizado",
  "Consultoria online",
  "Musculação",
  "Treinamento funcional",
  "Yoga",
  "Pilates solo",
];

/** Faixa laranja com as modalidades, rolando sem parar (lista repetida 4 vezes). */
export function Faixa() {
  return (
    <div className="faixa" aria-hidden="true">
      <ul id="faixa">
        {[0, 1, 2, 3].flatMap((r) => FAIXA.map((m) => <li key={`${r}-${m}`}>{m}</li>))}
      </ul>
    </div>
  );
}
