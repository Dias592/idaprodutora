# 05 — Design system

Referência visual aprovada: `design/home-referencia.html` e `design/servico-referencia.html` (abra no navegador; são maquetes, não código de produção). Siga layout, espaçamentos e hierarquia; reescreva em componentes React/Tailwind.

## Tokens (`tailwind.config.ts`)

| Token | Valor | Uso |
| --- | --- | --- |
| `bg` | `#0B0B0B` | Fundo principal (tema escuro) |
| `surface` | `#2A2A2A` | Cards, header, seções alternadas |
| `text` | `#FFFFFF` | Texto principal |
| `muted` | `#D9D9D9` | Texto secundário, legendas |
| `accent` | `#FF4D1A` | CTAs, play do logo, barra sob títulos, ícones de destaque |
| `accent-contrast` | `#FFFFFF` | Texto **dentro** de botão laranja. Branco no laranja dá 3,3:1: só passa como texto grande, então botões laranja usam **19 px em negrito** e hover escurece (`brightness-90`), nunca clareia |
| `bg-light` | `#D9D9D9` | Seções claras, se usadas |
| `text-on-light` | `#0B0B0B` / secundário `#2A2A2A` | Texto em seção clara |

Contrastes verificados: branco no fundo 19,7:1 · cinza claro no fundo 13,9:1 · laranja no fundo 5,9:1 · laranja na superfície 4,3:1 (só texto grande, ícone ou borda).

## Tipografia

- **Montserrat** (400, 500, 600, 700) via `next/font`.
- Títulos: 700. H1 desktop 52–56 px, mobile 34–38 px. H2 36–40 px desktop.
- Eyebrow (rótulo acima do título): 12 px, 400, caixa alta, `letter-spacing: 0.3em`, cor `muted`.
- Corpo: 17–18 px, entrelinha 1,6. Artigos do blog: 18 px, largura máxima de 68 caracteres por linha.

## Assinatura visual

- Barra laranja de 48 × 3 px sob os títulos de seção.
- Raio de borda 2 px (marca reta e angular).
- Ícones em traço fino branco (Lucide, `strokeWidth` 1.5). Nunca emoji.
- Fotos e vídeos escuros e contrastados; laranja só em detalhes, nunca em blocos grandes.
- Um único CTA laranja de destaque por tela.

## Componentes

`Header` (mega menu acessível por teclado) · `Hero` com `ShowreelRotativo` · `RespostaDireta` · `CardServico` · `Diferenciais` · `VideoFacade` · `GradePortfolio` · `Etapas` · `FaixaClientes` · `TabelaPacotes` · `Faq` (`details/summary`) · `FormularioWhatsApp` · `CtaWhatsApp` (bloco dentro de artigos) · `BotaoWhatsAppFlutuante` · `Breadcrumb` · `IndiceArtigo` · `CardArtigo` · `Footer`.

Acessibilidade: alvos de toque ≥ 44 px, foco visível laranja (`outline: 2px solid accent`), `aria-label` em botões só com ícone, `<label>` em todo campo.

## Arquivos de marca (`brand/`)

| Arquivo | Uso |
| --- | --- |
| `ida-logo-compacto-branco.svg` | Header |
| `ida-logo-principal-branco.svg` | Rodapé, /sobre |
| `ida-logo-principal-preto.svg`, `ida-logo-compacto-preto.svg` | Fundo claro |
| `ida-logo-mono-*.svg` | Uma cor só (impressão, carimbo) |
| `ida-icone-*.svg` | Avatar, marca d'água |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | Ícones do site (`app/icon`, manifest) |
| `og-image.png` | Imagem padrão de compartilhamento |
