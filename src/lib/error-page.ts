export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Esta página não carregou</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root { --background: #0b0e14; --foreground: #e8ecf2; --blue: #2f6bff; --muted: #a3adbd; --border: #5a6a80; --amber: #ffb020; --focus: #6f9bff; }
      * { box-sizing: border-box; }
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: var(--background); color: var(--foreground); display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: var(--muted); margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { min-height: 44px; padding: 0.5rem 1rem; border-radius: 4px; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      :focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
      .primary { background: var(--amber); color: var(--background); font-weight: 600; }
      .secondary { background: var(--background); color: var(--foreground); border-color: var(--border); }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Esta página não carregou</h1>
      <p>Algo deu errado do nosso lado. Você pode atualizar a página ou voltar ao início.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Tentar de novo</button>
        <a class="secondary" href="/">Voltar ao início</a>
      </div>
    </div>
  </body>
</html>`;
}
