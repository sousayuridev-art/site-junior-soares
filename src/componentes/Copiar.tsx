import { useState } from "react";

/** Botão "copiar" ao lado do telefone e do e-mail. */
export function Copiar({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <button
      className="copiar"
      type="button"
      onClick={() => {
        navigator.clipboard
          ?.writeText(texto)
          .then(() => {
            setCopiado(true);
            setTimeout(() => setCopiado(false), 1600);
          })
          .catch(() => {});
      }}
    >
      {copiado ? "copiado" : "copiar"}
    </button>
  );
}
