// Seções de página (server components): Hero, RespostaDireta, CardServico, Diferenciais, GradePortfolio,
// Etapas, FaixaClientes, TabelaPacotes, Faq, Breadcrumb.
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Check } from "lucide-react";

import { BarraLaranja, Botao, Container, Eyebrow, JsonLd, TituloSecao, cx } from "@/components/ui";
import { VideoFacade } from "@/components/VideoFacade";
import type { ServicoVitrine } from "@/lib/catalogo";
import { breadcrumb, faq as faqSchema, grafo, listaVideos } from "@/lib/schema";
import { clientes, type Video } from "@/lib/dados";

// ---------- Hero ----------

export function Hero({
  eyebrow,
  titulo,
  subtitulo,
  acoes,
  rodape,
  midia,
  antes,
}: {
  eyebrow: string;
  titulo: string;
  subtitulo: ReactNode;
  acoes?: ReactNode;
  rodape?: ReactNode;
  midia?: ReactNode;
  antes?: ReactNode; // ex.: Breadcrumb
}) {
  return (
    <Container>
      {antes}
      <section aria-labelledby="hero-titulo" className="flex flex-wrap items-center gap-14 py-14 lg:py-[88px]">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="hero-titulo" className="m-0 text-[34px] leading-[1.1] font-bold tracking-[-0.01em] sm:text-[44px] lg:text-[54px]">
            {titulo}
          </h1>
          <BarraLaranja />
          <p className="m-0 max-w-[560px] text-lg leading-relaxed text-muted sm:text-[19px]">{subtitulo}</p>
          {acoes && <div className="mt-2 flex flex-wrap gap-3">{acoes}</div>}
          {rodape}
        </div>
        {midia && <div className="min-w-0 flex-[1_1_520px]">{midia}</div>}
      </section>
    </Container>
  );
}

export function Slogan() {
  return (
    <p className="m-0 mt-2 text-xs tracking-[0.3em] text-muted">
      SUA HISTÓRIA. <span className="text-accent">NOSSO OLHAR.</span>
    </p>
  );
}

// ---------- Resposta direta (AEO) ----------

export function RespostaDireta({ rotulo = "O QUE É", children }: { rotulo?: string; children: ReactNode }) {
  return (
    <section aria-label="Resumo" className="bg-surface">
      <Container className="flex flex-wrap items-baseline gap-x-14 gap-y-6 py-10">
        {/* Laranja sobre surface só passa em texto grande (docs/05): rótulo pequeno em branco + traço laranja. */}
        <h2 className="m-0 flex flex-none items-center gap-3 text-[13px] font-medium tracking-[0.3em] text-text">
          <span aria-hidden="true" className="h-[3px] w-6 bg-accent" />
          {rotulo}
        </h2>
        <div className="min-w-0 flex-[1_1_520px] text-lg leading-[1.65] text-text [&>p]:m-0">{children}</div>
      </Container>
    </section>
  );
}

/** Versão para dentro de artigos (MDX): bloco destacado sem ocupar a largura toda. */
export function RespostaDiretaArtigo({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 border-l-[3px] border-accent bg-surface px-6 py-5 text-lg leading-[1.65] [&>p]:m-0">
      <p className="mb-2! text-xs font-medium tracking-[0.3em] text-text">RESPOSTA RÁPIDA</p>
      {children}
    </div>
  );
}

// ---------- Cards de serviço ----------

export function CardServico({ servico }: { servico: ServicoVitrine }) {
  const Icone = servico.icone;
  return (
    <Link
      href={servico.url}
      className="group flex flex-col gap-3.5 rounded-ida border border-surface bg-bg p-8 text-text no-underline transition hover:border-accent"
    >
      <Icone aria-hidden="true" size={32} strokeWidth={1.5} />
      <h3 className="m-0 text-xl font-semibold">{servico.nome}</h3>
      <p className="m-0 text-[15px] leading-relaxed text-muted">{servico.resumo}</p>
      <span className="mt-auto text-[13px] font-semibold tracking-[0.08em] text-accent">VER SERVIÇO →</span>
    </Link>
  );
}

