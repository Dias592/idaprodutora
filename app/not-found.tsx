// 404 personalizada (docs/03): links para os grupos de serviço e para o orçamento.
import type { Metadata } from "next";
import Link from "next/link";

import { Botao, Container, Eyebrow, BarraLaranja, IconeWhatsApp } from "@/components/ui";
import { GRUPOS_MENU, servicoPorUrl } from "@/lib/catalogo";
import { WHATSAPP_URL, linkWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Página não encontrada | IDA Produtora",
  robots: { index: false, follow: true },
};

export default function NaoEncontrada() {
  return (
    <Container className="py-20 lg:py-28">
      <Eyebrow>ERRO 404</Eyebrow>
      <h1 className="mt-3 mb-0 text-[34px] leading-[1.1] font-bold sm:text-[48px]">Esta página não está disponível</h1>
      <BarraLaranja className="mt-5" />
      <p className="mt-6 max-w-[640px] text-lg leading-relaxed text-muted">
        O endereço pode ter mudado ou a página ainda está sendo preparada. Veja os serviços da IDA abaixo ou fale direto com a gente pelo WhatsApp.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Botao href={linkWhatsApp("Olá, IDA Produtora! Vim pelo site e quero um orçamento.")}>
          <IconeWhatsApp />
          Falar no WhatsApp
        </Botao>
        <Botao href="/" variante="secundario">
          Ir para a página inicial
        </Botao>
      </div>

      <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-10 border-t border-surface pt-12">
        {GRUPOS_MENU.map((g) => (
          <nav key={g.nome} aria-label={`Serviços: ${g.nome}`}>
            <p className="m-0 mb-3 text-xs tracking-[0.2em] text-muted uppercase">{g.nome}</p>
            <ul className="m-0 flex list-none flex-col p-0">
              {g.urls.map((url) => (
                <li key={url}>
                  <Link href={url} className="inline-flex min-h-10 items-center text-text no-underline hover:text-accent">
                    {servicoPorUrl(url)!.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">
        Prefere ligar ou mandar mensagem? <a href={WHATSAPP_URL}>WhatsApp (11) 95302-5177</a>
      </p>
    </Container>
  );
}
