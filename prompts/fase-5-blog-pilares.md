# Fase 5 — Blog e os 10 pilares (onda 1)

```
1. Crie /blog (lista por pilar), /blog/categoria/<slug-do-pilar> (todos os artigos do cluster) e a rota /blog/<slug> para content/blog/*.mdx com status "publicado".
2. Escreva os 10 pilares (tipo "pilar" em data/blog-plan.json). Os arquivos já existem em content/blog/ com o frontmatter; preencha metaTitle (até 60 caracteres), metaDescription (até 155), publishedAt, updatedAt e status "publicado".
3. Cada pilar segue templates/pilar.mdx e docs/06-blog.md:
   - 2.000 a 2.500 palavras.
   - Resposta direta respondendo o campo "pergunta".
   - Um H2 por complementar, com resumo de 2–3 frases; sem link enquanto o complementar estiver planejado.
   - CtaWhatsApp no meio (~40%) e no fim, com servicoFormulario.
   - FAQ com 6 a 8 perguntas.
   - Link para a página de serviço e cards dos pilaresRelacionados.
4. Regras de escrita de docs/06 e docs/04. Nada inventado.
5. Schema Article + FAQPage + BreadcrumbList.
6. Atualize o llms.txt com os 10 pilares. Rode o build, regenere o sitemap e rode npm run indexnow. Commit "blog onda 1".
```
