// Vitrine do design system (fase 1). Fora do índice: noindex + Disallow no robots.
import type { Metadata } from "next";

import { Botao, Container, Eyebrow, IconeWhatsApp, TituloSecao } from "@/components/ui";
import {
  Breadcrumb,
  Diferenciais,
  Etapas,
  FaixaClientes,
  Faq,
  GradePortfolio,
  GradeServicos,
  Hero,
  RespostaDireta,
  RespostaDiretaArtigo,
  Secao,
  Slogan,
  TabelaPacotes,
} from "@/components/secoes";
import { ShowreelRotativo } from "@/components/ShowreelRotativo";
import { VideoFacade } from "@/components/VideoFacade";
import { CtaWhatsApp, FormularioWhatsApp } from "@/components/whatsapp";
import { CardArtigo, IndiceArtigo, LeiaTambem } from "@/components/blog";
import { CARDS_HOME, servicoPorUrl } from "@/lib/catalogo";
import { blogPlano, videos } from "@/lib/content";
import { SITE } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Styleguide | IDA Produtora",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE}/styleguide` },
};

const CORES = [
  ["bg", "bg-bg", "#0B0B0B", "Fundo principal"],
  ["surface", "bg-surface", "#2A2A2A", "Cards, seções alternadas"],
  ["text", "bg-text", "#FFFFFF", "Texto principal"],
  ["muted", "bg-muted", "#D9D9D9", "Texto secundário"],
  ["accent", "bg-accent", "#FF4D1A", "CTAs e detalhes"],
] as const;

function Bloco({ nome, children }: { nome: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-surface py-16">
      <p className="m-0 mb-8 font-mono text-xs text-accent">{`<${nome} />`}</p>
      {children}
    </div>
  );
}

