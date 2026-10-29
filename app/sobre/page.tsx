// /sobre — só audiovisual (CLAUDE.md regra 1). Dados que faltam ficam em docs/PENDENCIAS.md, não na página.
import Image from "next/image";

import { CabecalhoInstitucional, metadataInstitucional } from "@/components/PaginaInstitucional";
import { Diferenciais, FaixaClientes, Secao, Etapas } from "@/components/secoes";
import { Botao, Container } from "@/components/ui";
import { pessoa } from "@/lib/schema";

const DESCRICAO =
  "Conheça a IDA Produtora Audiovisual: produtora corporativa em São Paulo, fundada por Ivan Dias, com foto, vídeo, live e drone na mesma equipe.";

export const metadata = metadataInstitucional({ titulo: "Sobre a IDA Produtora Audiovisual", descricao: DESCRICAO, url: "/sobre" });

export default function Sobre() {
  return (
    <>
      <CabecalhoInstitucional
        tipo="AboutPage"
        url="/sobre"
        nome="Sobre"
        eyebrow="SOBRE A IDA"
        h1="Sobre a IDA Produtora Audiovisual"
        descricao={DESCRICAO}
        schemaExtra={[pessoa({ nome: "Ivan Dias", cargo: "Fundador da IDA Produtora Audiovisual", url: "/sobre" })]}
        intro={
          <>
            <p>
              A IDA Produtora Audiovisual é uma produtora corporativa de São Paulo. Fazemos vídeo institucional, filmagem de eventos, transmissão
              ao vivo, cobertura de shows, vídeos em 360°, imagens aéreas com drone e fotografia para empresas.
            </p>
            <p>
              O que nos define é simples: foto e vídeo com uma só equipe, um só briefing e um só contrato. Você fala direto com quem vai produzir,
              do primeiro contato à entrega.
            </p>
          </>
        }
      />

      <section aria-labelledby="historia-titulo" className="bg-surface">
        <Container className="flex flex-wrap items-center gap-14 py-20 lg:py-24">
          <div className="min-w-0 flex-[1_1_420px]">
            <h2 id="historia-titulo" className="m-0 text-[28px] leading-[1.2] font-bold sm:text-[36px]">
              Sua história. Nosso olhar.
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-[17px] leading-[1.7] text-muted">
              <p className="m-0">
                A IDA Produtora Audiovisual foi fundada por Ivan Dias. O slogan resume a proposta: cada empresa tem uma história, e o nosso
                trabalho é encontrar o melhor jeito de mostrar essa história em imagem.
              </p>
              <p className="m-0">
                Trabalhamos com marketing, comunicação interna, RH e eventos de empresas, com agências de eventos que terceirizam a captação e com
                produtores de shows e festivais. Em todos os casos, o processo é o mesmo: entender o objetivo, planejar, captar com equipe
                discreta e entregar o material pronto para cada canal.
              </p>
            </div>
          </div>
          <div className="flex min-w-0 flex-[1_1_320px] justify-center">
            <Image src="/brand/ida-logo-principal-branco.svg" alt="IDA Produtora Audiovisual" width={320} height={160} className="h-auto w-64" />
          </div>
        </Container>
      </section>

      <Diferenciais
        eyebrow="COMO TRABALHAMOS"
        titulo="Uma equipe, um briefing, a mesma linguagem visual"
        itens={[
          { titulo: "Foto e vídeo juntos", texto: "Fotógrafo e cinegrafista trabalham no mesmo plano, sem disputar espaço." },
          { titulo: "Atendimento direto", texto: "Orçamento, ajustes e entregas combinados pelo WhatsApp, com quem produz." },
          { titulo: "Dentro da lei", texto: "Drone regularizado, trilhas licenciadas e cuidado com uso de imagem (LGPD)." },
          { titulo: "Parceiros especializados", texto: "Estúdio, streaming multicâmera e ativações com parceiros, coordenados pela IDA." },
        ]}
      />

      <Secao eyebrow="PROCESSO" titulo="Do briefing à entrega" fundo="surface">
        <Etapas
          etapas={[
            { titulo: "Briefing", texto: "Objetivo, público e onde o conteúdo vai rodar." },
            { titulo: "Planejamento", texto: "Roteiro, cronograma e plano de captação aprovados por você." },
            { titulo: "Captação", texto: "Foto, vídeo, drone ou live, com equipe discreta." },
            { titulo: "Entrega", texto: "Edição, cor, trilha e versões para cada canal." },
          ]}
        />
      </Secao>

      <FaixaClientes />

      <Container className="flex flex-wrap items-center justify-between gap-6 py-20">
        <p className="m-0 max-w-[620px] text-[22px] leading-snug font-bold">Quer conversar sobre o seu projeto?</p>
        <div className="flex flex-wrap gap-3">
          <Botao href="/orcamento">Pedir orçamento</Botao>
          <Botao href="/portfolio" variante="secundario">
            Ver portfólio
          </Botao>
        </div>
      </Container>
    </>
  );
}
