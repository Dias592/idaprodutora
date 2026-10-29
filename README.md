# Pacote do site idaprodutora.com.br para o Claude Code

Tudo o que o Claude Code precisa para construir o site da IDA Produtora Audiovisual: regras do projeto, especificações, dados de todas as páginas e dos 110 artigos do blog, SEO técnico e semântico, prompts por fase e os arquivos da marca.

## Como usar (passo a passo)

1. **Crie uma pasta vazia** para o projeto (ex.: `idaprodutora`) e copie para dentro dela todo o conteúdo deste pacote.
2. **Baixe a pasta do Drive** (vídeos, logos de clientes) para `idaprodutora/materiais/`:
   https://drive.google.com/drive/folders/1YtSQhp9DdIMaYQxrzo1j0k7pnFOchBYx
3. **Crie o repositório no GitHub** e conecte na Hostinger como app Node.js (branch `main`, build `npm run build`, start `npm start`).
4. **Abra o Claude Code nessa pasta.** Ele lê o `CLAUDE.md` automaticamente.
5. **Rode as fases na ordem**, uma por sessão, colando o prompt de cada arquivo de `prompts/`:

| Fase | Arquivo | Resultado |
| --- | --- | --- |
| 0 | `prompts/fase-0-setup.md` | Projeto Next.js configurado, sitemap, robots, IndexNow, marca |
| 1 | `prompts/fase-1-design-system.md` | Tokens, componentes, formulário WhatsApp, showreel |
| 2 | `prompts/fase-2-home-e-servicos-p1.md` | Home + 5 serviços prioritários |
| 3 | `prompts/fase-3-servicos-e-institucionais.md` | Demais serviços + institucionais |
| 4 | `prompts/fase-4-locais.md` | 12 páginas locais |
| 5 | `prompts/fase-5-blog-pilares.md` | Blog + 10 pilares (lançamento) |
| 6 | `prompts/fase-6-complementares.md` | 100 complementares, uma onda por mês |
| 7 | `prompts/fase-7-auditoria.md` | Auditoria antes de publicar e a cada onda |

## O que tem no pacote

```
CLAUDE.md                 Regras do projeto (o Claude Code lê sempre)
docs/                     01 estratégia · 02 páginas · 03 SEO técnico · 04 SEO semântico
                          05 design · 06 blog · 06b lista dos 110 artigos · 07 WhatsApp · 08 materiais
data/servicos.json        Home + 15 páginas de serviço (H1, title, description, palavra-chave, FAQ, links)
data/locais.json          12 páginas locais
data/blog-plan.json       110 artigos: título, slug, palavra-chave, secundárias, formato, links, onda
data/keywords.csv         Mapa de palavras-chave de todas as 138 URLs (home, serviços, locais e artigos) (abre no Excel/Sheets)
data/videos.json          8 vídeos de portfólio e onde cada um entra
data/clientes.json        7 logos de clientes, na ordem da faixa
content/blog/*.mdx        110 arquivos com o frontmatter pronto (status "planejado")
templates/                Estrutura de pilar e de complementar
seo/                      schema.ts (JSON-LD), robots.txt, llms.txt
prompts/                  Prompts das fases 0 a 7
brand/                    Logos IDA (SVG), favicon, ícones, imagem de compartilhamento
design/                   Referência visual da home e da página de serviço (abra no navegador)
```

## Pendências do seu lado

Marcadas no código como `[PREENCHER: ...]`. As principais:

- **Vídeos no YouTube** da IDA (pode ser não listado) e os IDs em `data/videos.json`.
- **Cortes do showreel** (3 trechos de 15 s): o comando ffmpeg está em `docs/08-materiais.md`.
- **Logos de clientes** em versão branca com fundo transparente.
- **Autorização** de cada cliente para aparecer no site.
- **Tipo de projeto** do vídeo do MAM e do Caioba · Bio Ritmo.
- **Preços "a partir de"** e prazos de entrega de cada serviço.
- **Fotos de portfólio** (quando tiver).
