// Conversão pelo WhatsApp (docs/07-conversao-whatsapp.md). O site não guarda dados:
// a mensagem é montada no navegador e enviada para o wa.me.

export const WHATSAPP_NUMERO = "5511953025177";
export const WHATSAPP_EXIBICAO = "(11) 95302-5177";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}`;

export const linkWhatsApp = (texto: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(texto)}`;

/** Lista do campo "Tipo de serviço", na ordem de docs/07. */
export const SERVICOS_FORMULARIO = [
  "Vídeo institucional",
  "Filmagem de evento corporativo",
  "Transmissão ao vivo",
  "Aftermovie",
  "Cobertura de show",
  "Vídeo 360°",
  "Imagens aéreas (drone)",
  "Fotografia",
  "Comunicação interna",
  "Vídeo de treinamento",
  "Depoimentos",
  "Estúdio e chroma key",
  "Podcast e videocast",
  "Ativações para eventos",
  "Edição de vídeo",
  "Outro",
] as const;

export type ServicoFormulario = (typeof SERVICOS_FORMULARIO)[number];
export type Origem = "home" | "servico" | "local" | "blog" | "blog-pilar" | "blog-complementar" | "institucional";

export type DadosOrcamento = {
  nome: string;
  empresa?: string;
  servico: string;
  data?: string; // aaaa-mm-dd (input type=date)
  local?: string;
  descricao: string;
  pagina: string;
};

const dataBr = (iso: string) => {
  const [a, m, d] = iso.split("-");
  return a && m && d ? `${d}/${m}/${a}` : iso;
};

/** Mensagem do formulário. Linhas de campos vazios são omitidas. */
export function mensagemOrcamento(d: DadosOrcamento): string {
  const linhas: [string, string | undefined][] = [
    ["Nome", d.nome],
    ["Empresa", d.empresa],
    ["Serviço", d.servico],
    ["Data", d.data ? dataBr(d.data) : undefined],
    ["Local", d.local],
    ["Sobre o projeto", d.descricao],
  ];
  return [
    "Olá, IDA Produtora! Gostaria de um orçamento.",
    ...linhas.filter(([, v]) => v && v.trim()).map(([k, v]) => `${k}: ${v!.trim()}`),
    `(enviado pela página ${d.pagina})`,
  ].join("\n");
}

export const mensagemFlutuante = (pagina: string) =>
  `Olá, IDA Produtora! Vim pela página ${pagina} e quero um orçamento.`;

export const mensagemArtigo = (titulo: string, servico: string) =>
  `Olá, IDA Produtora! Li o artigo "${titulo}" e quero um orçamento de ${servico}.`;

/** Título da página atual sem o sufixo da marca (para as mensagens). */
export function tituloDaPagina(): string {
  if (typeof document === "undefined") return "do site";
  return document.title.replace(/\s*\|\s*IDA Produtora.*$/, "").trim() || "do site";
}
