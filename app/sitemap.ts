import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

import { SITE } from "@/lib/schema";
import {
  PAGINAS_INSTITUCIONAIS,
  artigosPublicados,
  dataValida,
  documentosPublicados,
  locais,
  paginasServico,
  pilaresPublicados,
} from "@/lib/content";
import { fotosHome, fotosPortfolio } from "@/lib/dados";
import { capaDoArtigo } from "@/lib/midia-blog";

// Uma URL só entra no sitemap quando a página existe de fato:
// serviços e locais → quando há content/<colecao>/<slug>.mdx publicado;
// institucionais → quando há app/<rota>/page.tsx; artigos → status "publicado".
const rotaExiste = (rota: string) =>
  fs.existsSync(path.join(process.cwd(), "app", rota.slice(1), "page.tsx")) ||
  fs.existsSync(path.join(process.cwd(), "app", "(site)", rota.slice(1), "page.tsx"));

const url = (caminho: string) => (caminho === "/" ? SITE : `${SITE}${caminho}`);
// Sitemap de imagens (Google Imagens): fotos ampliadas da galeria e capas dos artigos.
const fotoAmpliada = (id: string) => `${SITE}/portfolio/fotos/ampliadas/${id}.webp`;

export default function sitemap(): MetadataRoute.Sitemap {
  const entradas: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1, images: fotosHome.map((f) => fotoAmpliada(f.id)) },
  ];

  const porSlug = (colecao: "servicos" | "locais") =>
    new Map(documentosPublicados(colecao).map((d) => [d.slug, d.frontmatter]));

  const mdxServicos = porSlug("servicos");
  for (const s of paginasServico) {
    const fm = mdxServicos.get(s.url.slice(1));
    if (!fm) continue;
    entradas.push({ url: url(s.url), lastModified: dataValida(fm.updatedAt), changeFrequency: "monthly", priority: 0.9 });
  }

  const mdxLocais = porSlug("locais");
  for (const l of locais) {
    const fm = mdxLocais.get(l.url.slice(1));
    if (!fm) continue;
    entradas.push({ url: url(l.url), lastModified: dataValida(fm.updatedAt), changeFrequency: "monthly", priority: 0.7 });
  }

  for (const rota of PAGINAS_INSTITUCIONAIS) {
    if (!rotaExiste(rota)) continue;
    const imagens = rota === "/portfolio" ? { images: fotosPortfolio.map((f) => fotoAmpliada(f.id)) } : {};
    entradas.push({ url: url(rota), changeFrequency: "yearly", priority: 0.5, ...imagens });
  }

  const artigos = artigosPublicados();
  if (artigos.length) {
    entradas.push({ url: url("/blog"), changeFrequency: "weekly", priority: 0.6 });
    for (const p of pilaresPublicados()) {
      entradas.push({ url: url(`/blog/categoria/${p.slug}`), changeFrequency: "weekly", priority: 0.5 });
    }
    for (const a of artigos) {
      entradas.push({
        url: url(`/blog/${a.slug}`),
        lastModified: dataValida(a.frontmatter.updatedAt) ?? dataValida(a.frontmatter.publishedAt),
        changeFrequency: "monthly",
        priority: a.frontmatter.tipo === "pilar" ? 0.8 : 0.6,
        ...(capaDoArtigo(a.slug) ? { images: [`${SITE}${capaDoArtigo(a.slug)}`] } : {}),
      });
    }
  }

  return entradas;
}
