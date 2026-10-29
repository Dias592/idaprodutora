// /contato — WhatsApp, Instagram e área atendida (sem endereço de rua). ContactPage.
import { CabecalhoInstitucional, metadataInstitucional } from "@/components/PaginaInstitucional";
import { Botao, Container, IconeWhatsApp } from "@/components/ui";
import { WHATSAPP_EXIBICAO, linkWhatsApp } from "@/lib/whatsapp";

const DESCRICAO = "Fale com a IDA Produtora Audiovisual pelo WhatsApp (11) 95302-5177 ou pelo Instagram @idaprodutora. Atendemos São Paulo e região.";

export const metadata = metadataInstitucional({ titulo: "Contato | IDA Produtora", descricao: DESCRICAO, url: "/contato" });

const CANAIS = [
  { rotulo: "WhatsApp", valor: WHATSAPP_EXIBICAO, href: linkWhatsApp("Olá, IDA Produtora! Vim pela página de contato.") },
  { rotulo: "Instagram", valor: "@idaprodutora", href: "https://instagram.com/idaprodutora" },
  { rotulo: "Área atendida", valor: "São Paulo e região", href: null },
];

export default function Contato() {
  return (
    <>
      <CabecalhoInstitucional
        tipo="ContactPage"
        url="/contato"
        nome="Contato"
        eyebrow="CONTATO"
        h1="Fale com a IDA Produtora"
        descricao={DESCRICAO}
        intro={<p>O atendimento é pelo WhatsApp: você fala direto com quem vai produzir. Para orçamentos, use o formulário, que já organiza as informações do projeto.</p>}
      />
      <Container className="pb-20">
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4 p-0">
          {CANAIS.map((c) => (
            <li key={c.rotulo} className="flex flex-col gap-2 rounded-ida border border-surface p-7">
              <p className="m-0 text-xs tracking-[0.2em] text-muted uppercase">{c.rotulo}</p>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener" className="text-xl font-semibold text-text underline underline-offset-4 hover:text-accent">
                  {c.valor}
                </a>
              ) : (
                <p className="m-0 text-xl font-semibold">{c.valor}</p>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Botao href={linkWhatsApp("Olá, IDA Produtora! Vim pela página de contato.")}>
            <IconeWhatsApp />
            Chamar no WhatsApp
          </Botao>
          <Botao href="/orcamento" variante="secundario">
            Formulário de orçamento
          </Botao>
        </div>
      </Container>
    </>
  );
}
