// Páginas de serviço: modelo de 10 blocos (docs/02-paginas.md).
// Só geram rota os serviços com content/servicos/<slug>.mdx publicado.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { Botao, Container, JsonLd, TituloSecao } from "@/components/ui";
import {
  Breadcrumb,
  Etapas,
  Faq,
  GradePortfolio,
  Hero,
  RespostaDireta,
  Secao,
  TabelaPacotes,
  dadosVideoSchema,
} from "@/components/secoes";
import { VideoFacade } from "@/components/VideoFacade";
import { FormularioWhatsApp } from "@/components/whatsapp";
import { servicoPorUrl } from "@/lib/catalogo";
import { artigosPublicados, blogPlano, videos } from "@/lib/content";
import { renderizarMdx } from "@/lib/mdx";
import { paginaServico, slugsServicosPublicados } from "@/lib/servico-conteudo";
import { SITE, comoFazer, faq as faqSchema, grafo, servico as servicoSchema, video as videoSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return slugsServicosPublicados().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = paginaServico(slug);
  if (!p) return {};
  const url = `${SITE}${p.servico.url}`;
  return {
    title: p.servico.title,
    description: p.servico.description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: p.servico.title, description: p.servico.description, locale: "pt_BR" },
    twitter: { title: p.servico.title, description: p.servico.description },
  };
}

const grupoAncora: Record<string, string> = { "Vídeo": "/#servicos", Eventos: "/#servicos", "Estúdio e Foto": "/#servicos" };

