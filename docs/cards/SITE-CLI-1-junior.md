# Card SITE-CLI-1 (espelho) · Site do Junior lê o banco do Hub

> Modelo: `docs/cards/SITE-CLI-1-site-do-cliente-le-do-hub.md` no repositório `hub-fora-do-papel`.
> Primeiro cliente do teste: Junior Soares Personal. Respostas das perguntas abertas do modelo:
> - Repositório: este (`site-junior-soares`). O site original era um único index.html; foi portado para TanStack Start + React 19 mantendo o visual (o passo de migração previsto no modelo).
> - Páginas editáveis no primeiro momento: nenhuma substitui a inicial. A inicial fica com o visual do site e recebe do Hub os dados do negócio; páginas novas (ex.: /promocao) podem ser criadas no Hub.
> - Domínio: ainda não há. Provisório `juniorsoarespersonal.lovable.app` (em `src/lib/config.ts`).

## Feito
- [x] Configuração com URL do Hub e chave publishable (req. 1).
- [x] Seções do Hub copiadas (commit em `src/secoes/ORIGEM.md`), renderizadas com `Render` do Puck 0.23.0 e `linkSeguro`; script `atualizar-secoes` (req. 2).
- [x] Páginas por caminho com reserva, 2 s de limite; caminho sem página: inicial usa o visual do site, demais dão 404 (req. 3).
- [x] Dados do negócio num lugar só: botões de WhatsApp, contato, rodapé, título e descrição no Google; o rodapé das páginas do Hub também usa esses dados (req. 4).
- [x] Cliques no WhatsApp registrados em Contatos sem atrasar a abertura; falha ignorada (req. 6). O site não tem formulário.
- [x] Cache de até 5 min (req. 7). Mapa do site em `/sitemap.xml` (req. 8, ver pendência).
- [x] Testes de leitura com banco, falha, demora, página não publicada, seção desconhecida e clique.

## Pendências
- Hub: não há função pública que liste as páginas publicadas de um site; o mapa do site traz só "/". Precisa de card no Hub.
- Hub: não há como trocar o domínio de um site depois de criado. Quando o domínio chegar, precisa de um ajuste no Hub (card) ou recadastrar o site.
- Artigos (req. 5): o site não tem o módulo; entra quando for contratado.
- Planos e preços continuam no código (`src/dados/junior.ts`): o Hub ainda não guarda preços.
- Turnstile (P1) só faz sentido quando houver formulário.

## Critérios de aceite a conferir depois de publicar
- [ ] Horário alterado em Ajustes aparece no contato e no rodapé em até 5 min.
- [ ] Clique no WhatsApp aparece em Contatos no painel do Junior e conta no Início.
- [ ] WhatsApp abre com o banco fora do ar (URL errada no teste).
- [ ] `cf-connecting-ip` gravado em `site_cliente_contatos` é o do visitante, mesmo com cabeçalho forjado.
- [ ] Lighthouse mobile ≥ 90 na inicial.
