# Site Junior Soares Personal · regras do projeto

Lidas pelo Claude Code em todo pedido. Cards em `docs/cards/`; cite o card no pedido.
Primeiro site de cliente que nasce ligado ao Hub da Fora do Papel (card SITE-CLI-1).

## Fluxo (não pular etapas)
1. Card com requisitos e critérios de aceite. Sem card, não implemente.
2. Implementação no Claude Code, só o que o card pede.
3. Teste local: `bun run test`, `bun run lint`, `bun run build` e conferência no navegador.
4. Push para o GitHub.
5. Lovable: só publicação. Nada de editar código por lá.

## Stack
- TanStack Start (rotas por arquivo em `src/routes`), React 19, TypeScript estrito, `bun`.
- Visual do site em `src/junior.css` + componentes de `src/componentes` (cópia fiel do index.html aprovado). Sem Tailwind nessas partes.
- `src/secoes` é cópia do Hub (ver `src/secoes/ORIGEM.md`). Não edite aqui: `bun run atualizar-secoes`.
- `routeTree.gen.ts` é gerado sozinho; não edite.

## Ligação com o Hub
- Conteúdo lido só no servidor (`src/lib/hub.server.ts`), com reserva estática, limite de 2 s e cache: até 5 min entre publicar no painel e aparecer no site.
- Dados do negócio (Ajustes no painel) mandam em WhatsApp, Instagram, onde atende, horário, título e descrição no Google. Reserva em `src/dados/junior.ts`.
- Página publicada no Hub para um caminho substitui a reserva naquele caminho. Sem página em "/", fica o visual do site.
- Cliques no WhatsApp vão para Contatos no painel (`site_contato_registrar`), sem segurar a abertura do WhatsApp.
- Só a chave publishable no código (`src/lib/config.ts`). Nunca service role ou tokens.
- O banco identifica o site pelo domínio (`SITE_URL`). Trocar o domínio exige trocar também na ficha do site no Hub.

## Texto
- Português simples. Sem números, depoimentos ou dados inventados: dado pendente vira marcador e não vai ao ar.
- Meta Lighthouse mobile ≥ 90.
