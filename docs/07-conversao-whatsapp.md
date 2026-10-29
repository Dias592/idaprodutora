# 07 — Conversão pelo WhatsApp

Todo CTA do site leva ao WhatsApp **(11) 95302-5177** (`https://wa.me/5511953025177`). Não há e-mail, CRM nem rota de API no lançamento. O site não armazena dados do visitante.

## Formulário de orçamento (`FormularioWhatsApp`)

Componente cliente único, usado na home, nas páginas de serviço, nas locais e em /orcamento.

| Campo | Tipo | Obrigatório |
| --- | --- | --- |
| Nome | texto | sim |
| Empresa | texto | não |
| Tipo de serviço | lista (abaixo) | sim |
| Data do evento ou gravação | data | não |
| Local / cidade | texto | não |
| Breve descrição | texto até 300 caracteres, com contador | sim |

**Lista de serviços:** Vídeo institucional · Filmagem de evento corporativo · Transmissão ao vivo · Aftermovie · Cobertura de show · Vídeo 360° · Imagens aéreas (drone) · Fotografia · Comunicação interna · Vídeo de treinamento · Depoimentos · Estúdio e chroma key · Podcast e videocast · Ativações para eventos · Edição de vídeo · Outro.

- Em cada página de serviço e local, o tipo vem pré-selecionado (prop `servico`).
- Botão "Enviar pelo WhatsApp" monta o texto no navegador e abre `https://wa.me/5511953025177?text=<encodeURIComponent(mensagem)>` em nova aba.
- Validação no navegador: nome, serviço e descrição obrigatórios; mensagem de erro ao lado do campo.
- Abaixo do botão: "Ao enviar, você abre uma conversa com a IDA no WhatsApp. Usamos seus dados só para responder ao orçamento." + link para a política de privacidade.

## Mensagem gerada

```
Olá, IDA Produtora! Gostaria de um orçamento.
Nome: {nome}
Empresa: {empresa}
Serviço: {servico}
Data: {data no formato dd/mm/aaaa}
Local: {local}
Sobre o projeto: {descricao}
(enviado pela página {título da página})
```

Linhas de campos vazios são omitidas.

## Outros CTAs

- **Botões "Solicitar orçamento"**: rolam até o formulário da própria página (`#orcamento`).
- **Botão flutuante**: abre o WhatsApp direto com `Olá, IDA Produtora! Vim pela página {título} e quero um orçamento.`
- **`<CtaWhatsApp servico="..." />` nos artigos**: bloco com título "Quer [serviço] para a sua empresa?", uma frase e botão que abre o WhatsApp com `Olá, IDA Produtora! Li o artigo "{título do artigo}" e quero um orçamento de {serviço}.`

## Medição sem vazar dados

- GA4 evento `generate_lead` com parâmetros `servico` e `origem` (home, serviço, local, blog). Nunca nome, empresa ou descrição.
- Desligar a medição automática de cliques de saída (Enhanced Measurement → Outbound clicks), senão o GA4 grava a URL do wa.me com o texto do cliente.
- Meta Pixel (se usado): evento `Contact` com os mesmos parâmetros.
