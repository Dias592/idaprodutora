// Conteúdo das páginas de serviço (content/servicos/<slug>.mdx).
// O frontmatter traz os blocos estruturados do modelo de 10 blocos (docs/02); o corpo MDX traz o texto longo.
// H1, title, description, palavra-chave, perguntas do FAQ e relacionados vêm de data/servicos.json.
import { documento, paginasServico, type Servico } from "@/lib/content";
import type { Pacote } from "@/components/secoes";

type Item = { titulo: string; texto: string };

export type ConteudoServico = {
  status?: string;
  updatedAt?: string;
  eyebrow?: string;
  subtitulo: string;
  respostaDireta: string;
  usos: Item[];
  incluso: string[];
  etapas: Item[];
  /** Clientes (campo `cliente` de data/videos.json) na ordem de exibição. O primeiro vai para o hero. */
  videos?: string[];
  tituloPortfolio?: string;
  pacotes: Pacote[];
  notaPacotes?: string;
  /** Respostas para as perguntas de data/servicos.json, na mesma ordem. */
  respostas: string[];
};

export type PaginaServico = { servico: Servico; conteudo: ConteudoServico; corpo: string };

export function paginaServico(slug: string): PaginaServico | undefined {
  const servico = paginasServico.find((s) => s.url === `/${slug}`);
  const doc = documento("servicos", slug);
  if (!servico || !doc) return undefined;
  const conteudo = doc.frontmatter as unknown as ConteudoServico;
  if (conteudo.respostas?.length !== servico.faq.length) {
    throw new Error(`content/servicos/${slug}.mdx: ${servico.faq.length} perguntas em data/servicos.json, ${conteudo.respostas?.length ?? 0} respostas no MDX.`);
  }
  return { servico, conteudo, corpo: doc.conteudo };
}

export const slugsServicosPublicados = () =>
  paginasServico.map((s) => s.url.slice(1)).filter((slug) => documento("servicos", slug));
