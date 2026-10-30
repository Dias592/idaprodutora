// Cabeçalho comum das páginas institucionais (/sobre, /portfolio, /clientes, /orcamento, /contato, legais).
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { BarraLaranja, Container, Eyebrow, JsonLd } from "@/components/ui";
import { Breadcrumb } from "@/components/secoes";
import { SITE, grafo, pagina } from "@/lib/schema";
import { compartilhamento } from "@/lib/seo";

type Tipo = "AboutPage" | "CollectionPage" | "ContactPage" | "WebPage";

export const metadataInstitucional = (p: { titulo: string; descricao: string; url: string; indexar?: boolean }): Metadata => ({
  title: p.titulo,
  description: p.descricao,
  alternates: { canonical: `${SITE}${p.url}` },
  ...compartilhamento({ titulo: p.titulo, descricao: p.descricao, caminho: p.url }),
  ...(p.indexar === false ? { robots: { index: false, follow: true } } : {}),
});

export function CabecalhoInstitucional({
  tipo,
  url,
  nome,
  eyebrow,
  h1,
  descricao,
  intro,
  schemaExtra,
}: {
  tipo: Tipo;
  url: string;
  nome: string;
  eyebrow: string;
  h1: string;
  descricao: string;
  intro?: ReactNode;
  schemaExtra?: Record<string, unknown>[];
}) {
  return (
    <>
      <JsonLd dados={grafo([pagina({ tipo, nome, url, descricao }), ...(schemaExtra ?? [])])} />
      <Container>
        <Breadcrumb
          itens={[
            { nome: "Home", url: "/" },
            { nome, url },
          ]}
        />
        <div className="flex flex-col gap-6 pt-12 pb-14 lg:pt-16">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="m-0 max-w-[900px] text-[34px] leading-[1.1] font-bold tracking-[-0.01em] sm:text-[44px] lg:text-[52px]">{h1}</h1>
          <BarraLaranja />
          {intro && <div className="max-w-[720px] text-lg leading-relaxed text-muted [&>p]:m-0 [&>p+p]:mt-4">{intro}</div>}
        </div>
      </Container>
    </>
  );
}
