import { useEffect, useRef, useState } from "react";

type Cat = "yoga" | "pilates" | "forca" | "livre";
type Item = {
  cat: Cat;
  capa: string;
  alt: string;
  leg: string;
  w: number;
  h: number;
  video?: string;
  foto?: string;
};

const ITENS: Item[] = [
  {
    cat: "yoga",
    video: "22",
    capa: "23",
    alt: "Aula de Yoga em evento à beira-mar",
    leg: "Aula de Yoga ao entardecer, em evento à beira-mar",
    w: 480,
    h: 854,
  },
  {
    cat: "livre",
    foto: "24",
    capa: "25",
    alt: "Junior conduzindo alongamento em grupo na praia",
    leg: "Alongamento em grupo na orla",
    w: 1600,
    h: 1066,
  },
  {
    cat: "pilates",
    video: "26",
    capa: "27",
    alt: "Turma de Pilates solo com bola",
    leg: "Pilates solo com bola",
    w: 480,
    h: 854,
  },
  {
    cat: "forca",
    video: "28",
    capa: "29",
    alt: "Junior acompanhando uma aluna na academia",
    leg: "Acompanhamento individual na academia",
    w: 480,
    h: 850,
  },
  {
    cat: "yoga",
    foto: "30",
    capa: "31",
    alt: "Turma de Yoga na areia, sob tendas brancas",
    leg: "Turma de Yoga sob as tendas",
    w: 900,
    h: 1600,
  },
  {
    cat: "livre",
    video: "32",
    capa: "33",
    alt: "Treino funcional em grupo na areia",
    leg: "Funcional na areia",
    w: 480,
    h: 854,
  },
  {
    cat: "forca",
    foto: "34",
    capa: "35",
    alt: "Junior fazendo supino com halteres",
    leg: "Treino de força",
    w: 464,
    h: 832,
  },
  {
    cat: "yoga",
    video: "36",
    capa: "37",
    alt: "Junior em postura de Yoga no deck",
    leg: "Yoga no deck, de frente para o mar",
    w: 480,
    h: 854,
  },
  {
    cat: "livre",
    foto: "38",
    capa: "39",
    alt: "Alunas em circuito funcional na areia, junto à rede",
    leg: "Circuito na areia",
    w: 464,
    h: 832,
  },
  {
    cat: "pilates",
    foto: "40",
    capa: "41",
    alt: "Junior orientando aluna sentada na bola de Pilates",
    leg: "Orientação durante a aula de Pilates",
    w: 464,
    h: 832,
  },
  {
    cat: "forca",
    video: "42",
    capa: "43",
    alt: "Junior treinando na academia",
    leg: "Treino de força na academia",
    w: 480,
    h: 848,
  },
  {
    cat: "livre",
    video: "44",
    capa: "45",
    alt: "Treino com cordas na areia",
    leg: "Cordas naval na areia",
    w: 480,
    h: 860,
  },
  {
    cat: "yoga",
    video: "46",
    capa: "47",
    alt: "Grupo de Yoga com braços abertos à beira-mar",
    leg: "Saudação em grupo à beira-mar",
    w: 480,
    h: 854,
  },
];

const FILTROS: [Cat | "todos", string][] = [
  ["todos", "Todos"],
  ["yoga", "Yoga"],
  ["pilates", "Pilates"],
  ["forca", "Força"],
  ["livre", "Ao ar livre"],
];

const m = (n: string, ext: string) => `/midia/midia-${n}.${ext}`;

/** Galeria com filtros; foto ou vídeo abre ampliado (Esc ou clique fora fecha). */
export function Galeria() {
  const [filtro, setFiltro] = useState<Cat | "todos">("todos");
  const [aberto, setAberto] = useState<number | null>(null);
  const origem = useRef<HTMLButtonElement | null>(null);
  const fechar = useRef<HTMLButtonElement>(null);

  const sair = () => {
    setAberto(null);
    origem.current?.focus();
  };

  useEffect(() => {
    if (aberto === null) return;
    fechar.current?.focus();
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") sair();
    };
    document.addEventListener("keydown", tecla);
    return () => document.removeEventListener("keydown", tecla);
  }, [aberto]);

  const item = aberto === null ? null : ITENS[aberto];

  return (
    <section className="secao" id="galeria" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cabeca revela">
          <span className="rotulo">Galeria</span>
          <h2>Em aula, de verdade.</h2>
          <p>
            Momentos gravados nas aulas e eventos: academia, estúdio, areia e orla. Toque nos vídeos
            para assistir.
          </p>
        </div>
        <div className="filtros" role="group" aria-label="Filtrar galeria">
          {FILTROS.map(([f, nome]) => (
            <button key={f} type="button" aria-pressed={filtro === f} onClick={() => setFiltro(f)}>
              {nome}
            </button>
          ))}
        </div>
        <div className="galeria" id="galeria-lista">
          {ITENS.map((it, i) => (
            <button
              key={it.capa}
              className="item"
              type="button"
              hidden={!(filtro === "todos" || filtro === it.cat)}
              onClick={(e) => {
                origem.current = e.currentTarget;
                setAberto(i);
              }}
            >
              <img
                src={m(it.capa, "webp")}
                alt={it.alt}
                loading="lazy"
                width={it.w}
                height={it.h}
              />
              {it.video && (
                <span className="play">
                  <i>
                    <svg>
                      <use href="#i-play" />
                    </svg>
                  </i>
                  Vídeo
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {item && (
        <div
          className="caixa"
          id="caixa"
          role="dialog"
          aria-modal="true"
          aria-label="Mídia ampliada"
          onClick={(e) => {
            if (e.target === e.currentTarget) sair();
          }}
        >
          <div className="caixa-conteudo">
            <button
              className="fechar"
              ref={fechar}
              type="button"
              aria-label="Fechar"
              onClick={sair}
            >
              ×
            </button>
            <div id="caixa-midia">
              {item.video ? (
                <video
                  src={m(item.video, "mp4")}
                  poster={m(item.capa, "webp")}
                  controls
                  autoPlay
                  muted
                  playsInline
                  loop
                />
              ) : (
                <img src={m(item.foto ?? item.capa, "webp")} alt={item.alt} />
              )}
            </div>
            <p id="caixa-leg">{item.leg}</p>
          </div>
        </div>
      )}
    </section>
  );
}
