# Pendências do site (o que depende da IDA)

Lista do que não pode ser inventado e precisa de informação ou decisão da IDA. Atualizada em 29/10/2026.

## Bloqueia ou afeta o site no ar

- [ ] **www.idaprodutora.com.br responde 503.** O suporte da Hostinger precisa vincular o `www` ao mesmo app Node.js (alias). Não criar redirecionamento no domínio principal (causa loop).
- [ ] **Autorização dos clientes** para aparecer na faixa de logos, em /clientes e no portfólio (Chandon e MAM costumam exigir aprovação). Enquanto não houver, avaliar retirar o logo. Arquivo: `data/clientes.json` (campo `autorizado`).
- [ ] **Assinatura “RD · Rafael Douglas”** no fim de vários vídeos (MAM, Automec, Vert). Regra 1 do CLAUDE.md: não citar outros negócios. Decidir se fica ou se sobem versões sem a tela final no YouTube.

## Conteúdo comercial

- [ ] **Preços “a partir de”** de cada pacote. Hoje todos aparecem como “Sob consulta” (`content/servicos/*.mdx`, campo `pacotes`).
- [ ] **Validar os pacotes** propostos em cada serviço (nomes e descrições foram escritos a partir da maquete e dos docs).
- [ ] **Prazos de entrega** por serviço. Hoje o texto diz que o prazo é combinado no orçamento.
- [ ] **História da IDA para /sobre**: ano de início, trajetória do Ivan Dias, equipe, equipamentos, parceiros (só audiovisual).
- [ ] **CNPJ / razão social**, se quiser exibir no rodapé e na política de privacidade.

## Mídia

- [ ] **Vídeos para serviços sem portfólio**: cobertura de shows, drone, 360°, treinamento, depoimentos, estúdio, podcast e ativações (hoje sem vídeo no topo da página). Transmissão ao vivo e fotografia usam vídeos de eventos.
- [ ] **Fotos de portfólio** (fotografia corporativa e de eventos) e capas para o blog.
- [ ] **Logos de clientes em SVG**, se existirem (hoje são WebP gerados dos PNG).

## Medição e indexação

- [ ] **ID do GA4** (`NEXT_PUBLIC_GA_ID` nas variáveis de ambiente da Hostinger). No GA4, desligar Enhanced Measurement → Outbound clicks (docs/07).
- [ ] **Google Search Console e Bing Webmaster Tools**: verificar o domínio e enviar `https://idaprodutora.com.br/sitemap.xml`.
- [ ] Depois de cada deploy: `npm run indexnow`.
