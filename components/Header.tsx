"use client";
// Header fixo com mega menu acessível por teclado (docs/02 e 05).
// Desktop: botão "Serviços" com aria-expanded abre o painel; Esc fecha e devolve o foco; clique fora fecha.
// Celular: botão de menu abre a navegação completa.
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { GRUPOS_MENU, servicoPorUrl } from "@/lib/catalogo";
import { linkWhatsApp, mensagemFlutuante, tituloDaPagina } from "@/lib/whatsapp";
import { registrarLead } from "@/lib/analytics";
import { Container, IconeWhatsApp, cx } from "@/components/ui";

const LINKS = [
  { href: "/portfolio", rotulo: "Portfólio" },
  { href: "/blog", rotulo: "Blog" },
  { href: "/sobre", rotulo: "Sobre" },
];

export function Header() {
  const [megaAberto, setMegaAberto] = useState(false);
  const [mobileAberto, setMobileAberto] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const painelId = useId();
  const mobileId = useId();
  const pathname = usePathname();

  // Fecha os menus ao trocar de página.
  const [ultimaRota, setUltimaRota] = useState(pathname);
  if (ultimaRota !== pathname) {
    setUltimaRota(pathname);
    setMegaAberto(false);
    setMobileAberto(false);
  }

  useEffect(() => {
    if (!megaAberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaAberto(false);
        botaoRef.current?.focus();
      }
    };
    const aoClicar = (e: MouseEvent) => {
      if (!areaRef.current?.contains(e.target as Node)) setMegaAberto(false);
    };
    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("mousedown", aoClicar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.removeEventListener("mousedown", aoClicar);
    };
  }, [megaAberto]);

  const abrirWhatsApp = () => registrarLead("Geral", "header");

  return (
    <header className="sticky top-0 z-40 border-b border-surface bg-bg/95 backdrop-blur">
      <Container className="flex min-h-[80px] items-center justify-between gap-5">
        <Link href="/" aria-label="IDA Produtora — página inicial" className="flex items-center">
          <Image src="/brand/ida-logo-compacto-branco.svg" alt="IDA Produtora" width={88} height={44} priority className="h-11 w-auto" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 text-sm font-medium tracking-[0.04em] lg:flex">
          <div
            ref={areaRef}
            className="relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setMegaAberto(false);
            }}
          >
            <button
              ref={botaoRef}
              type="button"
              aria-expanded={megaAberto}
              aria-controls={painelId}
              onClick={() => setMegaAberto((v) => !v)}
              className="inline-flex min-h-11 items-center gap-1.5 text-muted transition hover:text-text"
            >
              Serviços
              <ChevronDown aria-hidden="true" size={16} strokeWidth={1.5} className={cx("transition", megaAberto && "rotate-180")} />
            </button>
            <div
              id={painelId}
              hidden={!megaAberto}
              className="absolute top-full left-1/2 mt-4 w-[min(860px,90vw)] -translate-x-1/2 rounded-ida border border-surface bg-bg p-8 shadow-2xl"
            >
              <div className="grid grid-cols-3 gap-8">
                {GRUPOS_MENU.map((g) => (
                  <div key={g.nome}>
                    <p className="mb-4 text-xs tracking-[0.2em] text-muted uppercase">{g.nome}</p>
                    <ul className="m-0 flex list-none flex-col gap-1 p-0">
                      {g.urls.map((url) => {
                        const s = servicoPorUrl(url)!;
                        const Icone = s.icone;
                        return (
                          <li key={url}>
                            <Link
                              href={url}
                              className="flex min-h-11 items-center gap-3 rounded-ida px-2 py-2 text-text no-underline transition hover:bg-surface"
                            >
                              <Icone aria-hidden="true" size={20} strokeWidth={1.5} className="shrink-0" />
                              <span>{s.nome}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex min-h-11 items-center text-muted no-underline transition hover:text-text">
              {l.rotulo}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={linkWhatsApp(mensagemFlutuante("do site"))}
            onClick={(e) => {
              e.currentTarget.href = linkWhatsApp(mensagemFlutuante(tituloDaPagina()));
              abrirWhatsApp();
            }}
            target="_blank"
            rel="noopener"
            className="hidden min-h-11 items-center gap-2.5 rounded-ida bg-accent px-5 text-[19px] font-bold text-accent-contrast no-underline transition hover:brightness-90 sm:inline-flex"
          >
            <IconeWhatsApp tamanho={18} />
            Orçamento pelo WhatsApp
          </a>
          <button
            type="button"
            aria-expanded={mobileAberto}
            aria-controls={mobileId}
            aria-label={mobileAberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileAberto((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-ida text-text lg:hidden"
          >
            {mobileAberto ? <X aria-hidden="true" strokeWidth={1.5} /> : <Menu aria-hidden="true" strokeWidth={1.5} />}
          </button>
        </div>
      </Container>

      <nav id={mobileId} aria-label="Menu" hidden={!mobileAberto} className="max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-surface lg:hidden">
        <Container className="flex flex-col gap-8 py-8">
          {GRUPOS_MENU.map((g) => (
            <div key={g.nome}>
              <p className="mb-3 text-xs tracking-[0.2em] text-muted uppercase">{g.nome}</p>
              <ul className="m-0 flex list-none flex-col p-0">
                {g.urls.map((url) => (
                  <li key={url}>
                    <Link href={url} className="flex min-h-11 items-center text-text no-underline">
                      {servicoPorUrl(url)!.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="m-0 flex list-none flex-col border-t border-surface p-0 pt-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex min-h-11 items-center font-semibold text-text no-underline">
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
