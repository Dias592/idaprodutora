# Fase 0 — Setup do projeto

```
Leia CLAUDE.md e todos os arquivos de docs/ na ordem. Depois:

1. Crie um projeto Next.js (App Router, TypeScript, Tailwind, ESLint) nesta pasta, preservando CLAUDE.md, docs/, data/, templates/, seo/, prompts/, brand/, design/ e content/.
2. Configure para rodar como app Node.js na Hostinger: scripts "build" e "start", versão do Node no package.json (engines).
3. Copie brand/* para public/brand/ e configure app/icon e app/apple-icon a partir de brand/favicon.svg e brand/apple-touch-icon.png. Imagem Open Graph padrão: public/brand/og-image.png.
4. Configure MDX (next-mdx-remote ou @next/mdx) para ler content/servicos, content/locais e content/blog, com o frontmatter dos templates. Artigos com status "planejado" não geram página.
5. next.config: redirect 301 de www para sem www, headers de segurança de docs/03-seo-tecnico.md, imagens AVIF/WebP.
6. app/sitemap.ts e app/robots.ts gerados de data/ e content/ (copie as regras de seo/robots.txt).
7. Script scripts/indexnow.ts (npm run indexnow) que envia as URLs do sitemap alteradas desde o último envio. Chave em public/<chave>.txt.
8. Copie seo/schema.ts para lib/schema.ts.
9. Adicione materiais/ ao .gitignore.
10. Rode npm run build sem erros e faça o commit "setup".

Não crie páginas de conteúdo ainda.
```
