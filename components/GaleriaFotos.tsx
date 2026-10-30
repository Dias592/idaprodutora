"use client";
// Galeria de fotos com visualizador em tela cheia (foto inteira, sem recorte). Usada na home e no /portfolio.
// Miniaturas e ampliadas geradas por scripts/fotos-portfolio.mjs.
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type FotoGaleria = { id: string; alt: string; largura: number; altura: number };

export function GaleriaFotos({
  fotos,
  titulo,
  inicial,
  passo = 24,
  nivelTitulo = "h3",
  idTitulo,
}: {
  fotos: FotoGaleria[];
  titulo: string;
  /** quantas fotos mostrar antes do botão "Ver mais fotos" (padrão: todas) */
  inicial?: number;
  passo?: number;
  nivelTitulo?: "h2" | "h3";
  idTitulo?: string;
}) {
  const [visiveis, setVisiveis] = useState(inicial ?? fotos.length);
  const [aberta, setAberta] = useState<number | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const toque = useRef<number | null>(null);

  const mover = useCallback((delta: number) => setAberta((i) => (i === null ? i : (i + delta + fotos.length) % fotos.length)), [fotos.length]);

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (aberta !== null && !d.open) d.showModal();
    if (aberta === null && d.open) d.close();
    document.documentElement.style.overflow = aberta !== null ? "hidden" : "";
  }, [aberta]);

  useEffect(() => {
    if (aberta === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [aberta, mover]);

  const Titulo = nivelTitulo;
  const atual = aberta !== null ? fotos[aberta] : null;

  return (
    <div>
      <Titulo id={idTitulo} className="m-0 mb-6 text-[19px] font-semibold">
        {titulo}
      </Titulo>
      <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 md:grid-cols-4 md:gap-3">
        {fotos.slice(0, visiveis).map((f, i) => (
          <li key={f.id} className="m-0 overflow-hidden rounded-ida bg-bg">
            <button
              type="button"
              onClick={() => setAberta(i)}
              aria-label={`Ampliar foto: ${f.alt}`}
              className="block w-full cursor-zoom-in border-0 bg-transparent p-0"
            >
              <Image
                src={`/portfolio/fotos/${f.id}.webp`}
                alt={f.alt}
                width={1500}
                height={1000}
                sizes="(min-width: 1240px) 300px, (min-width: 768px) 25vw, 50vw"
                className="aspect-[3/2] h-auto w-full object-cover transition duration-300 hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>
      {visiveis < fotos.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisiveis((v) => Math.min(v + passo, fotos.length))}
            className="min-h-12 cursor-pointer rounded-ida border border-text bg-transparent px-7 text-[15px] font-semibold text-text transition hover:border-accent hover:text-accent"
          >
            Ver mais fotos ({fotos.length - visiveis})
          </button>
        </div>
      )}

      <dialog
        ref={dialogo}
        onClose={() => setAberta(null)}
        onClick={(e) => e.target === e.currentTarget && setAberta(null)}
        onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (toque.current === null) return;
          const dx = e.changedTouches[0].clientX - toque.current;
          if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
          toque.current = null;
        }}
        aria-label="Visualizador de fotos"
        className="m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 text-text backdrop:bg-bg/95"
      >
        {atual && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && setAberta(null)}>
            <Image
              key={atual.id}
              src={`/portfolio/fotos/ampliadas/${atual.id}.webp`}
              alt={atual.alt}
              width={atual.largura}
              height={atual.altura}
              sizes="100vw"
              className="h-auto max-h-[80vh] w-auto max-w-full rounded-ida object-contain"
            />
            <p className="m-0 max-w-[720px] text-center text-sm text-muted">
              {atual.alt} · {aberta! + 1} / {fotos.length}
            </p>
          </div>
        )}
        <button type="button" onClick={() => setAberta(null)} aria-label="Fechar" className={botaoVisualizador("top-4 right-4")}>
          <X aria-hidden size={22} />
        </button>
        {fotos.length > 1 && (
          <>
            <button type="button" onClick={() => mover(-1)} aria-label="Foto anterior" className={botaoVisualizador("top-1/2 left-3 -translate-y-1/2")}>
              <ChevronLeft aria-hidden size={26} />
            </button>
            <button type="button" onClick={() => mover(1)} aria-label="Próxima foto" className={botaoVisualizador("top-1/2 right-3 -translate-y-1/2")}>
              <ChevronRight aria-hidden size={26} />
            </button>
          </>
        )}
      </dialog>
    </div>
  );
}

const botaoVisualizador = (posicao: string) =>
  `fixed ${posicao} flex size-12 cursor-pointer items-center justify-center rounded-full border border-surface bg-bg/80 text-text transition hover:border-accent hover:text-accent`;
