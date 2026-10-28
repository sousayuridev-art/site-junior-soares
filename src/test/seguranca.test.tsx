import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Data } from "@puckeditor/core";

import { Pagina } from "@/componentes/Pagina";
import { cabecaDaPagina, jsonLdSeguro } from "@/lib/cabeca";
import { limparCacheHub, MAX_ENTRADAS, paginaComReserva, tamanhoCacheHub } from "@/lib/hub.server";
import { NEGOCIO_RESERVA } from "@/lib/negocio";
import { comCabecalhosDeSeguranca } from "@/server";

/** Revisão de segurança de 28/10 do site do Junior. */

beforeEach(() => {
  limparCacheHub();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("Dados estruturados (JSON-LD)", () => {
  it("texto do painel com </script> não fecha o bloco", () => {
    const negocio = {
      ...NEGOCIO_RESERVA,
      google: { titulo: "x", descricao: "</script><script>alert(1)</script> & mais" },
    };
    const cabeca = cabecaDaPagina("/", negocio, null);
    const corpo = cabeca.scripts[0]?.children ?? "";
    expect(corpo).not.toMatch(/<|>/);
    expect(JSON.parse(corpo).description).toBe(negocio.google.descricao);
  });
  it("mantém o JSON igual para o Google", () => {
    const o = { a: "<b>", c: "1 & 2", d: " " };
    expect(JSON.parse(jsonLdSeguro(o))).toEqual(o);
  });
});

describe("Cache em memória", () => {
  it("não passa do teto com endereços inventados", async () => {
    const buscar = (() => Promise.resolve(new Response("null"))) as typeof fetch;
    for (let i = 0; i < MAX_ENTRADAS + 50; i++) await paginaComReserva(`/robo-${i}`, { buscar });
    expect(tamanhoCacheHub()).toBeLessThanOrEqual(MAX_ENTRADAS);
  });
});

describe("Cabeçalhos de segurança", () => {
  it("toda resposta sai sem permitir moldura e com nosniff", async () => {
    const r = comCabecalhosDeSeguranca(
      new Response("oi", { status: 404, headers: { "Cache-Control": "public" } }),
    );
    expect(r.status).toBe(404);
    expect(r.headers.get("X-Frame-Options")).toBe("DENY");
    expect(r.headers.get("Content-Security-Policy")).toContain("frame-ancestors 'none'");
    expect(r.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(r.headers.get("Cache-Control")).toBe("public");
    expect(await r.text()).toBe("oi");
  });
});

describe("Página do painel que quebra ao desenhar", () => {
  it("mostra o visual estático do site em vez de erro", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const quebrada = {
      root: { props: {} },
      content: [{ type: "Perguntas", props: { id: "p", titulo: "x", itens: "não é lista" } }],
    } as unknown as Data;
    render(<Pagina negocio={NEGOCIO_RESERVA} pagina={quebrada} />);
    expect(await screen.findByText(/Mais de 15 anos ensinando/)).toBeInTheDocument();
  });
});
