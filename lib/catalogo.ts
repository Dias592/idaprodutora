// Ícone e resumo de cada serviço para cards, menu e rodapé.
// Os dados de SEO (H1, title, palavra-chave) ficam em data/servicos.json; aqui só o texto curto de vitrine.
import type { LucideIcon } from "lucide-react";
import {
  Aperture,
  CalendarDays,
  Camera,
  Drone,
  Film,
  GraduationCap,
  MessageSquareQuote,
  Mic,
  Music,
  PartyPopper,
  Radio,
  Rotate3d,
  Scissors,
  Users,
  Video,
} from "lucide-react";

import { paginasServico, type Servico } from "@/lib/dados";

type Vitrine = { icone: LucideIcon; resumo: string };

const VITRINE: Record<string, Vitrine> = {
  "/video-institucional": { icone: Video, resumo: "A história da sua empresa em 1 a 3 minutos, com roteiro, gravação e edição." },
  "/filmagem-de-eventos-corporativos": { icone: CalendarDays, resumo: "Congressos, convenções e lançamentos, com aftermovie pronto para as redes." },
  "/transmissao-ao-vivo": { icone: Radio, resumo: "Lives e eventos híbridos em multicâmera para YouTube, Zoom ou Teams." },
  "/video-memoria-aftermovie": { icone: Film, resumo: "O resumo do evento em poucos minutos, para redes sociais e próximas edições." },
  "/cobertura-de-shows": { icone: Music, resumo: "Captação multicâmera com áudio da mesa, para registro, DVD e redes." },
  "/imagens-aereas-drone": { icone: Drone, resumo: "Voos autorizados (SISANT, Anatel e SARPAS) para eventos, obras e empresas." },
  "/video-360": { icone: Rotate3d, resumo: "Tours virtuais e experiências imersivas para site, YouTube e óculos VR." },
  "/fotografia-corporativa": { icone: Camera, resumo: "Eventos, equipe e liderança, no mesmo dia e com a mesma equipe do vídeo." },
  "/comunicacao-interna": { icone: Users, resumo: "Endomarketing, onboarding, mensagem do CEO e campanhas internas em vídeo." },
  "/video-de-treinamento": { icone: GraduationCap, resumo: "Treinamentos, EAD e videoaulas gravados com roteiro e didática." },
  "/video-depoimento": { icone: MessageSquareQuote, resumo: "Clientes e colaboradores contando a experiência com a sua empresa." },
  "/estudio-chroma-key": { icone: Aperture, resumo: "Gravações em estúdio parceiro em São Paulo, com chroma key e cenário virtual." },
  "/podcast-videocast": { icone: Mic, resumo: "Podcast e videocast com áudio multicanal e cortes para as redes." },
  "/ativacoes-para-eventos": { icone: PartyPopper, resumo: "Cabine de fotos, túnel infinito e totens operados com parceiros." },
  "/edicao-de-video": { icone: Scissors, resumo: "Edição, cor, trilha e legendas para o material que você já gravou." },
};

export type ServicoVitrine = Servico & Vitrine;

export const catalogo: ServicoVitrine[] = paginasServico.map((s) => ({ ...s, ...VITRINE[s.url] }));
export const servicoPorUrl = (url: string) => catalogo.find((s) => s.url === url);

/** Os 9 cards principais da home (referência visual) + "Também fazemos". */
export const CARDS_HOME = [
  "/video-institucional",
  "/filmagem-de-eventos-corporativos",
  "/transmissao-ao-vivo",
  "/cobertura-de-shows",
  "/fotografia-corporativa",
  "/video-360",
  "/imagens-aereas-drone",
  "/comunicacao-interna",
  "/estudio-chroma-key",
];
export const TAMBEM_FAZEMOS = ["/video-memoria-aftermovie", "/video-depoimento", "/ativacoes-para-eventos", "/edicao-de-video"];

/** Mega menu: 3 grupos (docs/02-paginas.md), na ordem da tabela. */
export const GRUPOS_MENU: { nome: string; urls: string[] }[] = [
  {
    nome: "Vídeo",
    urls: ["/video-institucional", "/comunicacao-interna", "/video-de-treinamento", "/video-depoimento", "/edicao-de-video"],
  },
  {
    nome: "Eventos",
    urls: ["/filmagem-de-eventos-corporativos", "/video-memoria-aftermovie", "/transmissao-ao-vivo", "/cobertura-de-shows", "/ativacoes-para-eventos"],
  },
  {
    nome: "Estúdio e Foto",
    urls: ["/fotografia-corporativa", "/imagens-aereas-drone", "/video-360", "/estudio-chroma-key", "/podcast-videocast"],
  },
];
