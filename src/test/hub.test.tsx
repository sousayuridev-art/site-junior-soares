import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import type { Data } from "@puckeditor/core";

import { NegocioProvider } from "@/componentes/negocio";
import { PaginaJunior } from "@/componentes/PaginaJunior";
import { comDadosDoNegocio } from "@/componentes/PaginaDoHub";
import { registrarCliqueWhatsapp } from "@/lib/contato";
import {
  CACHE_MS,
  CACHE_RESERVA_MS,
  conferirPagina,
  limparCacheHub,
  negocioComReserva,
  paginaComReserva,
} from "@/lib/hub.server";
import { horarioEmTexto, montarNegocio, NEGOCIO_RESERVA, numeroWhatsapp } from "@/lib/negocio";

/** Card SITE-CLI-1: leitura do Hub com reserva, dados do negócio e cliques no WhatsApp. */

const resposta = (corpo: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(corpo), { status }));

const NEGOCIO_HUB = {
  negocio: {
    nome: "Junior Soares Personal",
    whatsapp: "79988887777",
    instagram: "junior.novo",
    endereco: "Academia Selfit, Aracaju",
    horario: [
      { dias: "Seg a sex", abre: "06:00", fecha: "21:30" },
      { dias: "Sáb", abre: "07:00", fecha: "12:00" },
      { dias: "Dom", fechado: true },
    ],
  },
  google: { titulo: "Junior Soares | Personal em Aracaju", descricao: "Treinos e consultoria." },
};

const PAGINA = {
  root: { props: { titulo: "Promoção" } },
  content: [
    { type: "Capa", props: { id: "c1", titulo: "Treine no verão", foto: "" } },
    {
      type: "Rodape",
      props: { id: "r1", nome: "Outro nome", endereco: "", instagram: "", whatsapp: "" },
    },
  ],
};

