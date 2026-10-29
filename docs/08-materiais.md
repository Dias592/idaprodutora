# 08 — Materiais (vídeos, logos, showreel)

Origem: pasta do Google Drive https://drive.google.com/drive/folders/1YtSQhp9DdIMaYQxrzo1j0k7pnFOchBYx — baixar para `./materiais/` na raiz do projeto (fora do build; adicionar `materiais/` ao `.gitignore`).

## Vídeos de portfólio

Todos na **horizontal, na proporção original, sem recorte** (`object-fit: contain`). Hospedados no YouTube da IDA (pode ser não listado); no site entram pelo `VideoFacade` com o ID do YouTube.

| Arquivo | Cliente · projeto | Onde entra |
| --- | --- | --- |
| Mahav - Vídeo institucional.mp4 | Mahav · Vídeo institucional | Portfólio da home; /video-institucional (hero) |
| Chandon.mov | Chandon · Vídeo institucional | Portfólio da home; /video-institucional |
| Convenção de Vendas Vert.mp4 | Vert · Convenção de vendas | Portfólio da home; /filmagem-de-eventos-corporativos; showreel |
| Feira Automec.mov | Automec · Feira de negócios | Portfólio da home; /filmagem-de-eventos-corporativos; showreel |
| Mam - Museu de arte moderna de São Paulo.mp4 | MAM São Paulo · [PREENCHER: tipo de projeto] | Portfólio da home; showreel |
| Caioba - Jogo das Estrelas.mov | Caioba Soccer Camp · Jogo das Estrelas | Portfólio da home; /video-memoria-aftermovie |
| Confraternização Barcellos Tucunduva e BT LAW Final.mp4 | Barcellos Tucunduva e BT LAW · Confraternização | /portfolio; artigo "vídeo de confraternização" |
| Caioba - Bio Ritmo.mov | Caioba · Bio Ritmo | /portfolio |

Arquivo de configuração: `data/videos.json` com `{ arquivo, cliente, projeto, servicos[], youtubeId: "[PREENCHER]", duracao: "[PREENCHER]", dataUpload: "[PREENCHER]" }`. O `VideoObject` usa esses campos.

## Showreel do topo da home

Três vídeos alternando a cada 15 segundos, sem som, em loop: **Feira Automec → Vert (Convenção de vendas) → MAM** → volta ao início.

- Um corte de 15 s de cada, sem áudio, horizontal, proporção original, 1280 px de largura, MP4 (H.264) + WebM, até 2 MB por arquivo → `public/video/reel-1-automec.{mp4,webm}`, `reel-2-vert…`, `reel-3-mam…`.
- Poster AVIF do primeiro frame de cada um → `public/video/reel-N.avif`. O poster do primeiro é a imagem LCP.
- Só o primeiro vídeo carrega com a página; o próximo começa a carregar quando o atual está tocando.
- Celular (< 768 px): só os posters alternando a cada 15 s, sem vídeo.
- Botão de pausa visível; `prefers-reduced-motion` → só o primeiro poster, parado.
- Indicador de 3 barras finas no rodapé do quadro (barra ativa em `accent`).

Comando para gerar cada corte (ajustar `-ss` para o melhor trecho):

```bash
ffmpeg -ss 00:00:10 -t 15 -i "materiais/VIDEOS IDA PRODUTORA/Feira Automec.mov" -an -vf "scale=1280:-2" -c:v libx264 -preset veryfast -crf 28 -movflags +faststart public/video/reel-1-automec.mp4
ffmpeg -ss 00:00:10 -t 15 -i "materiais/VIDEOS IDA PRODUTORA/Feira Automec.mov" -an -vf "scale=1280:-2" -c:v libvpx-vp9 -b:v 0 -crf 40 public/video/reel-1-automec.webm
ffmpeg -ss 00:00:10 -i "materiais/VIDEOS IDA PRODUTORA/Feira Automec.mov" -frames:v 1 -vf "scale=1280:-2" public/video/reel-1.avif
```

Se algum arquivo passar de 2 MB, subir o `-crf` de 2 em 2.

## Logos de clientes (faixa "Quem já confiou")

Pasta `materiais/clientes/`: Chandon, MAM, Bio Ritmo, Automec, Mahav, BR Auto Parts, Caioba Soccer Camp. O vídeo da Vert usa o logo da **BR Auto Parts** (não há logo separado da Vert).

Ordem na faixa (maior impacto primeiro): **Chandon, MAM, Bio Ritmo, Automec, BR Auto Parts, Mahav, Caioba Soccer Camp**.

Os arquivos são PNG quadrados de 435 × 441 px exportados do Canva. Tratamento antes de usar:

1. Recortar a área vazia em volta do logo (`trim`).
2. Versão **branca com fundo transparente** para o fundo escuro do site (se o PNG tiver fundo, remover; depois converter para branco).
3. Exportar em `public/clientes/<nome>.webp` com altura de 96 px (exibidos a 48 px), mais a versão SVG quando houver.
4. Todos visualmente com o mesmo peso: logos largos com altura menor, logos quadrados com altura maior (caixa de 140 × 56 px, `object-fit: contain`).
5. Opacidade 70% em repouso e 100% no hover.

**Autorização:** confirmar com cada cliente que pode aparecer como cliente e no portfólio antes de publicar (Chandon e MAM costumam exigir aprovação).

## Imagens de portfólio

Ainda não fornecidas. Enquanto isso, usar os thumbnails dos vídeos do YouTube nos cards e `[PREENCHER: imagem]` nas capas do blog. Nunca usar banco de imagens genérico como se fosse trabalho da IDA.