export default async function PaginaDeServico({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const p = paginaServico(slug);
  if (!p) notFound();
  const { servico, conteudo } = p;

  const publicados = new Set(artigosPublicados().map((a) => a.slug));
  const videosServico = (conteudo.videos ?? [])
    .map((cliente) => videos.find((v) => v.cliente === cliente))
    .filter((v): v is (typeof videos)[number] => !!v && /^[\w-]{11}$/.test(v.youtubeId));
  const [videoHero, ...videosPortfolio] = videosServico;
  const faqItens = servico.faq.map((pergunta, i) => ({ pergunta, resposta: conteudo.respostas[i] }));
  const migalhas = [
    { nome: "Home", url: "/" },
    { nome: servico.grupo ?? "Serviços", url: grupoAncora[servico.grupo ?? ""] ?? "/#servicos" },
    { nome: servico.nome, url: servico.url },
  ];

  const corpo = await renderizarMdx(p.corpo, { titulo: servico.nome, origem: "servico", publicados });

  const leia = [servico.leiaNoBlog.pilar, ...(servico.leiaNoBlog.complementares ?? [])]
    .filter((u): u is string => !!u)
    .map((u) => blogPlano.find((a) => a.url === u))
    .filter((a) => !!a);

  return (
    <>
      <JsonLd
        dados={grafo([
          servicoSchema({ nome: servico.nome, url: servico.url, descricao: servico.description, tipo: servico.palavraChave }),
          faqSchema(faqItens),
          comoFazer(`Como funciona: ${servico.nome.toLowerCase()} com a IDA Produtora`, conteudo.etapas.map((e) => ({ nome: e.titulo, texto: e.texto }))),
          ...videosServico.map((v) => videoSchema(dadosVideoSchema(v))),
        ])}
      />

      {/* 1. Hero */}
      <Hero
        antes={<Breadcrumb itens={migalhas} />}
        eyebrow={conteudo.eyebrow ?? `${(servico.grupo ?? "").toUpperCase()} · SÃO PAULO`}
        titulo={servico.h1}
        subtitulo={conteudo.subtitulo}
        acoes={<Botao href="#orcamento">Solicitar orçamento</Botao>}
        midia={
          videoHero ? (
            <figure className="m-0 flex flex-col gap-3">
              <VideoFacade
                youtubeId={videoHero.youtubeId}
                titulo={`${videoHero.cliente} · ${videoHero.projeto}`}
                thumbnail={videoHero.thumbnail}
                prioridade
              />
              <figcaption className="text-[13px] text-muted">
                {videoHero.cliente} · {videoHero.projeto}
              </figcaption>
            </figure>
          ) : undefined
        }
      />

      {/* 2. Resposta direta */}
      <RespostaDireta rotulo="O QUE É">
        <p>{conteudo.respostaDireta}</p>
      </RespostaDireta>

      {/* 3. Para que serve */}
      <section aria-labelledby="usos-titulo">
        <Container className="flex flex-wrap gap-14 pt-20 pb-12 lg:pt-24">
          <TituloSecao id="usos-titulo" titulo="Para que serve" className="min-w-0 flex-[1_1_340px]" />
          <ul className="m-0 grid min-w-0 flex-[1_1_560px] list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-6 p-0">
            {conteudo.usos.map((u) => (
              <li key={u.titulo} className="border-t border-surface pt-[18px]">
                <h3 className="m-0 mb-2 text-[17px] font-semibold">{u.titulo}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-muted">{u.texto}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4. O que está incluso */}
      <section aria-labelledby="incluso-titulo">
        <Container className="flex flex-wrap gap-14 pt-12 pb-20 lg:pb-24">
          <TituloSecao id="incluso-titulo" titulo="O que está incluso" className="min-w-0 flex-[1_1_340px]" />
          <ul className="m-0 flex min-w-0 flex-[1_1_560px] list-none flex-col gap-3.5 p-0 text-base leading-[1.55]">
            {conteudo.incluso.map((it) => (
              <li key={it} className="flex gap-3.5">
                <Check aria-hidden="true" size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" />
                {it}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5. Como funciona */}
      <Secao id="como-funciona" titulo="Como funciona" fundo="surface">
        <Etapas etapas={conteudo.etapas} />
      </Secao>

      {/* Texto de aprofundamento (subintenções: custo, duração, cuidados, locais...) */}
      <section aria-label={`Mais sobre ${servico.nome.toLowerCase()}`}>
        <Container className="py-20 lg:py-24">
          <div className="prosa mx-auto">{corpo}</div>
        </Container>
      </section>

      {/* 6. Portfólio do serviço */}
      {videosPortfolio.length > 0 && (
        <Secao id="portfolio" titulo={conteudo.tituloPortfolio ?? `Portfólio de ${servico.nome.toLowerCase()}`}>
          <GradePortfolio videos={videosPortfolio} comSchema={false} />
        </Secao>
      )}

      {/* 7. Pacotes */}
      <Secao id="pacotes" titulo="Pacotes" fundo="surface">
        <TabelaPacotes pacotes={conteudo.pacotes} nota={conteudo.notaPacotes} />
      </Secao>

      {/* 8. Serviços que combinam */}
      <section aria-labelledby="combinam-titulo">
        <Container className="py-20">
          <h2 id="combinam-titulo" className="m-0 mb-8 text-[28px] font-bold">
            Serviços que combinam
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
            {servico.relacionados.map((url) => {
              const r = servicoPorUrl(url)!;
              return (
                <Link
                  key={url}
                  href={url}
                  className="rounded-ida border border-surface p-7 font-semibold text-text no-underline transition hover:border-accent"
                >
                  {r.nome} <span className="text-accent">→</span>
                  <span className="mt-2 block text-sm font-normal text-muted">{r.resumo}</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 9. FAQ */}
      <Secao id="faq" titulo={`Perguntas sobre ${servico.nome.toLowerCase()}`} largura="estreita">
        <Faq itens={faqItens} />
      </Secao>

      {/* 10. Orçamento + Leia no blog */}
      <section id="orcamento" aria-labelledby="orcamento-titulo" className="scroll-mt-24 bg-surface">
        <Container className="flex flex-wrap gap-14 py-20 lg:py-24">
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-5">
            <TituloSecao id="orcamento-titulo" titulo={`Peça o orçamento de ${servico.nome.toLowerCase()}`} />
            <p className="m-0 text-[17px] leading-[1.65] text-muted">
              O serviço já vem selecionado. Descreva o projeto em poucas linhas e envie: a conversa abre direto com a IDA no WhatsApp.
            </p>
            {leia.length > 0 && (
              <nav aria-labelledby="leia-titulo" className="mt-6 border-t border-bg pt-6">
                <p id="leia-titulo" className="m-0 mb-3 text-xs tracking-[0.3em] text-muted">
                  LEIA NO BLOG
                </p>
                <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
                  {leia.map((a) =>
                    publicados.has(a!.slug) ? (
                      <li key={a!.url}>
                        <Link href={a!.url} className="text-text underline underline-offset-4 hover:text-accent">
                          {a!.titulo}
                        </Link>
                      </li>
                    ) : (
                      <li key={a!.url} className="text-muted">
                        {a!.titulo} <span className="text-xs">(em breve)</span>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
            )}
          </div>
          <div className="min-w-0 flex-[1_1_520px]">
            <FormularioWhatsApp servico={servico.servicoFormulario} origem="servico" pagina={servico.nome} />
          </div>
        </Container>
      </section>

    </>
  );
}
