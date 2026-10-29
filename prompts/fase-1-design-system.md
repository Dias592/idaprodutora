# Fase 1 — Design system e componentes

```
Com base em docs/05-design-system.md e nas referências design/home-referencia.html e design/servico-referencia.html (abra e estude o layout):

1. Tokens no tailwind.config (cores, fonte Montserrat via next/font, raio 2px). Nenhuma cor em hex dentro de componentes.
2. Crie todos os componentes listados em docs/05 (Header com mega menu acessível por teclado, Hero, ShowreelRotativo, RespostaDireta, CardServico, VideoFacade, GradePortfolio, Etapas, FaixaClientes, TabelaPacotes, Faq com details/summary, FormularioWhatsApp, CtaWhatsApp, BotaoWhatsAppFlutuante, Breadcrumb, IndiceArtigo, CardArtigo, LeiaTambem, Footer).
3. FormularioWhatsApp e CtaWhatsApp exatamente como docs/07-conversao-whatsapp.md (mensagem montada no navegador, campos vazios omitidos, evento GA4 generate_lead só com servico e origem).
4. ShowreelRotativo exatamente como docs/08-materiais.md (3 vídeos, 15 s cada, sem som, proporção original, só posters no celular, botão de pausa, prefers-reduced-motion). Enquanto os cortes não existirem, use os posters como placeholder.
5. VideoFacade: thumbnail do YouTube + player youtube-nocookie só no clique, proporção original (object-fit: contain), VideoObject via lib/schema.ts.
6. Página /styleguide (noindex) mostrando todos os componentes.
7. Build sem erros, Lighthouse da /styleguide sem problemas de acessibilidade. Commit "design system".
```