beforeEach(() => {
  limparCacheHub();
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe("Dados do negócio", () => {
  it("usa o que está no Hub, campo a campo", () => {
    const n = montarNegocio(NEGOCIO_HUB);
    expect(n.whatsapp).toBe("5579988887777");
    expect(n.instagram).toBe("junior.novo");
    expect(n.endereco).toBe("Academia Selfit, Aracaju");
    expect(n.horario).toBe("Seg a sex: 6h às 21h30 · Sáb: 7h às 12h · Dom: fechado");
    expect(n.google.titulo).toBe("Junior Soares | Personal em Aracaju");
  });
  it("campo vazio ou fora do formato usa a reserva só nele", () => {
    const n = montarNegocio({
      negocio: { nome: "Junior", whatsapp: "123", horario: [{ dias: "x" }] },
      google: {},
    });
    expect(n.nome).toBe("Junior");
    expect(n.whatsapp).toBe(NEGOCIO_RESERVA.whatsapp);
    expect(n.horario).toBe(NEGOCIO_RESERVA.horario);
    expect(n.google).toEqual(NEGOCIO_RESERVA.google);
    expect(montarNegocio(null)).toEqual(NEGOCIO_RESERVA);
  });
  it("horário e número", () => {
    expect(horarioEmTexto([])).toBeNull();
    expect(horarioEmTexto([{ dias: "Seg", abre: "25:00", fecha: "10:00" }])).toBeNull();
    expect(numeroWhatsapp("(79) 99141-7553")).toBe("5579991417553");
    expect(numeroWhatsapp("5579991417553")).toBe("5579991417553");
  });
});

describe("Leitura no servidor com reserva", () => {
  it("banco responde: dados do Hub, com cache de 2 minutos", async () => {
    const buscar = vi.fn(() => resposta(NEGOCIO_HUB));
    let t = 0;
    const o = { buscar: buscar as unknown as typeof fetch, agora: () => t };
    const r = await negocioComReserva(o);
    expect(r.fonte).toBe("banco");
    expect(r.dado.whatsapp).toBe("5579988887777");
    const corpo = JSON.parse(
      (buscar.mock.calls[0] as unknown as [string, RequestInit])[1].body as string,
    );
    expect(corpo).toEqual({ p_dominio: "juniorsoarespersonal.lovable.app" });
    t = CACHE_MS - 1;
    await negocioComReserva(o);
    expect(buscar).toHaveBeenCalledTimes(1);
    t = CACHE_MS + 1;
    await negocioComReserva(o);
    expect(buscar).toHaveBeenCalledTimes(2);
  });
  it("banco fora do ar: reserva estática, tenta de novo em 30 s", async () => {
    const buscar = vi.fn(() => Promise.reject(new TypeError("rede")));
    let t = 0;
    const o = { buscar: buscar as unknown as typeof fetch, agora: () => t };
    const r = await negocioComReserva(o);
    expect(r).toEqual({ dado: NEGOCIO_RESERVA, fonte: "reserva" });
    t = CACHE_RESERVA_MS + 1;
    await negocioComReserva(o);
    expect(buscar).toHaveBeenCalledTimes(2);
  });
  it("site ainda não cadastrado no Hub (null): reserva", async () => {
    const r = await negocioComReserva({ buscar: (() => resposta(null)) as typeof fetch });
    expect(r.fonte).toBe("reserva");
  });
  it("demora acima de 2 s: reserva", async () => {
    const lento = ((_: string, i: RequestInit) =>
      new Promise((_r, rej) =>
        i.signal?.addEventListener("abort", () => rej(new Error("abort"))),
      )) as typeof fetch;
    const r = await negocioComReserva({ buscar: lento, tempoLimite: 20 });
    expect(r.fonte).toBe("reserva");
  });
  it("página publicada no caminho", async () => {
    const r = await paginaComReserva("/", { buscar: (() => resposta(PAGINA)) as typeof fetch });
    expect(r.dado?.content).toHaveLength(2);
  });
  it("página não publicada: null (o site mostra o visual estático)", async () => {
    const r = await paginaComReserva("/", { buscar: (() => resposta(null)) as typeof fetch });
    expect(r).toEqual({ dado: null, fonte: "banco" });
  });
  it("erro do banco na página: null e reserva", async () => {
    const r = await paginaComReserva("/", {
      buscar: (() => resposta({ message: "x" }, 500)) as typeof fetch,
    });
    expect(r).toEqual({ dado: null, fonte: "reserva" });
  });
  it("seção desconhecida sai e o resto renderiza; formato errado vira null", () => {
    const d = conferirPagina({
      ...PAGINA,
      content: [...PAGINA.content, { type: "Loja", props: {} }],
    });
    expect(d?.content.map((c) => c.type)).toEqual(["Capa", "Rodape"]);
    expect(conferirPagina({ content: "x" })).toBeNull();
    expect(conferirPagina({ content: [{ type: "Loja", props: {} }] })).toBeNull();
  });
});

describe("Rodapé das páginas do Hub", () => {
  it("usa sempre os dados do negócio", () => {
    const d = comDadosDoNegocio(PAGINA as unknown as Data, montarNegocio(NEGOCIO_HUB));
    expect(d.content[1]?.props).toMatchObject({
      nome: "Junior Soares Personal",
      endereco: "Academia Selfit, Aracaju",
      instagram: "@junior.novo",
      whatsapp: "(79) 98888-7777",
    });
    expect(d.content[0]?.props).toMatchObject({ titulo: "Treine no verão" });
  });
});

describe("Clique no WhatsApp", () => {
  it("registra em Contatos com keepalive", async () => {
    const buscar = vi.fn(() => resposta({ ok: true }));
    await registrarCliqueWhatsapp("/#semestral", { buscar: buscar as unknown as typeof fetch });
    const [url, init] = buscar.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/\/rest\/v1\/rpc\/site_contato_registrar$/);
    expect(init.keepalive).toBe(true);
    expect(JSON.parse(init.body as string)).toEqual({
      p_dominio: "juniorsoarespersonal.lovable.app",
      p_dados: { origem: "whatsapp", pagina: "/#semestral" },
    });
  });
  it("falha do banco não gera erro (o WhatsApp abre do mesmo jeito)", async () => {
    await expect(
      registrarCliqueWhatsapp("/", {
        buscar: (() => Promise.reject(new Error("x"))) as typeof fetch,
      }),
    ).resolves.toBeUndefined();
  });
});

describe("Página estática com os dados do Hub", () => {
  it("todos os botões de WhatsApp usam o número do Hub; horário e endereço no contato", () => {
    render(
      <NegocioProvider valor={montarNegocio(NEGOCIO_HUB)}>
        <PaginaJunior />
      </NegocioProvider>,
    );
    const zaps = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("https://wa.me/"));
    expect(zaps.length).toBeGreaterThanOrEqual(10);
    zaps.forEach((a) =>
      expect(a.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/5579988887777\?text=/),
    );
    const contato = document.getElementById("contato") as HTMLElement;
    expect(
      within(contato).getByText("Seg a sex: 6h às 21h30 · Sáb: 7h às 12h · Dom: fechado"),
    ).toBeInTheDocument();
    expect(within(contato).getByText("(79) 98888-7777")).toBeInTheDocument();
    const rodape = document.querySelector("footer") as HTMLElement;
    expect(within(rodape).getByText(/Seg a sex: 6h/)).toBeInTheDocument();
    expect(within(rodape).getByRole("link", { name: "@junior.novo" })).toBeInTheDocument();
  });
  it("clique no botão registra o contato e mantém o link do WhatsApp", () => {
    const buscar = vi.spyOn(globalThis, "fetch").mockImplementation(() => resposta({ ok: true }));
    render(<PaginaJunior />);
    const botao = screen.getAllByRole("link", {
      name: /Quero o semestral/,
    })[0] as HTMLAnchorElement;
    botao.addEventListener("click", (e) => e.preventDefault());
    botao.click();
    expect(buscar).toHaveBeenCalledTimes(1);
    expect(botao.target).toBe("_blank");
    expect(botao.href).toMatch(/^https:\/\/wa\.me\/5579991417553\?text=/);
  });
});
