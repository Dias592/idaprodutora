// Dados de data/*.json (sem acesso a disco: pode ser importado por componentes cliente).
// Nunca reescreva títulos, slugs ou palavras-chave aqui — edite os arquivos de data/ ou o frontmatter.

import servicosJson from "@/data/servicos.json";
import locaisJson from "@/data/locais.json";
import blogPlanJson from "@/data/blog-plan.json";
import videosJson from "@/data/videos.json";
import clientesJson from "@/data/clientes.json";
import fotosJson from "@/data/fotos.json";

export type Servico = {
  url: string;
  nome: string;
  grupo: "Vídeo" | "Eventos" | "Estúdio e Foto" | null;
  prioridade: string;
  h1: string;
  title: string;
  description: string;
  palavraChave: string;
  secundarias: string[];
  servicoFormulario: string;
  faq: string[];
  relacionados: string[];
  pilar: number | null;
  leiaNoBlog: { pilar?: string; complementares?: string[]; pilares?: string[] };
};

export type Local = {
  url: string;
  tipo: "regiao" | "centro";
  nome: string;
  h1: string;
  palavraChave: string;
  servicoPrincipal: string;
  servicosSecundarios: string[];
  [extra: string]: unknown;
};

export type ArtigoPlano = {
  id: string;
  tipo: "pilar" | "complementar";
  pilar: number;
  titulo: string;
  slug: string;
  url: string;
  palavraChave: string;
  palavrasSecundarias: string[];
  pergunta: string;
  formato: string;
  palavras: string;
  servico: string;
  servicoNome: string;
  servicoFormulario: string;
  onda: number;
  complementares?: string[];
  pilaresRelacionados?: string[];
  linkPilar?: { url: string; ancora: string };
  irmaos?: string[];
  [extra: string]: unknown;
};

export type Video = (typeof videosJson)[number];
export type Cliente = (typeof clientesJson)[number];

export const servicos = servicosJson as Servico[];
export const paginasServico = servicos.filter((s) => s.url !== "/");
export const home = servicos.find((s) => s.url === "/")!;
export const locais = locaisJson as Local[];
export const blogPlano = blogPlanJson as ArtigoPlano[];
export const videos = videosJson;

export type Foto = (typeof fotosJson)[number];
/** Fotos de portfólio da home (versões otimizadas em public/portfolio/fotos, geradas por scripts/fotos-home.mjs). */
/** Intercala os eventos (um de cada por vez) para a grade não repetir o mesmo evento em sequência. */
function intercalarEventos<T extends { evento: string }>(lista: T[]): T[] {
  const porEvento = new Map<string, T[]>();
  for (const f of lista) porEvento.set(f.evento, [...(porEvento.get(f.evento) ?? []), f]);
  const grupos = [...porEvento.values()];
  const total = Math.max(...grupos.map((g) => g.length));
  return Array.from({ length: total }, (_, i) => grupos.map((g) => g[i]).filter((f): f is T => !!f)).flat();
}

export const fotosHome = intercalarEventos(fotosJson.filter((f) => f.home));
/** Todas as fotos de portfólio, as da home primeiro (/portfolio). */
export const fotosPortfolio = [...fotosHome, ...intercalarEventos(fotosJson.filter((f) => !f.home))];
export const clientes = [...clientesJson].sort((a, b) => a.ordem - b.ordem);

export const PAGINAS_INSTITUCIONAIS = [
  "/sobre",
  "/portfolio",
  "/clientes",
  "/orcamento",
  "/contato",
  "/politica-de-privacidade",
  "/termos",
] as const;
