// /orcamento — FormularioWhatsApp sem pré-seleção. ContactPage.
import { CabecalhoInstitucional, metadataInstitucional } from "@/components/PaginaInstitucional";
import { Container } from "@/components/ui";
import { FormularioWhatsApp } from "@/components/whatsapp";
import { WHATSAPP_EXIBICAO, WHATSAPP_URL } from "@/lib/whatsapp";

const DESCRICAO = "Peça o orçamento de vídeo, foto, transmissão ao vivo ou drone para a sua empresa. A mensagem abre direto no WhatsApp da IDA.";

export const metadata = metadataInstitucional({ titulo: "Orçamento pelo WhatsApp | IDA Produtora", descricao: DESCRICAO, url: "/orcamento" });

export default function Orcamento() {
  return (
    <>
      <CabecalhoInstitucional
        tipo="ContactPage"
        url="/orcamento"
        nome="Orçamento"
        eyebrow="ORÇAMENTO"
        h1="Peça seu orçamento pelo WhatsApp"
        descricao={DESCRICAO}
        intro={
          <p>
            Escolha o tipo de serviço, descreva o projeto em poucas linhas e envie. A conversa abre direto com a IDA no WhatsApp, sem cadastro. Se
            preferir, chame no{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="text-text underline underline-offset-4 hover:text-accent">
              {WHATSAPP_EXIBICAO}
            </a>
            .
          </p>
        }
      />
      <section aria-label="Formulário de orçamento" className="bg-surface">
        <Container className="max-w-[880px] py-16 lg:py-20">
          <FormularioWhatsApp origem="institucional" pagina="Orçamento" />
        </Container>
      </section>
    </>
  );
}
