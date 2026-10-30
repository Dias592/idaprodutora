import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui";
import { GRUPOS_MENU, servicoPorUrl } from "@/lib/catalogo";
import { WHATSAPP_EXIBICAO, WHATSAPP_URL } from "@/lib/whatsapp";
import { INSTAGRAM } from "@/lib/redes";

const linkRodape = "inline-flex min-h-8 items-center text-text no-underline hover:text-accent";

export function Footer() {
  return (
    <footer className="border-t border-surface bg-bg pb-20 sm:pb-0">
      <Container className="flex flex-wrap justify-between gap-12 pt-16 pb-10">
        <div className="flex flex-[1_1_240px] flex-col gap-4">
          <Image src="/brand/ida-logo-principal-branco.svg" alt="IDA Produtora Audiovisual" width={160} height={80} className="h-auto w-40" />
          <p className="m-0 text-xs tracking-[0.3em] text-muted">SUA HISTÓRIA. NOSSO OLHAR.</p>
          <p className="m-0 max-w-[280px] text-sm leading-relaxed text-muted">Produtora audiovisual corporativa em São Paulo.</p>
        </div>
        {GRUPOS_MENU.map((g) => (
          <nav key={g.nome} aria-label={`Serviços: ${g.nome}`} className="flex flex-[1_1_180px] flex-col gap-1 text-sm">
            <p className="m-0 mb-2 text-xs tracking-[0.2em] text-muted uppercase">{g.nome}</p>
            {g.urls.map((url) => (
              <Link key={url} href={url} className={linkRodape}>
                {servicoPorUrl(url)!.nome}
              </Link>
            ))}
          </nav>
        ))}
        <div className="flex flex-[1_1_200px] flex-col gap-1 text-sm">
          <p className="m-0 mb-2 text-xs tracking-[0.2em] text-muted">CONTATO</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className={linkRodape}>
            WhatsApp {WHATSAPP_EXIBICAO}
          </a>
          {INSTAGRAM && (
            <a href={INSTAGRAM.url} target="_blank" rel="noopener" className={linkRodape}>
              Instagram {INSTAGRAM.usuario}
            </a>
          )}
          <span className="inline-flex min-h-8 items-center text-muted">São Paulo e região</span>
          <p className="m-0 mt-4 mb-2 text-xs tracking-[0.2em] text-muted">A IDA</p>
          <Link href="/sobre" className={linkRodape}>Sobre</Link>
          <Link href="/portfolio" className={linkRodape}>Portfólio</Link>
          <Link href="/blog" className={linkRodape}>Blog</Link>
          <Link href="/orcamento" className={linkRodape}>Orçamento</Link>
        </div>
      </Container>
      <Container className="flex flex-wrap justify-between gap-3 border-t border-surface pt-5 pb-8 text-xs text-muted">
        <span>© {2026} IDA Produtora Audiovisual</span>
        <span>
          <Link href="/politica-de-privacidade" className="text-muted hover:text-text">
            Política de privacidade
          </Link>{" "}
          ·{" "}
          <Link href="/termos" className="text-muted hover:text-text">
            Termos
          </Link>
        </span>
      </Container>
    </footer>
  );
}
