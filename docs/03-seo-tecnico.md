# 03 — SEO técnico

## Indexação

- `app/sitemap.ts` gera o sitemap a partir de `data/` e `content/`, com `lastmod` real (frontmatter `updatedAt`). Artigos marcados `status: "planejado"` ficam fora.
- `robots.txt`: copiar de `seo/robots.txt`.
- **Canonical** absoluto em todas as páginas (`metadata.alternates.canonical`), sempre sem www e sem barra final.
- **IndexNow** (Bing/Yandex): chave em `/public/<chave>.txt`; script `scripts/indexnow.ts` envia as URLs alteradas após cada deploy.
- Google Search Console e Bing Webmaster Tools verificados antes do lançamento; enviar o sitemap nos dois.
- `llms.txt` na raiz (modelo em `seo/llms.txt`), atualizado pelo build com a lista de serviços e pilares.
- 404 personalizada com links para os grupos de serviço e o formulário.
- Paginação do blog com `?page=` evitada: usar `/blog/categoria/<pilar>` com todos os artigos do cluster numa página.

## Metadados por página

- `title`: até 60 caracteres, palavra-chave no início, termina em `| IDA Produtora` quando couber.
- `description`: até 155 caracteres, resposta curta + o que a pessoa encontra.
- Open Graph e Twitter Card com `brand/og-image.png` (1200 × 630) como padrão; artigos podem ter imagem própria.
- `lang="pt-BR"` no `<html>`; `og:locale` `pt_BR`.

## Schema JSON-LD (geradores em `seo/schema.ts`)

| Onde | Tipos |
| --- | --- |
| Layout (todas) | `Organization` + `LocalBusiness` (`@id` `https://idaprodutora.com.br/#org`), `areaServed` São Paulo e região, `contactPoint` WhatsApp, `sameAs` Instagram, `founder` Person |
| Home | `WebSite` + `hasOfferCatalog` com todos os serviços |
| Serviço | `Service` (`provider` → `#org`), `FAQPage`, `BreadcrumbList`, `VideoObject` por vídeo, `HowTo` no "Como funciona" |
| Local | `Service` com `areaServed` da região ou `Place` do centro de eventos, `BreadcrumbList` |
| Pilar | `Article` + `FAQPage` + `BreadcrumbList`; `hasPart` listando os complementares publicados |
| Complementar | `BlogPosting` (`isPartOf` → pilar), `FAQPage`, `BreadcrumbList`; `HowTo` nos artigos tipo "Como fazer" |
| Portfólio | `ItemList` de `VideoObject` |

Sem endereço de rua nem CEP no schema: só cidade e região.

## Core Web Vitals

Metas: **LCP < 2,0 s · CLS < 0,05 · INP < 200 ms** no celular.

- Hero: poster AVIF como imagem LCP (`priority`), vídeo do showreel com `muted autoplay playsinline loop`, só no desktop.
- Vídeos de portfólio: componente `VideoFacade` (thumbnail do YouTube + player só no clique, domínio `youtube-nocookie.com`).
- Imagens: `next/image`, AVIF/WebP, `sizes` corretos, largura e altura fixas.
- Fontes: `next/font` com `display: swap` e subset latin.
- Scripts de terceiros (GA4, Meta Pixel) via `next/script` com `strategy="lazyOnload"`.
- Nenhum carrossel de JavaScript pesado; FAQ com `<details>/<summary>`.

## Headers de segurança (`next.config`)

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy`: liberar `self`, `wa.me`, `api.whatsapp.com`, `www.youtube-nocookie.com`, `i.ytimg.com`, Google Analytics.
- `X-Content-Type-Options: nosniff` · `Referrer-Policy: strict-origin-when-cross-origin` · `Permissions-Policy` restritiva.

## Deploy (Hostinger, app Node.js)

- Repositório GitHub → Hostinger. Antes do primeiro deploy, conferir no painel: branch, comando de build (`npm run build`), comando de início (`npm start`) e versão do Node.
- Redirect 301 de `www.idaprodutora.com.br` para `idaprodutora.com.br` desde o primeiro dia.
- Depois de cada deploy: rodar `npm run indexnow`.
