// /blog/categoria/<slug-do-pilar> — todos os artigos publicados do cluster numa página (sem ?page=).
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CabecalhoInstitucional, metadataInstitucional } from "@/components/PaginaInstitucional";
import { CardArtigo } from "@/components/blog";
import { Container } from "@/components/ui";
import { complementaresPublicados, publicados } from "@/lib/blog";

export const dynamicParams = false;

const pilaresPublicados = () => publicados().filter((a) => a.plano.tipo === "pilar");

export function generateStaticParams() {
  return pilaresPublicados().map((a) => ({ slug: a.plano.slug }));
}

const descricaoDe = (nome: string) => `Artigos da IDA Produtora sobre ${nome.toLowerCase()}: guias, custos, checklists e comparações para empresas.`;

export async function generateMetadata({ params }: PageProps<"/blog/categoria/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = pilaresPublicados().find((a) => a.plano.slug === slug);
  if (!p) return {};
  return metadataInstitucional({
    titulo: ((t) => (t.length <= 60 ? t : `${p.plano.servicoNome}: artigos e guias`))(`${p.plano.servicoNome}: artigos e guias | IDA Produtora`),
    descricao: descricaoDe(p.plano.servicoNome),
    url: `/blog/categoria/${slug}`,
  });
}

export default async function Categoria({ params }: PageProps<"/blog/categoria/[slug]">) {
  const { slug } = await params;
  const p = pilaresPublicados().find((a) => a.plano.slug === slug);
  if (!p) notFound();
  const comps = complementaresPublicados(p.plano.pilar);

  return (
    <>
      <CabecalhoInstitucional
        tipo="CollectionPage"
        url={`/blog/categoria/${slug}`}
        nome={p.plano.servicoNome}
        eyebrow="BLOG · CATEGORIA"
        h1={`Artigos sobre ${p.plano.servicoNome.toLowerCase()}`}
        descricao={descricaoDe(p.plano.servicoNome)}
        intro={
          <p>
            Comece pelo guia completo e aprofunde nos artigos do tema. Para contratar, veja o serviço de{" "}
            <Link href={p.plano.servico} className="text-text underline underline-offset-4 hover:text-accent">
              {p.plano.servicoNome.toLowerCase()}
            </Link>
            .
          </p>
        }
      />
      <Container className="pb-24">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
          <CardArtigo artigo={p.plano} />
          {comps.map((c) => (
            <CardArtigo key={c.plano.slug} artigo={c.plano} />
          ))}
        </div>
      </Container>
    </>
  );
}
