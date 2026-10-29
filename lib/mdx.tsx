// Renderização do MDX de content/ (servicos, locais, blog) em Server Components.
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "react";
import type { MDXProvider } from "@mdx-js/react";

import { documento, type Colecao, type Frontmatter } from "@/lib/content";

type ComponentesMdx = ComponentProps<typeof MDXProvider>["components"];

// Componentes disponíveis dentro do MDX (RespostaDireta, Faq, CtaWhatsApp, VideoFacade...).
// Preenchido na fase 1 com o design system.
export const componentesMdx: ComponentesMdx = {};

export async function renderizarMdx(conteudo: string, componentes: ComponentesMdx = {}) {
  const { content } = await compileMDX({
    source: conteudo,
    components: { ...componentesMdx, ...componentes },
    options: {
      // Os templates usam props com arrays/objetos (ex.: <Faq itens={[...]} />), então expressões JS
      // ficam liberadas; as perigosas (eval, process, Function...) continuam bloqueadas.
      blockJS: false,
      blockDangerousJS: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });
  return content;
}

export async function carregarMdx(colecao: Colecao, slug: string, componentes?: ComponentesMdx) {
  const doc = documento(colecao, slug);
  if (!doc) return undefined;
  return { frontmatter: doc.frontmatter as Frontmatter, conteudo: await renderizarMdx(doc.conteudo, componentes) };
}
