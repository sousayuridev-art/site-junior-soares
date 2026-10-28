/**
 * Conteúdo estático do site (reserva). Vale quando o Hub não tem o dado ou não responde.
 * Dados do negócio publicados em Ajustes, no painel, têm prioridade (src/lib/negocio.ts).
 * Os textos e preços abaixo vieram da versão aprovada do site (index.html de 27/10).
 */

export const RESERVA_NEGOCIO = {
  /** Nome da marca (rodapé, Google, dados estruturados). */
  nome: "Junior Soares Personal",
  whatsapp: "5579991417553",
  instagram: "juniorsoarespersonal",
  /** "Onde atendo" (no Hub: Endereço). */
  endereco: "Academias de Aracaju ou no seu condomínio",
  /** "Horários" (no Hub: Horário de atendimento). */
  horario: "A combinar com cada aluno",
} as const;

export const RESERVA_GOOGLE = {
  titulo: "Junior Soares Personal | Treinador em Aracaju e consultoria online",
  descricao:
    "Junior Soares, treinador com mais de 15 anos de experiência. Consultoria online com treinos periodizados e aulas presenciais em Aracaju: treino periodizado, funcional ao ar livre, Yoga, Pilates solo e Spinning.",
} as const;

/** Dados que o Hub ainda não guarda: ficam no código. */
export const PESSOA = {
  nome: "Junior Soares",
  email: "juniorfitnssj@gmail.com",
  cidade: "Aracaju – SE",
  formacao: "Bacharelado e licenciatura em Educação Física",
  cref: "00399-G/SE",
} as const;

export type Plano = { preco: string; bio: string; meses: number };
export const PLANOS: Record<"mensal" | "trimestral" | "semestral", Plano> = {
  mensal: { preco: "R$ 130,00", bio: "1", meses: 1 },
  trimestral: { preco: "R$ 89,90", bio: "2", meses: 3 },
  semestral: { preco: "R$ 79,90", bio: "4", meses: 6 },
};

/** Mensagem pronta de cada botão de WhatsApp. */
export const MENSAGENS = {
  geral: "Olá, Junior! Vim pelo seu site e gostaria de saber mais sobre as aulas.",
  personal: "Olá, Junior! Vim pelo seu site e tenho interesse no treino periodizado presencial.",
  consultoria: "Olá, Junior! Vim pelo seu site e quero começar a consultoria online.",
  mensal: "Olá, Junior! Vim pelo seu site e quero o plano mensal da consultoria online.",
  trimestral: "Olá, Junior! Vim pelo seu site e quero o plano trimestral da consultoria online.",
  semestral: "Olá, Junior! Vim pelo seu site e quero o plano semestral da consultoria online.",
  funcional: "Olá, Junior! Vim pelo seu site e tenho interesse no treinamento funcional.",
  yoga: "Olá, Junior! Vim pelo seu site e tenho interesse nas aulas de Yoga.",
  pilates: "Olá, Junior! Vim pelo seu site e tenho interesse no Pilates solo.",
  duvida: "Olá, Junior! Vim pelo seu site e tenho uma dúvida:",
} as const;
export type Assunto = keyof typeof MENSAGENS;

const numero = (t: string) => parseFloat(t.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
export const reais = (n: number) =>
  "R$ " +
  n
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Preço sem "R$ " (disco do topo), total do período e economia em relação ao mensal. */
export function contaDoPlano(p: Plano) {
  const mensal = numero(PLANOS.mensal.preco);
  return {
    curto: p.preco.replace("R$ ", ""),
    total: reais(numero(p.preco) * p.meses),
    economia: reais((mensal - numero(p.preco)) * p.meses),
  };
}
