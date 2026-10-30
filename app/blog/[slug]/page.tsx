// Artigo do blog (pilar ou complementar). Só artigos com status "publicado" geram página.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/secoes";
import { BarraLaranja, Container, Eyebrow, JsonLd } from "@/components/ui";
import { artigo, complementaresPublicados, dataArtigo, formatarData, pilarDe, publicados, slugsPublicados } from "@/lib/blog";
import { renderizarMdx } from "@/lib/mdx";
import { altDaCapa, capaDoArtigo, videoDoArtigo } from "@/lib/midia-blog";
import { VideoFacade } from "@/components/VideoFacade";
import { dadosVideoSchema } from "@/components/secoes";
import { SITE, artigo as artigoSchema, comoFazer, grafo, video as videoSchema } from "@/lib/schema";
import { passosDoMdx } from "@/components/blog";
import { CapaArtigo } from "@/components/CapaArtigo";
import { compartilhamento } from "@/lib/seo";

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
    ...compartilhamento({
      titulo,
      descricao,
      caminho: a.plano.url,
      tipo: "article",
      imagem: capaDoArtigo(slug) ? { url: capaDoArtigo(slug)!, width: 1600, height: 900, alt: altDaCapa(slug) ?? titulo } : null,
      publicado,
      atualizado,
      tags: [a.plano.palavraChave, ...(a.plano.palavrasSecundarias ?? [])],
    }),
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
  const capa = capaDoArtigo(slug);
  const video = videoDoArtigo(slug);

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
            capa,
            capaAlt: altDaCapa(slug),
            pilarUrl: ehPilar ? undefined : pilar.url,
            complementaresPublicados: ehPilar ? complementaresPublicados(plano.pilar).map((c) => c.plano.url) : undefined,
          }),
          ...(video ? [videoSchema(dadosVideoSchema(video))] : []),
          ...(plano.formato === "Como fazer" && passosDoMdx(doc.conteudo).length >= 2 ? [comoFazer(plano.titulo, passosDoMdx(doc.conteudo))] : []),
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
          <CapaArtigo
            slug={slug}
            titulo={plano.titulo}
            servicoNome={plano.servicoNome}
            prioridade
            sizes="(min-width: 800px) 760px, 100vw"
            className="mt-8 rounded-ida"
          />
          <div className="prosa mt-8 max-w-none">{conteudo}</div>
          {video && (
            <section aria-labelledby="video-ida" className="mt-12 border-t border-surface pt-8">
              <h2 id="video-ida" className="m-0 mb-2 text-2xl font-bold">
                Trabalho da IDA Produtora
              </h2>
              <p className="m-0 mb-5 text-[15px] text-muted">
                {video.cliente} · {video.projeto}. Veja mais no <Link href="/portfolio" className="text-text underline underline-offset-4 hover:text-accent">portfólio</Link>.
              </p>
              <VideoFacade youtubeId={video.youtubeId} titulo={`${video.cliente} · ${video.projeto}`} thumbnail={video.thumbnail} />
            </section>
          )}
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
