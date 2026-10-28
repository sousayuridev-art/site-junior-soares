import { Render, type Data } from "@puckeditor/core";

import { telefoneExibicao, type Negocio } from "@/lib/negocio";
import { criarConfigSecoes } from "@/secoes/config";

// No site o campo de foto não é usado (só o editor do Hub escolhe fotos).
const config = criarConfigSecoes({ campoFoto: { type: "custom", render: () => <></> } });

/**
 * O rodapé de toda página usa os dados do negócio publicados em Ajustes (um lugar só),
 * mesmo que a página tenha sido publicada com outros valores.
 */
export function comDadosDoNegocio(pagina: Data, n: Negocio): Data {
  return {
    ...pagina,
    content: pagina.content.map((item) =>
      item.type === "Rodape"
        ? {
            ...item,
            props: {
              ...item.props,
              nome: n.nome,
              endereco: n.endereco,
              instagram: `@${n.instagram}`,
              whatsapp: telefoneExibicao(n.whatsapp),
            },
          }
        : item,
    ),
  };
}

/** Página publicada no painel, com as mesmas seções do editor do Hub (pacote `src/secoes`). */
export default function PaginaDoHub({ pagina, negocio }: { pagina: Data; negocio: Negocio }) {
  return <Render config={config} data={comDadosDoNegocio(pagina, negocio)} />;
}
