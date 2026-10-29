# Fase 6 — Artigos complementares (ondas 2 a 6)

Rode este prompt uma vez por onda, trocando o número. Cronograma em docs/06-blog.md (onda 2 no mês 1 … onda 6 no mês 5).

```
Escreva os artigos complementares da onda <N> de data/blog-plan.json, em lotes de 5 (um commit por lote).

Para cada artigo:
- Arquivo já existe em content/blog/<slug>.mdx com o frontmatter. Preencha metaTitle (até 60 caracteres), metaDescription (até 155), publishedAt, updatedAt e status "publicado".
- Siga templates/complementar.mdx e docs/06-blog.md: 600 a 800 palavras, resposta direta respondendo o campo "pergunta", corpo no formato do campo "formato".
- Link para o pilar no primeiro terço (âncora = palavra-chave do pilar), links para os 2 irmaos e para o servico.
- CtaWhatsApp no fim com servicoFormulario. FAQ com 3 a 4 perguntas.
- Schema BlogPosting (isPartOf → pilar) + FAQPage + BreadcrumbList; HowTo quando o formato for "Como fazer".
- Nada inventado: preço real só se estiver nos docs; senão [PREENCHER] e fatores que mudam o valor.

Depois de cada lote:
- Ative no pilar correspondente o link para os artigos publicados e atualize o updatedAt do pilar.
- Ative nos serviços os links de "Leia no blog" que passaram a existir.
- Build, sitemap, npm run indexnow, commit "blog onda <N> lote <X>".
```
