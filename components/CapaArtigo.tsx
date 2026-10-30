// Capa de artigo do blog: foto (data/midia-blog.json) ou, enquanto não houver foto, capa gráfica da marca.
// Server component (capaDoArtigo confere o arquivo em public/).
import Image from "next/image";

import { cx } from "@/components/ui";
import { altDaCapa, capaDoArtigo } from "@/lib/midia-blog";

export function CapaArtigo({
  slug,
  titulo,
  servicoNome,
  sizes,
  prioridade = false,
  className,
}: {
  slug: string;
  titulo: string;
  servicoNome: string;
  sizes: string;
  prioridade?: boolean;
  className?: string;
}) {
  const capa = capaDoArtigo(slug);
  if (capa) {
    return (
      <Image
        src={capa}
        alt={altDaCapa(slug) ?? `Imagem de capa: ${titulo}`}
        width={1600}
        height={900}
        priority={prioridade}
        sizes={sizes}
        className={cx("aspect-video h-auto w-full object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`Capa: ${titulo}`}
      className={cx(
        "flex aspect-video w-full flex-col items-center justify-center gap-4 border border-surface bg-[radial-gradient(circle_at_30%_20%,var(--color-surface),var(--color-bg)_70%)]",
        className,
      )}
    >
      <Image src="/brand/ida-icone-branco.svg" alt="" width={64} height={64} unoptimized className="h-12 w-auto opacity-90 sm:h-16" />
      <span className="h-[3px] w-10 bg-accent" />
      <span className="px-6 text-center text-[11px] font-semibold tracking-[0.3em] text-muted uppercase">{servicoNome}</span>
    </div>
  );
}
