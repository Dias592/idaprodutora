// Leitura de content/**/*.mdx (só no servidor). Reexporta os dados de lib/dados.ts.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { blogPlano, type ArtigoPlano } from "@/lib/dados";

export * from "@/lib/dados";

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
