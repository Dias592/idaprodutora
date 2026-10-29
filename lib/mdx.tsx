// Renderização do MDX de content/ (servicos, locais, blog) em Server Components.
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { ComponentProps } from "react";
import type { MDXProvider } from "@mdx-js/react";

import { documento, type Colecao, type Frontmatter } from "@/lib/content";
import { Faq, RespostaDiretaArtigo, type ItemFaq } from "@/components/secoes";
import { CtaWhatsApp } from "@/components/whatsapp";
import { VideoFacade } from "@/components/VideoFacade";
import { IndiceArtigo, LeiaTambem, indiceDoMdx } from "@/components/blog";
import type { Origem } from "@/lib/whatsapp";

type ComponentesMdx = NonNullable<ComponentProps<typeof MDXProvider>["components"]>;

export type ContextoMdx = {
  /** Título da página/artigo (vai na mensagem do WhatsApp). */
  titulo?: string;
  origem?: Origem;
  /** Slugs de artigos publicados (LeiaTambem só mostra o que existe). */
  publicados?: Set<string>;
};

/** Componentes disponíveis dentro do MDX, ligados ao contexto da página. */
export function componentesMdx(fonte: string, ctx: ContextoMdx = {}): ComponentesMdx {
  const indice = indiceDoMdx(fonte);
  return {
    RespostaDireta: RespostaDiretaArtigo,
    IndiceArtigo: () => <IndiceArtigo itens={indice} />,
    CtaWhatsApp: (p: { servico: string; origem?: Origem }) => (
      <CtaWhatsApp servico={p.servico} origem={p.origem ?? ctx.origem ?? "blog"} tituloArtigo={ctx.titulo} />
    ),
    VideoFacade: (p: ComponentProps<typeof VideoFacade>) => <VideoFacade {...p} className="not-prose my-8" />,
    // FAQ dentro do MDX também emite o FAQPage (uma por artigo).
    Faq: (p: { itens: ItemFaq[] }) => (
      <div className="not-prose">
        <Faq itens={p.itens} comSchema />
      </div>
    ),
    LeiaTambem: (p: { urls: string[] }) => <LeiaTambem urls={p.urls} publicados={ctx.publicados} />,
  };
}

export async function renderizarMdx(fonte: string, ctx: ContextoMdx = {}, extras: ComponentesMdx = {}) {
  const { content } = await compileMDX({
    source: fonte,
    components: { ...componentesMdx(fonte, ctx), ...extras },
    options: {
      // Os templates usam props com arrays/objetos (ex.: <Faq itens={[...]} />), então expressões JS
      // ficam liberadas; as perigosas (eval, process, Function...) continuam bloqueadas.
      blockJS: false,
      blockDangerousJS: true,
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
    },
  });
  return content;
}

export async function carregarMdx(colecao: Colecao, slug: string, ctx: ContextoMdx = {}) {
  const doc = documento(colecao, slug);
  if (!doc) return undefined;
  const fm = doc.frontmatter as Frontmatter;
  return {
    frontmatter: fm,
    fonte: doc.conteudo,
    conteudo: await renderizarMdx(doc.conteudo, { titulo: fm.titulo, ...ctx }),
  };
}
