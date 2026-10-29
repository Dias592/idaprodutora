# Fase 2 — Home e serviços prioritários

```
Crie a home (docs/02-paginas.md, seção Home) e as páginas de serviço com prioridade P1 em data/servicos.json:
/video-institucional, /filmagem-de-eventos-corporativos, /transmissao-ao-vivo, /video-memoria-aftermovie, /fotografia-corporativa.

Para cada página:
- H1, title, description, palavra-chave, secundárias, FAQ e relacionados vêm de data/servicos.json. Não altere esses textos.
- Siga o modelo de 10 blocos de docs/02-paginas.md. Mínimo 1.200 palavras úteis, escritas do zero em pt-BR, seguindo docs/04-seo-semantico.md (resposta direta de 40–60 palavras, H2 por subintenção, entidades citadas pelo nome).
- Ressalvas de docs/01 respeitadas (nada de estrutura que não existe).
- Vídeos de data/videos.json no hero e no portfólio do serviço (youtubeId pode estar [PREENCHER]; o componente mostra placeholder).
- Bloco "Leia no blog" com os links de leiaNoBlog (sem link enquanto o artigo estiver planejado).
- Schema: Service, FAQPage, BreadcrumbList, VideoObject, HowTo no "Como funciona".
- Formulário WhatsApp com servicoFormulario pré-selecionado.
- Preços e prazos que não estão nos docs: [PREENCHER: ...]. Nunca invente.

Home: hero com ShowreelRotativo, faixa de clientes com data/clientes.json (logos tratados conforme docs/08; se ainda não houver arquivo tratado, mostre o nome em texto), portfólio com os vídeos "home": true de data/videos.json.

Rode o build, confira o JSON-LD de cada página e faça o commit "home e serviços P1".
```
