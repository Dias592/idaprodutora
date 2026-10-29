// Peças básicas do design system (docs/05): container, eyebrow, barra laranja, títulos de seção e botões.
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
export { cx };

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-[1240px] px-4 sm:px-8", className)} {...props} />;
}

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return <p className={cx("m-0 text-xs tracking-[0.3em] text-muted uppercase", className)} {...props} />;
}

/** Barra laranja de 48 × 3 px sob os títulos de seção (assinatura visual). */
export function BarraLaranja({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cx("h-[3px] w-12 bg-accent", className)} />;
}

export function TituloSecao({
  eyebrow,
  titulo,
  id,
  barra = true,
  className,
}: {
  eyebrow?: string;
  titulo: ReactNode;
  id?: string;
  barra?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 id={id} className="m-0 text-[28px] leading-[1.15] font-bold sm:text-[36px] lg:text-[40px]">
        {titulo}
      </h2>
      {barra && <BarraLaranja className="mt-5" />}
    </div>
  );
}

type Variante = "primario" | "secundario";
const estilosBotao: Record<Variante, string> = {
  primario: "bg-accent text-accent-contrast font-bold hover:brightness-110",
  secundario: "border border-muted text-text font-semibold hover:bg-surface",
};

export function Botao({
  href,
  variante = "primario",
  className,
  children,
  ...props
}: { href: string; variante?: Variante } & Omit<ComponentProps<"a">, "href">) {
  const classes = cx(
    "inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-ida px-7 text-[15px] no-underline transition",
    estilosBotao[variante],
    className,
  );
  const externo = /^https?:/.test(href);
  if (externo || href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...(externo ? { target: "_blank", rel: "noopener" } : {})} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

/** Ícone do WhatsApp em traço (mesmo desenho da referência). */
export function IconeWhatsApp({ tamanho = 20, className }: { tamanho?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />
    </svg>
  );
}

export function JsonLd({ dados }: { dados: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />;
}
