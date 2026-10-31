# PendÃªncias do site (o que depende da IDA)

Lista do que nÃ£o pode ser inventado e precisa de informaÃ§Ã£o ou decisÃ£o da IDA. Atualizada em 29/10/2026.

## Bloqueia ou afeta o site no ar

- [ ] **www.idaprodutora.com.br responde 503.** O suporte da Hostinger precisa vincular o `www` ao mesmo app Node.js (alias). NÃ£o criar redirecionamento no domÃ­nio principal (causa loop).
- [ ] **AutorizaÃ§Ã£o dos clientes** para aparecer na faixa de logos, em /clientes e no portfÃ³lio (Chandon e MAM costumam exigir aprovaÃ§Ã£o). Enquanto nÃ£o houver, avaliar retirar o logo. Arquivo: `data/clientes.json` (campo `autorizado`).
- [ ] **Assinatura â€œRD Â· Rafael Douglasâ€** no fim de vÃ¡rios vÃ­deos (MAM, Automec, Vert). Regra 1 do CLAUDE.md: nÃ£o citar outros negÃ³cios. Decidir se fica ou se sobem versÃµes sem a tela final no YouTube.

## ConteÃºdo comercial

- [ ] **PreÃ§os â€œa partir deâ€** de cada pacote. Hoje todos aparecem como â€œSob consultaâ€ (`content/servicos/*.mdx`, campo `pacotes`).
- [ ] **Validar os pacotes** propostos em cada serviÃ§o (nomes e descriÃ§Ãµes foram escritos a partir da maquete e dos docs).
- [ ] **Prazos de entrega** por serviÃ§o. Hoje o texto diz que o prazo Ã© combinado no orÃ§amento.
- [ ] **HistÃ³ria da IDA para /sobre**: ano de inÃ­cio, trajetÃ³ria do Ivan Dias, equipe, equipamentos, parceiros (sÃ³ audiovisual).
- [ ] **CNPJ / razÃ£o social**, se quiser exibir no rodapÃ© e na polÃ­tica de privacidade.

## MÃ­dia

- [ ] **VÃ­deos para serviÃ§os sem portfÃ³lio**: cobertura de shows, drone, 360Â°, treinamento, depoimentos, estÃºdio, podcast e ativaÃ§Ãµes (hoje sem vÃ­deo no topo da pÃ¡gina). TransmissÃ£o ao vivo e fotografia usam vÃ­deos de eventos.
- [ ] **Fotos de portfÃ³lio** (fotografia corporativa e de eventos) e capas para o blog.
- [ ] **Logos de clientes em SVG**, se existirem (hoje sÃ£o WebP gerados dos PNG).

## MediÃ§Ã£o e indexaÃ§Ã£o

- [ ] **ID do GA4** (`NEXT_PUBLIC_GA_ID` nas variÃ¡veis de ambiente da Hostinger). No GA4, desligar Enhanced Measurement â†’ Outbound clicks (docs/07).
- [ ] **Google Search Console e Bing Webmaster Tools**: verificar o domÃ­nio e enviar `https://idaprodutora.com.br/sitemap.xml`.
- [ ] Depois de cada deploy: `npm run indexnow`.

## Fotos de portfÃ³lio (adicionadas em 2026-10-30)

- 76 fotos de uma convenÃ§Ã£o de vendas (`materiais/Portifolio imagens`, catÃ¡logo em `data/fotos.json`): 16 na galeria da home e 76 como capas de artigos.
- As fotos mostram marcas no telÃ£o e pessoas identificÃ¡veis, incluindo um palestrante convidado. Confirmar a autorizaÃ§Ã£o do cliente para uso no portfÃ³lio. O site nÃ£o cita o nome do cliente em textos, alt ou legendas; para citar, Ã© preciso confirmar a autorizaÃ§Ã£o e adicionÃ¡-lo em `data/clientes.json`.
- 34 complementares estÃ£o sem capa (76 fotos para 110 artigos). Para completar, acrescentar fotos novas Ã  pasta e rodar `node scripts/distribuir-midia.mjs fotos "materiais/Portifolio imagens"`: o script usa sÃ³ fotos ainda nÃ£o usadas e nÃ£o repete.## Fotos de portfólio (atualizado em 2026-10-30)

- 130 fotos em `materiais/Portifolio imagens` (catálogo em `data/fotos.json`, com alt e evento): 76 da convenção de vendas, 30 do evento de kart da Chandon e 24 do evento no MAM São Paulo. 29 marcadas para a home (pasta HOME).
- Home: galeria com as 29 fotos da HOME (16 visíveis + "Ver mais"). /portfolio: as 130, com filtro por evento e visualizador.
- Capas: os 110 artigos com foto única, sem repetição. Sobram 20 fotos usadas só no portfólio.
- Fotos novas: colocar na pasta, acrescentar ao `data/fotos.json` (alt e evento), rodar `node scripts/fotos-portfolio.mjs`.
- **Autorização:** as fotos mostram marcas (BR AutoParts, Disauto, Chandon, MAM) e pessoas identificáveis, incluindo pilotos e palestrante conhecidos. Confirmar a autorização de uso no portfólio. O nome da empresa da convenção não é citado no site.
