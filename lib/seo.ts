// Metadados de compartilhamento (Open Graph + X/Twitter) completos por página.
// O Next substitui o openGraph/twitter do layout inteiro quando a página define o seu,
// então cada página precisa repetir siteName, imagem e o tipo de card.
import type { Metadata } from "next";

import { SITE } from "@/lib/schema";

const IMAGEM_PADRAO = { url: "/brand/og-image.png", width: 1200, height: 630, type: "image/png", alt: "Logo da IDA Produtora Audiovisual" };

type Opcoes = {
  titulo: string;
  descricao: string;
  /** caminho relativo, ex.: /blog/briefing-de-video */
  caminho: string;
  tipo?: "website" | "article";
  imagem?: { url: string; width: number; height: number; alt?: string; type?: string } | null;
  publicado?: string;
  atualizado?: string;
  secao?: string;
  tags?: string[];
};

export function compartilhamento(o: Opcoes): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `${SITE}${o.caminho}`;
  const imagem = o.imagem ? { alt: o.titulo, type: "image/webp", ...o.imagem } : IMAGEM_PADRAO;
  const base = {
    url,
    title: o.titulo,
    description: o.descricao,
    siteName: "IDA Produtora Audiovisual",
    locale: "pt_BR",
    images: [imagem],
  };
  return {
    openGraph:
      o.tipo === "article"
        ? {
            ...base,
            type: "article",
            publishedTime: o.publicado || undefined,
            modifiedTime: o.atualizado || undefined,
            authors: [`${SITE}/sobre`],
            section: o.secao,
            tags: o.tags,
          }
        : { ...base, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: o.titulo,
      description: o.descricao,
      images: [{ url: imagem.url, alt: imagem.alt }],
    },
  };
}
