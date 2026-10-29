# 06 — Blog: 10 pilares + 100 complementares

Plano completo em `data/blog-plan.json` (110 artigos). Cada item traz: `id`, `tipo` (pilar ou complementar), `titulo`, `slug`, `palavraChave`, `palavrasSecundarias`, `intencao`, `formato`, `pilar`, `servico`, `irmaos`, `pilaresRelacionados`, `palavras` (faixa), `onda`.

## Pilares (10)

- **Tamanho:** 2.000 a 2.500 palavras.
- **Estrutura:**
  1. H1 = `titulo`.
  2. Resposta direta (40–60 palavras).
  3. Índice clicável com âncoras.
  4. Um H2 por complementar do cluster: resumo de 2–3 frases + link "Leia o guia completo: <título do complementar>" (sem link se ainda não publicado).
  5. **CTA WhatsApp no meio** (após ~40% do texto) e **no fim** — componente `<CtaWhatsApp servico="<serviço do cluster>" />`.
  6. FAQ com 6 a 8 perguntas (FAQPage).
  7. Bloco final "Precisa disso na sua empresa?" com link para a página de serviço.
- Pelo menos um vídeo de portfólio do serviço (VideoFacade + VideoObject) quando houver.

## Complementares (100)

- **Tamanho:** 600 a 800 palavras. Direto ao ponto: responder a pergunta da palavra-chave, sem encher.
- **Estrutura:**
  1. H1 = `titulo`.
  2. Resposta direta (40–60 palavras).
  3. Corpo no formato do campo `formato`:
     - **Preço** → tabela de faixas/fatores + o que muda o valor. Valores reais só se fornecidos; senão "[PREENCHER: faixa]" e fatores qualitativos.
     - **Como fazer** → passos numerados (HowTo).
     - **Checklist** → lista de verificação.
     - **Comparação** → tabela lado a lado + recomendação por caso.
     - **Conceito** → definição, quando usar, exemplo.
     - **Modelo** → modelo pronto para copiar (bloco de texto).
     - **Uso** → situações de uso com exemplos.
     - **Local** → particularidades do local e da captação.
  4. Link para o pilar no primeiro terço do texto (âncora = palavra-chave do pilar).
  5. Links para os 2 `irmaos` e para o `servico`.
  6. **CTA WhatsApp no fim** — `<CtaWhatsApp servico="..." />`.
  7. FAQ com 3 a 4 perguntas (FAQPage).

## Regras de escrita (todos os artigos)

- Português do Brasil, frases curtas, voz ativa, tom profissional e próximo. Sem "neste artigo vamos", sem "no mundo de hoje".
- Palavra-chave no H1, na resposta direta, em um H2 e na meta description. Densidade natural — nunca repetir à força.
- Palavras secundárias distribuídas nos H2 e no corpo.
- Nada inventado: sem estatísticas sem fonte, sem clientes fictícios. Fonte externa = link para página oficial (Google, YouTube, ANAC, DECEA, Sebrae, gov.br).
- 2 links externos de autoridade por artigo, quando houver fonte oficial pertinente.
- Imagem de capa: placeholder `[PREENCHER: imagem]` até haver foto real de trabalho da IDA. Alt text descritivo.
- Frontmatter conforme `templates/`.

## Ondas de publicação

| Onda | Quando | O que | Artigos |
| --- | --- | --- | --- |
| 1 | Lançamento | Os 10 pilares | 10 |
| 2 | Mês 1 | Complementares de Preço e de Comparação | 20 |
| 3 | Mês 2 | Demais complementares dos pilares 1, 2 e 3 | 22 |
| 4 | Mês 3 | Demais complementares dos pilares 8 e 10 | 16 |
| 5 | Mês 4 | Demais complementares dos pilares 4, 5 e 6 | 26 |
| 6 | Mês 5 | Demais complementares dos pilares 7 e 9 | 16 |

O campo `onda` de cada artigo segue esta tabela. Ao publicar um lote: atualizar os pilares afetados (ativar os links), regenerar o sitemap e rodar o IndexNow.
