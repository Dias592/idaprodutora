// Artigo do blog (pilar ou complementar). Só artigos com status "publicado" geram página.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/secoes";
import { BarraLaranja, Container, Eyebrow, JsonLd } from "@/components/ui";
import { artigo, complementaresPublicados, dataArtigo, formatarData, pilarDe, publicados, slugsPublicados } from "@/lib/blog";
import { renderizarMdx } from "@/lib/mdx";
import { SITE, artigo as artigoSchema, grafo } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return publicados().map((a) => ({ slug: a.plano.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = artigo(slug);
  if (!a) return {};
  const fm = a.doc.frontmatter;
  const titulo = (fm.metaTitle as string) || a.plano.titulo;
  const descricao = (fm.metaDescription as string) || a.plano.pergunta;
  const url = `${SITE}${a.plano.url}`;
  const { publicado, atualizado } = dataArtigo(a);
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: url },
    authors: [{ name: "Ivan Dias", url: `${SITE}/sobre` }],
    openGraph: {
      type: "article",
      url,
      title: titulo,
      description: descricao,
      locale: "pt_BR",
      publishedTime: publicado || undefined,
      modifiedTime: atualizado || undefined,
      authors: [`${SITE}/sobre`],
    },
    twitter: { title: titulo, description: descricao },
  };
}

export default async function PaginaArtigo({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const a = artigo(slug);
  if (!a) notFound();
  const { plano, doc } = a;
  const { publicado, atualizado } = dataArtigo(a);
  const pilar = pilarDe(plano.pilar);
  const ehPilar = plano.tipo === "pilar";

  const conteudo = await renderizarMdx(doc.conteudo, {
    titulo: plano.titulo,
    origem: ehPilar ? "blog-pilar" : "blog-complementar",
    publicados: slugsPublicados(),
  });

  const migalhas = [
    { nome: "Home", url: "/" },
    { nome: "Blog", url: "/blog" },
    ...(ehPilar ? [] : [{ nome: pilar.servicoNome, url: `/blog/categoria/${pilar.slug}` }]),
    { nome: plano.titulo, url: plano.url },
  ];

  return (
    <>
      <JsonLd
        dados={grafo([
          artigoSchema({
            tipo: plano.tipo,
            titulo: plano.titulo,
            metaDescription: (doc.frontmatter.metaDescription as string) || plano.pergunta,
            url: plano.url,
            publishedAt: publicado,
            updatedAt: atualizado,
            palavraChave: plano.palavraChave,
            pilarUrl: ehPilar ? undefined : pilar.url,
            complementaresPublicados: ehPilar ? complementaresPublicados(plano.pilar).map((c) => c.plano.url) : undefined,
          }),
        ])}
      />
      <Container>
        <Breadcrumb itens={migalhas} />
        <article className="mx-auto max-w-[760px] pt-12 pb-24">
          <header className="flex flex-col gap-5">
            <Eyebrow>{ehPilar ? "GUIA COMPLETO" : plano.formato.toUpperCase()} · {plano.servicoNome.toUpperCase()}</Eyebrow>
            <h1 className="m-0 text-[32px] leading-[1.15] font-bold tracking-[-0.01em] sm:text-[42px]">{plano.titulo}</h1>
            <BarraLaranja />
            <p className="m-0 text-sm text-muted">
              Por{" "}
              <Link href="/sobre" className="font-semibold text-text underline underline-offset-4 hover:text-accent">
                Ivan Dias
              </Link>
              , IDA Produtora · Publicado em <time dateTime={publicado}>{formatarData(publicado)}</time>
              {atualizado && atualizado !== publicado && (
                <>
                  {" "}
                  · Atualizado em <time dateTime={atualizado}>{formatarData(atualizado)}</time>
                </>
              )}
            </p>
          </header>
          <div className="prosa mt-8 max-w-none">{conteudo}</div>
          {!ehPilar && (
            <p className="mt-12 border-t border-surface pt-6 text-[15px] text-muted">
              Este artigo faz parte do guia{" "}
              <Link href={pilar.url} className="text-text underline underline-offset-4 hover:text-accent">
                {pilar.titulo}
              </Link>
              .
            </p>
          )}
        </article>
      </Container>
    </>
  );
}
