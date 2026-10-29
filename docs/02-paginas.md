# 02 — Páginas do site

Dados de cada página (H1, title, meta description, palavras-chave, FAQ, links obrigatórios) estão em `data/servicos.json` e `data/locais.json`. Este arquivo define a estrutura.

## Mapa do site

```
/                                   Home
/<servico>                          15 páginas de serviço (data/servicos.json, que também traz a home)
/<local>                            12 páginas locais (data/locais.json)
/blog                               Índice do blog
/blog/categoria/<pilar>             10 categorias (uma por pilar)
/blog/<slug>                        110 artigos (data/blog-plan.json)
/sobre  /portfolio  /clientes  /orcamento  /contato
/politica-de-privacidade  /termos
```

Menu principal: **Serviços** (mega menu em 3 grupos: Vídeo · Eventos · Estúdio e Foto) · Portfólio · Blog · Sobre · botão "Orçamento pelo WhatsApp".

| Grupo do menu | Páginas |
| --- | --- |
| Vídeo | Vídeo institucional, Comunicação interna, Vídeo de treinamento, Depoimentos, Edição de vídeo |
| Eventos | Filmagem de eventos, Aftermovie, Transmissão ao vivo, Cobertura de shows, Ativações |
| Estúdio e Foto | Fotografia corporativa, Imagens aéreas, Vídeo 360°, Estúdio e chroma key, Podcast e videocast |

## Home

Ordem das seções (referência visual em `design/home-referencia.html`):

1. Header fixo: logo compacto, menu, botão WhatsApp.
2. Hero: eyebrow "PRODUTORA AUDIOVISUAL · SÃO PAULO", H1 **Produtora audiovisual corporativa em São Paulo**, barra laranja, subtítulo, CTA "Solicitar orçamento" + "Ver showreel", slogan. À direita, o showreel (ver `docs/08-materiais.md`).
3. Bloco de resposta direta (AEO) "O QUE A IDA FAZ" — 40 a 60 palavras.
4. Serviços: grade com 9 cards principais + linha "Também fazemos".
5. Por que a IDA: 4 diferenciais.
6. Portfólio: 6 vídeos (fachada YouTube) + link para /portfolio.
7. Como funciona: 4 etapas.
8. Quem já confiou: faixa de logos de clientes.
9. FAQ: 4 a 6 perguntas (FAQPage).
10. Orçamento: formulário WhatsApp (`docs/07-conversao-whatsapp.md`).
11. Rodapé: logo, slogan, links dos grupos de serviço, contato, links legais.
12. Botão flutuante de WhatsApp.

## Páginas de serviço — modelo de 10 blocos

Mínimo 1.200 palavras úteis. Vídeo real embutido.

1. **Hero** — breadcrumb, H1 com a palavra-chave principal, subtítulo com benefício, CTA, vídeo de portfólio do serviço.
2. **Resposta direta** — 40 a 60 palavras respondendo "o que é / para que serve".
3. **Para que serve** — H2 com 4 a 6 usos.
4. **O que está incluso** — H2 com entregáveis concretos.
5. **Como funciona** — H2 com etapas numeradas.
6. **Portfólio do serviço** — H2 com 2 a 4 vídeos (VideoObject).
7. **Pacotes** — 3 níveis com "a partir de R$ [PREENCHER]" ou "sob consulta".
8. **Serviços que combinam** — 3 links internos (campo `relacionados`).
9. **FAQ** — 5 a 8 perguntas (campo `faq`) com FAQPage.
10. **Orçamento** — formulário WhatsApp com o serviço pré-selecionado + bloco "Leia no blog" com o pilar do cluster e 3 complementares.

## Páginas locais

12 páginas (6 regiões + 6 centros de eventos), em `data/locais.json`. Cada uma com conteúdo próprio: como chegar, perfil de eventos do local, o que muda na captação (luz, acústica, internet, regras do espaço), serviços mais pedidos ali e link para o serviço principal. **Proibido texto duplicado entre páginas locais**: gerar relatório de similaridade e reescrever tudo acima de 30%.

## Páginas institucionais

| URL | Conteúdo | Schema |
| --- | --- | --- |
| /sobre | História da IDA, equipe, equipamentos, parceiros — só audiovisual | AboutPage + Person (Ivan Dias) |
| /portfolio | Todos os vídeos, filtro por serviço | CollectionPage + ItemList de VideoObject |
| /clientes | Logos e cases (com autorização) | CollectionPage |
| /orcamento | Formulário WhatsApp com todos os serviços | ContactPage |
| /contato | WhatsApp, Instagram, área atendida | ContactPage |
| /politica-de-privacidade | LGPD: o formulário não armazena dados, abre o WhatsApp | WebPage |
| /termos | Termos de uso | WebPage |
