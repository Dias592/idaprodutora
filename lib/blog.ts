// Blog: junta o plano (data/blog-plan.json) com os artigos publicados (content/blog/*.mdx).
import { artigosPublicados, blogPlano, dataValida, type ArtigoPlano, type DocumentoMdx } from "@/lib/content";

export type ArtigoPublicado = { plano: ArtigoPlano; doc: DocumentoMdx };

export function publicados(): ArtigoPublicado[] {
  const docs = new Map(artigosPublicados().map((d) => [d.slug, d]));
  return blogPlano.filter((a) => docs.has(a.slug)).map((plano) => ({ plano, doc: docs.get(plano.slug)! }));
}

export const slugsPublicados = () => new Set(publicados().map((a) => a.plano.slug));

export function artigo(slug: string): ArtigoPublicado | undefined {
  return publicados().find((a) => a.plano.slug === slug);
}

export const pilarDe = (numero: number) => blogPlano.find((a) => a.tipo === "pilar" && a.pilar === numero)!;

/** Complementares publicados de um pilar, na ordem do plano. */
export function complementaresPublicados(numero: number): ArtigoPublicado[] {
  return publicados().filter((a) => a.plano.tipo === "complementar" && a.plano.pilar === numero);
}

export const dataArtigo = (a: ArtigoPublicado) => {
  const publicado = dataValida(a.doc.frontmatter.publishedAt) ?? "";
  const atualizado = dataValida(a.doc.frontmatter.updatedAt) ?? publicado;
  // atualização nunca anterior à publicação
  return { publicado, atualizado: atualizado && publicado && atualizado < publicado ? publicado : atualizado };
};

export const formatarData = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${d} de ${meses[m - 1]} de ${a}`;
};