export default function Styleguide() {
  const mahav = videos.find((v) => v.cliente === "Mahav")!;
  const pilar = blogPlano.find((a) => a.tipo === "pilar")!;
  const complementar = blogPlano.find((a) => a.tipo === "complementar")!;

  return (
    <>
      <Container className="pt-16">
        <Eyebrow>DESIGN SYSTEM · FASE 1</Eyebrow>
        <h1 className="mt-3 text-[34px] font-bold sm:text-[52px]">Styleguide da IDA Produtora</h1>
        <p className="max-w-[640px] text-lg text-muted">Todos os componentes do site, com os tokens de docs/05. Esta página não é indexada.</p>

        <Bloco nome="Tokens">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            {CORES.map(([nome, classe, hex, uso]) => (
              <div key={nome} className="rounded-ida border border-surface p-4">
                <div className={`${classe} mb-3 h-16 rounded-ida border border-surface`} />
                <p className="m-0 font-semibold">{nome}</p>
                <p className="m-0 text-sm text-muted">
                  {hex} · {uso}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3">
            <p className="m-0 text-[52px] leading-tight font-bold">H1 Montserrat 700</p>
            <p className="m-0 text-[40px] leading-tight font-bold">H2 de seção</p>
            <p className="m-0 text-xl font-semibold">H3 de card</p>
            <p className="m-0 text-lg text-muted">Corpo 18 px, entrelinha 1,6, cor muted.</p>
            <Eyebrow>EYEBROW 12 PX · 0.3EM</Eyebrow>
          </div>
        </Bloco>

        <Bloco nome="Botao">
          <div className="flex flex-wrap gap-3">
            <Botao href="#orcamento">Solicitar orçamento</Botao>
            <Botao href="#portfolio" variante="secundario">
              Ver showreel
            </Botao>
            <Botao href="#orcamento">
              <IconeWhatsApp />
              Orçamento pelo WhatsApp
            </Botao>
          </div>
        </Bloco>

        <Bloco nome="Breadcrumb">
          <Breadcrumb
            itens={[
              { nome: "Home", url: "/" },
              { nome: "Vídeo", url: "/#servicos" },
              { nome: "Vídeo institucional", url: "/video-institucional" },
            ]}
          />
        </Bloco>
      </Container>

      <Bloco nome="Hero + ShowreelRotativo">
        <Hero
          eyebrow="PRODUTORA AUDIOVISUAL · SÃO PAULO"
          titulo="Produtora audiovisual corporativa em São Paulo"
          subtitulo="Vídeo institucional, filmagem de eventos, transmissão ao vivo, shows, 360° e imagens aéreas — com foto e vídeo feitos pela mesma equipe, do briefing à entrega."
          acoes={
            <>
              <Botao href="#orcamento">Solicitar orçamento</Botao>
              <Botao href="#portfolio" variante="secundario">
                Ver showreel
              </Botao>
            </>
          }
          rodape={<Slogan />}
          midia={<ShowreelRotativo />}
        />
      </Bloco>

      <Bloco nome="RespostaDireta">
        <RespostaDireta rotulo="O QUE A IDA FAZ">
          <p>
            A IDA Produtora planeja, filma, fotografa e edita conteúdo audiovisual para empresas em São Paulo: vídeos institucionais, cobertura de
            eventos corporativos e shows, transmissões ao vivo, vídeos em 360° e imagens aéreas com drone. Um só time cuida do roteiro à entrega,
            com foto e vídeo na mesma linguagem visual.
          </p>
        </RespostaDireta>
      </Bloco>

      <Secao id="servicos" eyebrow="NOSSOS SERVIÇOS" titulo="CardServico">
        <GradeServicos servicos={CARDS_HOME.slice(0, 3).map((u) => servicoPorUrl(u)!)} />
      </Secao>

      <Diferenciais
        titulo="Um briefing, uma equipe, foto e vídeo com a mesma linguagem"
        itens={[
          { titulo: "Um só fornecedor", texto: "Foto, vídeo, live e drone no mesmo contrato e na mesma nota fiscal." },
          { titulo: "Equipe coordenada", texto: "Fotógrafo e cinegrafista trabalham juntos, sem disputar palco e convidados." },
          { titulo: "Pronto para cada canal", texto: "Versão horizontal para o site, vertical para Reels e cortes para o LinkedIn." },
          { titulo: "Atendimento direto", texto: "Você fala com quem vai produzir, pelo WhatsApp, do orçamento à entrega." },
        ]}
      />

      <Secao id="portfolio" eyebrow="PORTFÓLIO" titulo="GradePortfolio + VideoFacade" fundo="surface">
        <GradePortfolio videos={videos.filter((v) => v.home)} />
      </Secao>

      <Secao eyebrow="COMO FUNCIONA" titulo="Etapas">
        <Etapas
          etapas={[
            { titulo: "Briefing", texto: "Entendemos o objetivo, o público e onde o conteúdo vai rodar." },
            { titulo: "Roteiro e plano", texto: "Você aprova roteiro, cronograma e lista de cenas antes de gravar." },
            { titulo: "Captação", texto: "Foto, vídeo, drone ou live no dia, com equipe discreta." },
            { titulo: "Edição e entrega", texto: "Montagem, cor, trilha e versões para cada rede, com rodada de ajustes." },
          ]}
        />
      </Secao>

      <FaixaClientes />

      <Secao titulo="TabelaPacotes" fundo="surface">
        <TabelaPacotes
          pacotes={[
            { nome: "Essencial", descricao: "Roteiro, meia diária, vídeo de até 1 minuto.", preco: "R$ [PREENCHER]" },
            { nome: "Completo", descricao: "Roteiro, 1 diária, vídeo de até 3 minutos e cortes para redes.", preco: "R$ [PREENCHER]", destaque: true },
            { nome: "Imagem completa", descricao: "Completo + fotos de equipe, ambiente e liderança + drone.", preco: "Sob consulta" },
          ]}
        />
      </Secao>

      <Secao id="faq" eyebrow="PERGUNTAS FREQUENTES" titulo="Faq" largura="estreita">
        <Faq
          itens={[
            {
              pergunta: "O que faz uma produtora audiovisual?",
              resposta: "Planeja, grava e edita vídeos e fotos para empresas: do roteiro de um vídeo institucional à transmissão ao vivo de um evento.",
            },
            {
              pergunta: "Posso contratar foto e vídeo juntos?",
              resposta: "Sim. A mesma equipe cuida das duas coisas, com um só briefing e um só contrato.",
            },
          ]}
        />
      </Secao>

      <section id="orcamento" aria-labelledby="orc-titulo" className="scroll-mt-24 bg-surface">
        <Container className="flex flex-wrap gap-14 py-20 lg:py-24">
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-5">
            <TituloSecao id="orc-titulo" eyebrow="ORÇAMENTO" titulo="FormularioWhatsApp" />
            <p className="m-0 text-[17px] leading-[1.65] text-muted">
              Escolha o tipo de serviço, descreva em poucas linhas e envie. A conversa abre direto com a IDA, sem cadastro.
            </p>
          </div>
          <div className="min-w-0 flex-[1_1_520px]">
            <FormularioWhatsApp origem="home" pagina="Styleguide" />
          </div>
        </Container>
      </section>

      <Container className="pb-24">
        <Bloco nome="VideoFacade (avulso)">
          <div className="max-w-[720px]">
            <VideoFacade youtubeId={mahav.youtubeId} titulo={`${mahav.cliente} · ${mahav.projeto}`} thumbnail={mahav.thumbnail} />
          </div>
        </Bloco>

        <Bloco nome="Artigo: RespostaDireta, IndiceArtigo, CtaWhatsApp">
          <div className="prosa">
            <RespostaDiretaArtigo>
              <p>
                Vídeo institucional é um filme curto, de 1 a 3 minutos, que apresenta quem é a empresa, o que faz e por que confiar nela.
              </p>
            </RespostaDiretaArtigo>
            <IndiceArtigo
              itens={[
                { id: "o-que-e", titulo: "O que é um vídeo institucional" },
                { id: "quanto-custa", titulo: "Quanto custa" },
                { id: "como-fazer", titulo: "Como fazer" },
              ]}
            />
            <h2>Exemplo de H2 de artigo</h2>
            <p>
              Corpo do artigo com 18 px e no máximo 68 caracteres por linha. <a href="#">Link interno</a> em laranja e <strong>destaque</strong>.
            </p>
            <ul>
              <li>Item de lista com marcador laranja</li>
              <li>Outro item</li>
            </ul>
            <CtaWhatsApp servico="Vídeo institucional" tituloArtigo={pilar.titulo} />
          </div>
        </Bloco>

        <Bloco nome="CardArtigo + LeiaTambem">
          <div className="mb-10 max-w-[400px]">
            <CardArtigo artigo={complementar} />
          </div>
          <LeiaTambem urls={pilar.pilaresRelacionados ?? []} />
        </Bloco>
      </Container>
    </>
  );
}
