# IDA Produtora Audiovisual — idaprodutora.com.br

Site novo de produtora audiovisual corporativa em São Paulo. Objetivo: top 3 orgânico no Google e no Bing para os serviços da IDA, convertendo pelo WhatsApp.

Leia antes de qualquer tarefa: este arquivo, depois `docs/` na ordem numérica. Os dados de páginas e artigos estão em `data/` — use-os como fonte única, nunca reescreva títulos, slugs ou palavras-chave de cabeça.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS, rodando como **app Node.js na Hostinger**, deploy via GitHub.
- Todas as páginas pré-renderizadas (SSG com `generateStaticParams`). Sem rota de API no lançamento.
- Conteúdo em MDX: `content/servicos/`, `content/locais/`, `content/blog/`.
- Fonte Montserrat via `next/font` (auto-hospedada). Nenhuma chamada externa de fonte.
- Domínio canônico: `https://idaprodutora.com.br` (sem www). Redirect 301 de www.

## Regras que nunca quebram

1. **Foco só em audiovisual corporativo.** Nunca citar, linkar ou usar como prova outros sites ou negócios (casamentos, formaturas, retrato pessoal). Portfólio, números e depoimentos vêm só de trabalhos de audiovisual.
2. **Nunca afirmar estrutura que não existe.** Sem "nosso estúdio de X m²". Estúdio = "estúdio parceiro em São Paulo". Live multicâmera e ativações = operação com parceiros.
3. **Nunca inventar** números, prazos, preços, clientes ou depoimentos. Dado que falta vira `[PREENCHER: ...]`.
4. **Um H1 por página**, com a palavra-chave principal da página (ver `data/`).
5. **Schema JSON-LD obrigatório** em toda página (geradores em `seo/schema.ts`).
6. **Cores e fontes só por tokens** (`docs/05-design-system.md`). Nunca hex direto em componente.
7. **Todo CTA leva ao WhatsApp** (11) 95302-5177 → `https://wa.me/5511953025177`. O formulário monta a mensagem no navegador; o site não guarda dados.
8. **Vídeos:** todos na horizontal, na proporção original, sem recorte (`object-fit: contain`). Vídeos de portfólio entram por YouTube com fachada leve (thumbnail + player só no clique). Só o showreel do topo da home fica em `/public/video`.
9. **Performance:** Lighthouse mobile ≥ 90 em performance e 100 em SEO nas páginas principais. Sem iframe carregado direto. Imagens via `next/image` (AVIF/WebP, dimensões fixas).
10. **Português do Brasil** em todo o conteúdo. Frases curtas, voz ativa, sem jargão vazio ("soluções inovadoras", "excelência").

## Mapa da documentação

| Arquivo | Conteúdo |
| --- | --- |
| `docs/01-estrategia-e-servicos.md` | Posicionamento, público, serviços e ressalvas |
| `docs/02-paginas.md` | Todas as páginas: serviços, locais, institucionais, modelo de 10 blocos |
| `docs/03-seo-tecnico.md` | Stack, indexação, Core Web Vitals, headers, IndexNow |
| `docs/04-seo-semantico.md` | Headings, entidades, AEO, links internos, regras anti-canibalização |
| `docs/05-design-system.md` | Tokens, componentes, referência visual |
| `docs/06-blog.md` | 10 pilares + 100 complementares: regras de escrita e links |
| `docs/07-conversao-whatsapp.md` | Formulário, mensagem gerada, medição |
| `docs/08-materiais.md` | Vídeos, logos de clientes, showreel |
| `data/servicos.json` | Dados de cada página de serviço |
| `data/locais.json` | Dados das páginas locais |
| `data/blog-plan.json` | Os 110 artigos: título, slug, palavra-chave, tipo, links |
| `data/keywords.csv` | Mapa completo de palavras-chave por URL |
| `templates/` | Estrutura MDX de pilar e de complementar |
| `seo/` | schema.ts, robots.txt, llms.txt |
| `prompts/` | Prompts de cada fase, na ordem |
| `brand/` | Logos IDA, favicon, imagem de compartilhamento |
| `design/` | Referência visual da home e da página de serviço |

## Contato oficial

- WhatsApp: (11) 95302-5177 — `+55-11-95302-5177`
- Instagram: @idaprodutora
- Área atendida: São Paulo e região (sem endereço de rua no site nem no schema).
