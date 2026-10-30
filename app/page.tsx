// Home (docs/02-paginas.md, ordem das seções; referência visual em design/home-referencia.html).
import { GaleriaFotos } from "@/components/GaleriaFotos";
import type { Metadata } from "next";

import { Botao, Container, JsonLd, TituloSecao } from "@/components/ui";
import {
  Diferenciais,
  Etapas,
  FaixaClientes,
  Faq,
  GradePortfolio,
  GradeServicos,
  Hero,
  RespostaDireta,
  Secao,
  Slogan,
  type ItemFaq,
} from "@/components/secoes";
import { ShowreelRotativo } from "@/components/ShowreelRotativo";
import { FormularioWhatsApp } from "@/components/whatsapp";
import { CARDS_HOME, TAMBEM_FAZEMOS, catalogo, servicoPorUrl } from "@/lib/catalogo";
import { fotosHome, home, videos } from "@/lib/dados";
import { SITE, catalogo as catalogoSchema, grafo, website } from "@/lib/schema";
import { WHATSAPP_EXIBICAO, WHATSAPP_URL } from "@/lib/whatsapp";
import Link from "next/link";

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
  alternates: { canonical: SITE },
};

// Perguntas de data/servicos.json (home.faq). Respostas sem prazos ou preços inventados (CLAUDE.md regra 3).
const RESPOSTAS: Record<string, string> = {
  "O que faz uma produtora audiovisual?":
    "Planeja, grava e edita vídeos e fotos para empresas: do roteiro de um vídeo institucional à transmissão ao vivo de um evento. Na IDA, a mesma equipe cuida de foto, vídeo, live e drone.",
  "Vocês atendem fora de São Paulo?":
    "Sim. Atendemos a capital e a Grande São Paulo, e outras cidades sob consulta. Conte o local do projeto no formulário de orçamento.",
  "Em quanto tempo recebo o material?":
    "Depende do serviço e do volume de material. O prazo de entrega de cada projeto é combinado no orçamento, antes de começar.",
  "Posso contratar foto e vídeo juntos?":
    "Sim, e é o nosso diferencial: a mesma equipe cuida das duas coisas, com um só briefing e um só contrato.",
  "Como peço um orçamento?":
    "Preencha o formulário desta página ou chame no WhatsApp (11) 95302-5177. A conversa abre direto com a IDA, sem cadastro.",
};
const faqHome: ItemFaq[] = home.faq.map((pergunta) => ({ pergunta, resposta: RESPOSTAS[pergunta] }));

export default function Home() {
  return (
    <>
      <JsonLd dados={grafo([website(), catalogoSchema(catalogo.map((s) => ({ nome: s.nome, url: s.url })))])} />

      <Hero
        eyebrow="PRODUTORA AUDIOVISUAL · SÃO PAULO"
        titulo={home.h1}
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

      <RespostaDireta rotulo="O QUE A IDA FAZ">
        <p>
          A IDA Produtora planeja, filma, fotografa e edita conteúdo audiovisual para empresas em São Paulo: vídeos institucionais, cobertura de
          eventos corporativos e shows, transmissões ao vivo, vídeos em 360° e imagens aéreas com drone. Um só time cuida do roteiro à entrega, com
          foto e vídeo na mesma linguagem visual.
        </p>
      </RespostaDireta>

      <Secao id="servicos" eyebrow="NOSSOS SERVIÇOS" titulo="Tudo o que sua empresa precisa em imagem" className="lg:pb-14">
        <GradeServicos servicos={CARDS_HOME.map((u) => servicoPorUrl(u)!)} />
        <p className="mt-7 text-[15px] text-muted">
          Também fazemos:{" "}
          {TAMBEM_FAZEMOS.map((u, i) => {
            const s = servicoPorUrl(u)!;
            return (
              <span key={u}>
                <Link href={u}>{s.nome.toLowerCase()}</Link>
                {i < TAMBEM_FAZEMOS.length - 2 ? ", " : i === TAMBEM_FAZEMOS.length - 2 ? " e " : "."}
              </span>
            );
          })}
        </p>
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

      <Secao id="portfolio" eyebrow="PORTFÓLIO" titulo="Histórias reais, em todos os ângulos" fundo="surface">
        <GradePortfolio videos={videos.filter((v) => v.home)} />
        <div className="mt-14">
          <GaleriaFotos titulo="Fotografia de eventos corporativos" fotos={fotosHome} />
        </div>
        <div className="mt-10 flex justify-center">
          <Botao href="/portfolio" variante="secundario">
            Ver portfólio completo
          </Botao>
        </div>
      </Secao>

      <Secao id="como-funciona" eyebrow="COMO FUNCIONA" titulo="Do briefing à entrega, em 4 etapas">
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

      <Secao id="faq" eyebrow="PERGUNTAS FREQUENTES" titulo="Antes de pedir o orçamento" largura="estreita">
        <Faq itens={faqHome} comSchema />
      </Secao>

      <section id="orcamento" aria-labelledby="orcamento-titulo" className="scroll-mt-24 bg-surface">
        <Container className="flex flex-wrap gap-14 py-20 lg:py-24">
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-5">
            <TituloSecao id="orcamento-titulo" eyebrow="ORÇAMENTO" titulo="Conte seu projeto. A resposta chega no WhatsApp." />
            <p className="m-0 text-[17px] leading-[1.65] text-muted">
              Escolha o tipo de serviço, descreva em poucas linhas e envie. A conversa abre direto com a IDA, sem cadastro.
            </p>
            <p className="m-0 mt-2 text-[15px] text-text">
              WhatsApp{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="font-semibold text-text underline underline-offset-4 hover:text-accent">
                {WHATSAPP_EXIBICAO}
              </a>
            </p>
          </div>
          <div className="min-w-0 flex-[1_1_520px]">
            <FormularioWhatsApp origem="home" pagina="Home" />
          </div>
        </Container>
      </section>
    </>
  );
}
