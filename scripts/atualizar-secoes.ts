/**
 * Copia de novo as seções do Hub (card SITE-CLI-1, req. 2).
 * Uso: bun run atualizar-secoes [caminho do clone do Hub]  (padrão: ../hub-fora-do-papel)
 */
import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const hub = process.argv[2] ?? "../hub-fora-do-papel";
const origem = join(hub, "src/secoes");
if (!existsSync(origem)) {
  console.error(`Não achei ${origem}. Informe o caminho do clone do Hub.`);
  process.exit(1);
}
const commit = execSync("git rev-parse --short HEAD", { cwd: hub }).toString().trim();
const destino = "src/secoes";
for (const f of readdirSync(destino)) if (f !== "ORIGEM.md") rmSync(join(destino, f));
cpSync(origem, destino, { recursive: true });
const hoje = new Date().toLocaleDateString("pt-BR");
writeFileSync(
  join(destino, "ORIGEM.md"),
  `# Seções do Hub (cópia)\n\nCópia de \`src/secoes\` do repositório \`sousayuridev-art/hub-fora-do-papel\`, commit \`${commit}\` (${hoje}).\nNão edite aqui: mude no Hub e rode \`bun run atualizar-secoes\` (card SITE-CLI-1, req. 2).\n`,
);
console.log(`Seções atualizadas para o commit ${commit} do Hub.`);
