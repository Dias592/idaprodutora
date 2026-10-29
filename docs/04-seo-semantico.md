# 04 — SEO semântico e distribuição orgânica

## Arquitetura de autoridade

```
Home ──► 15 páginas de serviço ◄── 12 páginas locais
              ▲
              │ (CTA + link contextual)
         10 pilares do blog
              ▲
              │ (link com a palavra-chave do pilar)
       100 artigos complementares ◄──► irmãos do mesmo cluster
```

- A **página de serviço** disputa a busca de quem quer contratar ("vídeo institucional São Paulo").
- O **pilar** disputa a busca de quem está pesquisando o tema ("vídeo institucional: o que é, tipos e custos").
- O **complementar** disputa a pergunta específica ("quanto custa um vídeo institucional").
- Cada URL tem **uma** palavra-chave principal. Nunca duas páginas com a mesma (`data/keywords.csv` é a referência).

## Links internos obrigatórios

| Página | Linka para |
| --- | --- |
| Complementar | Pilar do cluster (âncora = palavra-chave do pilar) · 2 irmãos (campo `irmaos`) · página de serviço (campo `servico`) |
| Pilar | Todos os 10 complementares publicados (um H2 por complementar, com resumo de 2–3 frases e link) · página de serviço (CTA) · 2 pilares relacionados (campo `pilaresRelacionados`) |
| Serviço | Pilar do cluster + 3 complementares (bloco "Leia no blog") · 3 serviços relacionados |
| Local | Serviço principal da região/local · 2 serviços secundários |
| Home | Todos os serviços principais · os 10 pilares (rodapé ou seção "Guias") |

Regras de âncora: texto descritivo com a palavra-chave da página de destino ou variação natural. Nunca "clique aqui". No máximo um link para a mesma URL por seção.

**Complementar ainda não publicado:** o pilar mostra o H2 e o resumo, sem link. Quando o complementar for publicado, atualizar o pilar no mesmo commit.

## Estrutura de headings

- H1 único = palavra-chave principal (ou título do artigo que a contém).
- H2 = subintenções reais da busca: o que é, para que serve, quanto custa, como funciona, tipos, erros comuns, perguntas frequentes.
- H3 só dentro de um H2. Sem pular níveis.

## Entidades e vocabulário

Citar pelo nome, quando fizer sentido no texto:

- **Plataformas:** YouTube, Zoom, Microsoft Teams, Instagram (Reels), LinkedIn, TikTok.
- **Locais em SP:** São Paulo Expo, Expo Center Norte, Distrito Anhembi, Transamerica Expo Center, WTC Events Center, Centro de Convenções Frei Caneca, Av. Paulista, Berrini, Alphaville.
- **Órgãos e normas (drone):** ANAC, SISANT, DECEA, SARPAS, Anatel, ICA 100-40/2026.
- **Técnica:** 4K, Full HD, 16:9, 9:16, multicâmera, chroma key, teleprompter, lapela, mesa de som, encoder, link dedicado, color grading, trilha licenciada.
- **Leis:** LGPD (uso de imagem e dados), direito autoral (trilha sonora).

## AEO / GEO (respostas para buscadores com IA)

- **Resposta direta** de 40 a 60 palavras logo após o H1 em toda página e artigo, respondendo a pergunta da palavra-chave sem rodeio.
- Artigos "Preço" e "Comparação": tabela com as faixas ou critérios logo após a resposta direta.
- Artigos "Como fazer" e "Checklist": lista numerada.
- FAQ com perguntas reais (tirar de "As pessoas também perguntam" do Google na hora de escrever).
- Autor visível em todo artigo: **Ivan Dias, IDA Produtora**, com link para /sobre; data de publicação e de atualização.

## Para ganhar cliques, não só posição

- Title com palavra-chave no início + número ou ano + benefício. Ex.: "Quanto custa um vídeo institucional em 2026? Valores e o que inclui".
- Meta description = resposta curta + promessa do que tem no texto.
- Revisão aos 90 dias no Search Console: páginas entre as posições 4 e 15 com CTR abaixo de 2% → reescrever title e description.