export function GradeServicos({ servicos }: { servicos: ServicoVitrine[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
      {servicos.map((s) => (
        <CardServico key={s.url} servico={s} />
      ))}
    </div>
  );
}

// ---------- Diferenciais ----------

export function Diferenciais({
  eyebrow = "POR QUE A IDA",
  titulo,
  itens,
}: {
  eyebrow?: string;
  titulo: string;
  itens: { titulo: string; texto: string }[];
}) {
  return (
    <Container>
      <section aria-labelledby="diferenciais-titulo" className="flex flex-wrap items-stretch gap-12 border-t border-surface py-14 lg:pb-[104px]">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="diferenciais-titulo" className="m-0 text-[28px] leading-[1.2] font-bold sm:text-[36px]">
            {titulo}
          </h2>
          <BarraLaranja />
        </div>
        <div className="grid min-w-0 flex-[1_1_560px] grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-8">
          {itens.map((it) => (
            <div key={it.titulo} className="flex flex-col gap-2.5">
              <h3 className="m-0 text-[17px] font-semibold">{it.titulo}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-muted">{it.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

// ---------- Portfólio ----------

const temId = (v: Video) => /^[\w-]{11}$/.test(v.youtubeId);

export const dadosVideoSchema = (v: Video) => ({
  titulo: `${v.cliente} · ${v.projeto}`,
  descricao: `${v.projeto} produzido pela IDA Produtora Audiovisual para ${v.cliente}.`,
  youtubeId: v.youtubeId,
  dataUpload: v.dataUpload,
  duracao: v.duracao,
  thumbnail: v.thumbnail,
});

export function GradePortfolio({ videos, comSchema = true, prioridade = false }: { videos: Video[]; comSchema?: boolean; prioridade?: boolean }) {
  const validos = videos.filter(temId);
  return (
    <>
      {comSchema && validos.length > 0 && <JsonLd dados={grafo([listaVideos(validos.map(dadosVideoSchema))])} />}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-x-4 gap-y-8">
        {validos.map((v, i) => (
          <figure key={v.youtubeId} className="m-0 flex flex-col gap-3">
            <VideoFacade
              youtubeId={v.youtubeId}
              titulo={`${v.cliente} · ${v.projeto}`}
              thumbnail={v.thumbnail}
              prioridade={prioridade && i === 0}
              sizes="(min-width: 1240px) 400px, (min-width: 768px) 50vw, 100vw"
            />
            <figcaption className="text-sm text-muted">
              <strong className="font-semibold text-text">{v.cliente}</strong> · {v.projeto}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

// ---------- Etapas ----------

export function Etapas({ etapas }: { etapas: { titulo: string; texto: string }[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-8 p-0">
      {etapas.map((e, i) => (
        <li key={e.titulo} className="flex flex-col gap-3 border-t border-surface pt-6">
          <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="m-0 text-[19px] font-semibold">{e.titulo}</h3>
          <p className="m-0 text-[15px] leading-relaxed text-muted">{e.texto}</p>
        </li>
      ))}
    </ol>
  );
}

// ---------- Faixa de clientes ----------

/** Logos tratados por scripts/logos-clientes.mjs. Publicar só com autorização de cada cliente (docs/08). */
export function FaixaClientes({ rotulo = "QUEM JÁ CONFIOU" }: { rotulo?: string }) {
  return (
    <section aria-label="Clientes" className="border-y border-surface">
      <Container className="flex flex-wrap items-center justify-between gap-6 py-10">
        <Eyebrow>{rotulo}</Eyebrow>
        <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-4 p-0">
          {clientes.map((c) => (
            <li key={c.nome} className="flex h-14 w-[140px] items-center justify-center">
              <Image
                src={c.destino}
                alt={c.nome}
                width={140}
                height={56}
                className="h-full w-full object-contain opacity-70 transition hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// ---------- Pacotes ----------

export type Pacote = { nome: string; descricao: string; preco: string; destaque?: boolean; itens?: string[] };

export function TabelaPacotes({ pacotes, nota }: { pacotes: Pacote[]; nota?: string }) {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
        {pacotes.map((p) => (
          <div
            key={p.nome}
            className={cx("flex flex-col gap-4 rounded-ida bg-bg p-9", p.destaque ? "border-2 border-accent" : "border border-bg")}
          >
            {p.destaque && <p className="m-0 text-[11px] tracking-[0.3em] text-accent">MAIS PEDIDO</p>}
            <h3 className="m-0 text-[22px] font-bold">{p.nome}</h3>
            <p className="m-0 text-[15px] leading-relaxed text-muted">{p.descricao}</p>
            {p.itens && (
              <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
                {p.itens.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <Check aria-hidden="true" size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            )}
            <p className="m-0 mt-auto text-sm text-muted">
              {/^sob consulta$/i.test(p.preco) ? (
                <strong className="text-2xl text-text">Sob consulta</strong>
              ) : (
                <>
                  a partir de <strong className="text-2xl text-text">{p.preco}</strong>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
      {nota && <p className="mt-6 text-sm text-muted">{nota}</p>}
    </>
  );
}

// ---------- FAQ ----------

export type ItemFaq = { pergunta: string; resposta: string };

/** FAQ com details/summary. `comSchema` emite o FAQPage junto (use uma vez por página). */
export function Faq({ itens, comSchema = false }: { itens: ItemFaq[]; comSchema?: boolean }) {
  return (
    <div className="flex flex-col">
      {comSchema && <JsonLd dados={grafo([faqSchema(itens)])} />}
      {itens.map((it, i) => (
        <details key={it.pergunta} className={cx("group border-t border-surface py-6", i === itens.length - 1 && "border-b")}>
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {it.pergunta}
            <span aria-hidden="true" className="text-2xl leading-none text-accent transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="m-0 mt-4 text-base leading-[1.65] text-muted">{it.resposta}</p>
        </details>
      ))}
    </div>
  );
}

// ---------- Breadcrumb ----------

export function Breadcrumb({ itens }: { itens: { nome: string; url: string }[] }) {
  return (
    <>
      <JsonLd dados={grafo([breadcrumb(itens)])} />
      <nav aria-label="Você está em" className="pt-6 text-[13px] text-muted">
        <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
          {itens.map((it, i) => {
            const ultimo = i === itens.length - 1;
            return (
              <li key={it.url} className="flex items-center gap-1.5">
                {ultimo ? (
                  <span aria-current="page" className="text-text">
                    {it.nome}
                  </span>
                ) : (
                  <>
                    <Link href={it.url} className="inline-flex min-h-6 items-center text-muted hover:text-text">
                      {it.nome}
                    </Link>
                    <span aria-hidden="true">›</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

// ---------- Seção padrão ----------

export function Secao({
  id,
  eyebrow,
  titulo,
  fundo = "bg",
  largura = "larga",
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  titulo: string;
  fundo?: "bg" | "surface";
  largura?: "larga" | "estreita";
  children: ReactNode;
  className?: string;
}) {
  const tituloId = `${id ?? titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-titulo`;
  return (
    <section id={id} aria-labelledby={tituloId} className={cx(fundo === "surface" && "bg-surface", "scroll-mt-24", className)}>
      <Container className={cx("py-20 lg:py-[104px]", largura === "estreita" && "max-w-[920px]")}>
        <TituloSecao eyebrow={eyebrow} titulo={titulo} id={tituloId} className="mb-10 lg:mb-12" />
        {children}
      </Container>
    </section>
  );
}

export { Botao };
