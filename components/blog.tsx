// Componentes do blog: IndiceArtigo, CardArtigo, LeiaTambem.
import Link from "next/link";
import GithubSlugger from "github-slugger";

import { blogPlano, type ArtigoPlano } from "@/lib/dados";

export type ItemIndice = { id: string; titulo: string };

/** Extrai os H2 de um MDX com os mesmos ids que o rehype-slug gera. */
export function indiceDoMdx(fonte: string): ItemIndice[] {
  const slugger = new GithubSlugger();
  const semComentarios = fonte.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/```[\s\S]*?```/g, "");
  const itens: ItemIndice[] = [];
  for (const linha of semComentarios.split("\n")) {
    const h = /^(#{2,3})\s+(.+?)\s*$/.exec(linha);
    if (!h) continue;
    const texto = h[2].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "");
    const id = slugger.slug(texto);
    if (h[1] === "##") itens.push({ id, titulo: texto });
  }
  return itens;
}

export function IndiceArtigo({ itens }: { itens: ItemIndice[] }) {
  if (!itens.length) return null;
  return (
    <nav aria-labelledby="indice-titulo" className="not-prose my-8 rounded-ida border border-surface p-6">
      <p id="indice-titulo" className="m-0 mb-4 text-xs tracking-[0.3em] text-muted">
        NESTE GUIA
      </p>
      <ol className="m-0 flex list-none flex-col gap-1 p-0 text-[15px]">
        {itens.map((it, i) => (
          <li key={it.id} className="flex gap-3">
            <span className="min-w-6 font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
            <a href={`#${it.id}`} className="inline-flex min-h-6 text-text no-underline hover:text-accent">
              {it.titulo}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CardArtigo({ artigo, resumo }: { artigo: ArtigoPlano; resumo?: string }) {
  return (
    <Link
      href={artigo.url}
      className="group flex flex-col gap-3 rounded-ida border border-surface bg-bg p-7 text-text no-underline transition hover:border-accent"
    >
      <p className="m-0 text-[11px] tracking-[0.3em] text-muted uppercase">
        {artigo.tipo === "pilar" ? "Guia completo" : artigo.formato} · {artigo.servicoNome}
      </p>
      <h3 className="m-0 text-lg leading-snug font-semibold">{artigo.titulo}</h3>
      <p className="m-0 text-[15px] leading-relaxed text-muted">{resumo ?? artigo.pergunta}</p>
      <span className="mt-auto text-[13px] font-semibold tracking-[0.08em] text-accent">LER ARTIGO →</span>
    </Link>
  );
}

/** Cards "Leia também" a partir de URLs do blog-plan. Só mostra artigos publicados quando `publicados` é passado. */
export function LeiaTambem({
  urls,
  titulo = "Leia também",
  publicados,
}: {
  urls: string[];
  titulo?: string;
  publicados?: Set<string>;
}) {
  const artigos = urls
    .map((u) => blogPlano.find((a) => a.url === u))
    .filter((a): a is ArtigoPlano => !!a && (!publicados || publicados.has(a.slug)));
  if (!artigos.length) return null;
  return (
    <section aria-labelledby="leia-tambem-titulo" className="not-prose my-12">
      <h2 id="leia-tambem-titulo" className="m-0 mb-6 text-2xl font-bold">
        {titulo}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
        {artigos.map((a) => (
          <CardArtigo key={a.url} artigo={a} />
        ))}
      </div>
    </section>
  );
}

/** Passos de um artigo "Como fazer": a primeira lista numerada do MDX vira HowTo (nome = trecho em negrito). */
export function passosDoMdx(fonte: string): { nome: string; texto: string }[] {
  const linhas = fonte.split("\n");
  const inicio = linhas.findIndex((l) => /^1\.\s+/.test(l));
  if (inicio < 0) return [];
  const passos: { nome: string; texto: string }[] = [];
  for (let i = inicio; i < linhas.length && /^\d+\.\s+/.test(linhas[i]); i++) {
    const item = linhas[i].replace(/^\d+\.\s+/, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    const negrito = /^\*\*(.+?)\*\*[:.]?\s*(.*)$/.exec(item);
    const nome = (negrito ? negrito[1] : item.split(/[.:]/)[0]).replace(/[*_`]/g, "").trim();
    const texto = (negrito ? negrito[2] || negrito[1] : item).replace(/[*_`]/g, "").trim();
    passos.push({ nome, texto });
  }
  return passos;
}
