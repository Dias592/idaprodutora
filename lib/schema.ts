// Geradores de JSON-LD da IDA Produtora.
// Uso: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo([...])) }} />

import { perfisAtivos } from "@/lib/redes";

export const SITE = "https://idaprodutora.com.br";
export const ORG_ID = `${SITE}/#org`;
export const WHATSAPP = "+55-11-95302-5177";

type JsonLd = Record<string, unknown>;

export const grafo = (nos: JsonLd[]): JsonLd => ({ "@context": "https://schema.org", "@graph": nos });

export const organizacao = (): JsonLd => ({
  "@type": ["Organization", "LocalBusiness"],
  "@id": ORG_ID,
  name: "IDA Produtora Audiovisual",
  alternateName: "IDA Produtora",
  url: SITE,
  logo: `${SITE}/brand/ida-logo-principal-preto.svg`,
  image: `${SITE}/brand/og-image.png`,
  slogan: "Sua história. Nosso olhar.",
  description:
    "Produtora audiovisual corporativa em São Paulo: vídeo institucional, filmagem de eventos, transmissão ao vivo, shows, vídeo 360°, drone e fotografia.",
  telephone: WHATSAPP,
  address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
  areaServed: [
    { "@type": "City", name: "São Paulo" },
    { "@type": "AdministrativeArea", name: "Região Metropolitana de São Paulo" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: WHATSAPP,
    contactType: "sales",
    availableLanguage: "pt-BR",
    url: "https://wa.me/5511953025177",
  },
  ...(perfisAtivos().length ? { sameAs: perfisAtivos() } : {}),
  founder: { "@type": "Person", name: "Ivan Dias", url: `${SITE}/sobre` },
  knowsAbout: [
    "vídeo institucional", "filmagem de eventos corporativos", "transmissão ao vivo", "filmagem de shows",
    "vídeo 360 graus", "filmagem com drone", "fotografia corporativa", "comunicação interna", "chroma key",
  ],
});

export const website = (): JsonLd => ({
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "IDA Produtora Audiovisual",
  inLanguage: "pt-BR",
  publisher: { "@id": ORG_ID },
});

export const catalogo = (servicos: { nome: string; url: string }[]): JsonLd => ({
  "@type": "OfferCatalog",
  "@id": `${SITE}/#servicos`,
  name: "Serviços da IDA Produtora",
  itemListElement: servicos.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.nome, url: `${SITE}${s.url}` },
  })),
});

export const servico = (s: { nome: string; url: string; descricao: string; tipo?: string; area?: string }): JsonLd => ({
  "@type": "Service",
  "@id": `${SITE}${s.url}#servico`,
  name: s.nome,
  serviceType: s.tipo ?? s.nome,
  description: s.descricao,
  url: `${SITE}${s.url}`,
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "City", name: s.area ?? "São Paulo" },
  availableChannel: { "@type": "ServiceChannel", serviceUrl: "https://wa.me/5511953025177" },
});

export const lugar = (nome: string, cidade = "São Paulo"): JsonLd => ({
  "@type": "Place",
  name: nome,
  address: { "@type": "PostalAddress", addressLocality: cidade, addressRegion: "SP", addressCountry: "BR" },
});

export const breadcrumb = (itens: { nome: string; url: string }[]): JsonLd => ({
  "@type": "BreadcrumbList",
  itemListElement: itens.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.nome, item: `${SITE}${it.url}` })),
});

export const faq = (itens: { pergunta: string; resposta: string }[]): JsonLd => ({
  "@type": "FAQPage",
  mainEntity: itens.map((it) => ({
    "@type": "Question",
    name: it.pergunta,
    acceptedAnswer: { "@type": "Answer", text: it.resposta },
  })),
});

export const comoFazer = (nome: string, passos: { nome: string; texto: string }[]): JsonLd => ({
  "@type": "HowTo",
  name: nome,
  step: passos.map((p, i) => ({ "@type": "HowToStep", position: i + 1, name: p.nome, text: p.texto })),
});

