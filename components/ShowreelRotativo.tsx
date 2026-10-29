"use client";
// Showreel do topo da home (docs/08-materiais.md):
// 3 cortes de 15 s, sem som, em loop: Automec → Vert → MAM → volta ao início.
// - O poster do primeiro é a imagem LCP (priority).
// - Só o vídeo atual carrega; o próximo começa a carregar quando o atual está tocando.
// - Celular (< 768 px): só os posters alternando a cada 15 s, sem vídeo.
// - Botão de pausa visível; prefers-reduced-motion → só o primeiro poster, parado.
// - Indicador de 3 barras finas no rodapé do quadro (barra ativa em accent).
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

import { cx } from "@/components/ui";

export type TrechoShowreel = { nome: string; mp4: string; webm: string; poster: string };

export const TRECHOS_PADRAO: TrechoShowreel[] = [
  { nome: "Feira Automec", mp4: "/video/reel-1-automec.mp4", webm: "/video/reel-1-automec.webm", poster: "/video/reel-1.avif" },
  { nome: "Vert · Convenção de vendas", mp4: "/video/reel-2-vert.mp4", webm: "/video/reel-2-vert.webm", poster: "/video/reel-2.avif" },
  { nome: "MAM São Paulo · Feira no museu", mp4: "/video/reel-3-mam.mp4", webm: "/video/reel-3-mam.webm", poster: "/video/reel-3.avif" },
];

const DURACAO_MS = 15_000;

function useMidia(query: string) {
  return useSyncExternalStore(
    (aviso) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", aviso);
      return () => m.removeEventListener("change", aviso);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function ShowreelRotativo({ trechos = TRECHOS_PADRAO }: { trechos?: TrechoShowreel[] }) {
  const reduzirMovimento = useMidia("(prefers-reduced-motion: reduce)");
  const desktop = useMidia("(min-width: 768px)");
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [preCarregar, setPreCarregar] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const comVideo = desktop && !reduzirMovimento;
  const proximo = (atual + 1) % trechos.length;
  const avancar = useCallback(() => {
    setPreCarregar(false);
    setAtual((i) => (i + 1) % trechos.length);
  }, [trechos.length]);

  // Celular: posters alternam por tempo. Desktop: o vídeo avança no evento "ended".
  useEffect(() => {
    if (comVideo || reduzirMovimento || pausado) return;
    const t = setTimeout(avancar, DURACAO_MS);
    return () => clearTimeout(t);
  }, [comVideo, reduzirMovimento, pausado, atual, avancar]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (pausado) v.pause();
    else v.play().catch(() => setPausado(true));
  }, [pausado, atual, comVideo]);

  const trecho = trechos[reduzirMovimento ? 0 : atual];
  const mostrarControle = !reduzirMovimento;

  return (
    <div
      role="region"
      aria-roledescription="showreel"
      aria-label="Showreel: três trechos de vídeo de 15 segundos, sem som"
      className="relative aspect-video overflow-hidden rounded-ida bg-surface"
    >
      {/* Posters: o primeiro é a imagem LCP. */}
      {trechos.map((t, i) => (
        <Image
          key={t.poster}
          src={t.poster}
          alt=""
          fill
          priority={i === 0}
          sizes="(min-width: 1240px) 590px, (min-width: 1024px) 48vw, 100vw"
          className={cx("object-contain transition-opacity duration-700", i === (reduzirMovimento ? 0 : atual) ? "opacity-100" : "opacity-0")}
        />
      ))}

      {comVideo && (
        <video
          key={trecho.mp4}
          ref={videoRef}
          className="absolute inset-0 size-full object-contain"
          muted
          autoPlay
          playsInline
          preload="auto"
          poster={trecho.poster}
          onPlaying={() => setPreCarregar(true)}
          onEnded={avancar}
          aria-hidden="true"
        >
          <source src={trecho.webm} type="video/webm" />
          <source src={trecho.mp4} type="video/mp4" />
        </video>
      )}

      {/* Pré-carrega o próximo corte só quando o atual já está tocando. */}
      {comVideo && preCarregar && (
        <video key={`pre-${proximo}`} className="hidden" muted preload="auto" aria-hidden="true">
          <source src={trechos[proximo].webm} type="video/webm" />
          <source src={trechos[proximo].mp4} type="video/mp4" />
        </video>
      )}

      <p className="sr-only" aria-live="polite">
        {`Trecho ${(reduzirMovimento ? 0 : atual) + 1} de ${trechos.length}: ${trecho.nome}`}
      </p>

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-bg/80 to-transparent px-5 pt-10 pb-4">
        {mostrarControle && (
          <button
            type="button"
            onClick={() => setPausado((p) => !p)}
            aria-label={pausado ? "Continuar showreel" : "Pausar showreel"}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-text/60 text-text transition hover:border-accent"
          >
            {pausado ? <Play aria-hidden="true" size={18} strokeWidth={1.5} /> : <Pause aria-hidden="true" size={18} strokeWidth={1.5} />}
          </button>
        )}
        <div className="flex flex-1 gap-2" aria-hidden="true">
          {trechos.map((t, i) => (
            <div key={t.mp4} className={cx("h-[3px] flex-1", i === (reduzirMovimento ? 0 : atual) ? "bg-accent" : "bg-text/30")} />
          ))}
        </div>
      </div>
    </div>
  );
}
