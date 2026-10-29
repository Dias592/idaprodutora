// /blog — artigos organizados por pilar (cluster).
import Link from "next/link";

import { CabecalhoInstitucional, metadataInstitucional } from "@/components/PaginaInstitucional";
import { CardArtigo } from "@/components/blog";
import { Container } from "@/components/ui";
import { complementaresPublicados, publicados } from "@/lib/blog";

const DESCRICAO = "Guias da IDA Produtora sobre vídeo institucional, eventos, transmissão ao vivo, drone, 360°, fotografia e comunicação interna.";

export const metadata = metadataInstitucional({ titulo: "Blog da IDA Produtora: guias de vídeo para empresas", descricao: DESCRICAO, url: "/blog" });

export default function Blog() {
  const pilares = publicados().filter((a) => a.plano.tipo === "pilar");

  return (
    <>
      <CabecalhoInstitucional
        tipo="CollectionPage"
        url="/blog"
        nome="Blog"
        eyebrow="BLOG"
        h1="Guias de vídeo e foto para empresas"
        descricao={DESCRICAO}
        intro={<p>Tudo o que a sua empresa precisa saber antes de contratar vídeo, foto, transmissão ao vivo ou drone, explicado por quem produz.</p>}
      />
      <Container className="flex flex-col gap-16 pb-24">
        {pilares.map(({ plano }) => {
          const comps = complementaresPublicados(plano.pilar);
          return (
            <section key={plano.slug} aria-labelledby={`cluster-${plano.pilar}`} className="border-t border-surface pt-10">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <h2 id={`cluster-${plano.pilar}`} className="m-0 text-2xl font-bold">
                  {plano.servicoNome}
                </h2>
                <Link href={`/blog/categoria/${plano.slug}`} className="text-[15px] font-semibold text-text underline underline-offset-4 hover:text-accent">
                  Todos os artigos de {plano.servicoNome.toLowerCase()}
                </Link>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
                <CardArtigo artigo={plano} />
                {comps.slice(0, 2).map((c) => (
                  <CardArtigo key={c.plano.slug} artigo={c.plano} />
                ))}
              </div>
            </section>
          );
        })}
        {pilares.length === 0 && <p className="text-muted">Os primeiros guias serão publicados em breve.</p>}
      </Container>
    </>
  );
}