export const video = (v: {
  titulo: string; descricao: string; youtubeId: string; dataUpload: string; duracao: string;
  thumbnail?: string; // "maxresdefault" (padrão) ou "sddefault" quando o vídeo não tem maxres
}): JsonLd => ({
  "@type": "VideoObject",
  name: v.titulo,
  description: v.descricao,
  thumbnailUrl: `https://i.ytimg.com/vi/${v.youtubeId}/${v.thumbnail ?? "maxresdefault"}.jpg`,
  uploadDate: v.dataUpload,
  duration: v.duracao,
  embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`,
  contentUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
  publisher: { "@id": ORG_ID },
});

type Artigo = {
  tipo: "pilar" | "complementar";
  titulo: string; metaDescription: string; url: string; capa?: string; capaAlt?: string;
  publishedAt: string; updatedAt: string; palavraChave: string;
  pilarUrl?: string; complementaresPublicados?: string[];
};

export const artigo = (a: Artigo): JsonLd => ({
  "@type": a.tipo === "pilar" ? "Article" : "BlogPosting",
  "@id": `${SITE}${a.url}#artigo`,
  headline: a.titulo,
  description: a.metaDescription,
  url: `${SITE}${a.url}`,
  image: a.capa
    ? { "@type": "ImageObject", url: `${SITE}${a.capa}`, width: 1600, height: 900, ...(a.capaAlt ? { caption: a.capaAlt } : {}) }
    : `${SITE}/brand/og-image.png`,
  datePublished: a.publishedAt,
  dateModified: a.updatedAt,
  inLanguage: "pt-BR",
  keywords: a.palavraChave,
  author: { "@type": "Person", name: "Ivan Dias", url: `${SITE}/sobre` },
  publisher: { "@id": ORG_ID },
  mainEntityOfPage: `${SITE}${a.url}`,
  ...(a.tipo === "complementar" && a.pilarUrl ? { isPartOf: { "@id": `${SITE}${a.pilarUrl}#artigo` } } : {}),
  ...(a.tipo === "pilar" && a.complementaresPublicados?.length
    ? { hasPart: a.complementaresPublicados.map((u) => ({ "@id": `${SITE}${u}#artigo` })) }
    : {}),
});

export const listaVideos = (videos: Parameters<typeof video>[0][]): JsonLd => ({
  "@type": "ItemList",
  itemListElement: videos.map((v, i) => ({ "@type": "ListItem", position: i + 1, item: video(v) })),
});

/** Galeria de fotos (ImageGallery com ImageObject), para o /portfolio. */
export const galeriaImagens = (p: { nome: string; url: string; fotos: { id: string; alt: string; largura: number; altura: number }[] }): JsonLd => ({
  "@type": "ImageGallery",
  "@id": `${SITE}${p.url}#fotos`,
  name: p.nome,
  url: `${SITE}${p.url}`,
  inLanguage: "pt-BR",
  author: { "@id": ORG_ID },
  image: p.fotos.map((f) => ({
    "@type": "ImageObject",
    contentUrl: `${SITE}/portfolio/fotos/ampliadas/${f.id}.webp`,
    thumbnailUrl: `${SITE}/portfolio/fotos/${f.id}.webp`,
    width: f.largura,
    height: f.altura,
    caption: f.alt,
    creditText: "IDA Produtora Audiovisual",
    copyrightNotice: "IDA Produtora Audiovisual",
    creator: { "@id": ORG_ID },
  })),
});

/** Página genérica (institucionais): AboutPage, CollectionPage, ContactPage, WebPage. */
export const pagina = (p: { tipo: "AboutPage" | "CollectionPage" | "ContactPage" | "WebPage"; nome: string; url: string; descricao: string; extra?: JsonLd }): JsonLd => ({
  "@type": p.tipo,
  "@id": `${SITE}${p.url}#pagina`,
  name: p.nome,
  url: `${SITE}${p.url}`,
  description: p.descricao,
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${SITE}/#website` },
  about: { "@id": ORG_ID },
  ...(p.extra ?? {}),
});

export const pessoa = (p: { nome: string; cargo: string; url: string }): JsonLd => ({
  "@type": "Person",
  "@id": `${SITE}${p.url}#${p.nome.toLowerCase().replace(/\s+/g, "-")}`,
  name: p.nome,
  jobTitle: p.cargo,
  url: `${SITE}${p.url}`,
  worksFor: { "@id": ORG_ID },
});
