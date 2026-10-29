// Fonte única de dados do site: data/*.json + content/**/*.mdx.
// Nunca reescreva títulos, slugs ou palavras-chave aqui — edite os arquivos de data/ ou o frontmatter.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import servicosJson from "@/data/servicos.json";
import locaisJson from "@/data/locais.json";
import blogPlanJson from "@/data/blog-plan.json";
import videosJson from "@/data/videos.json";
import clientesJson from "@/data/clientes.json";

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

// ---------- MDX ----------

export type Frontmatter = {
  id?: string;
  tipo?: string;
  status?: "planejado" | "rascunho" | "publicado";
  titulo?: string;
  metaTitle?: string;
  metaDescription?: string;
  palavraChave?: string;
  publishedAt?: string;
  updatedAt?: string;
  capa?: string;
  [campo: string]: unknown;
};

export type DocumentoMdx = { slug: string; frontmatter: Frontmatter; conteudo: string };

const RAIZ_CONTEUDO = path.join(process.cwd(), "content");
export type Colecao = "servicos" | "locais" | "blog";

function lerColecao(colecao: Colecao): DocumentoMdx[] {
  const dir = path.join(RAIZ_CONTEUDO, colecao);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((arquivo) => {
      const bruto = fs.readFileSync(path.join(dir, arquivo), "utf8");
      const { data, content } = matter(bruto);
      return { slug: arquivo.replace(/\.mdx$/, ""), frontmatter: data as Frontmatter, conteudo: content };
    });
}

/** Documentos publicáveis. Artigos com status "planejado" (ou rascunho) não geram página. */
export function documentosPublicados(colecao: Colecao): DocumentoMdx[] {
  return lerColecao(colecao).filter((d) => d.frontmatter.status === undefined || d.frontmatter.status === "publicado");
}

export function documento(colecao: Colecao, slug: string): DocumentoMdx | undefined {
  return documentosPublicados(colecao).find((d) => d.slug === slug);
}

export const artigosPublicados = () => documentosPublicados("blog");

/** Pilares publicados (cada um gera /blog/categoria/<slug-do-pilar>). */
export function pilaresPublicados(): ArtigoPlano[] {
  const publicados = new Set(artigosPublicados().map((d) => d.slug));
  return blogPlano.filter((a) => a.tipo === "pilar" && publicados.has(a.slug));
}

/** Data ISO válida ou undefined (campos vazios ou [PREENCHER] são ignorados). */
export function dataValida(valor: unknown): string | undefined {
  if (typeof valor !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(valor)) return undefined;
  return valor;
}
