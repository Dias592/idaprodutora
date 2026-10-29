"use client";
// Vídeo de portfólio com fachada leve (CLAUDE.md regra 8, docs/03):
// mostra só a thumbnail com o play da IDA; o player youtube-nocookie entra no clique e toca dentro do site.
// Quando o vídeo termina, a fachada volta (assim a grade de "vídeos sugeridos" do YouTube não aparece).
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cx } from "@/components/ui";

const ORIGEM_YT = "https://www.youtube-nocookie.com";

export type VideoFacadeProps = {
  youtubeId: string;
  titulo: string;
  thumbnail?: string; // "maxresdefault" | "sddefault" | "hqdefault"
  prioridade?: boolean;
  sizes?: string;
  className?: string;
};

export function VideoFacade({
  youtubeId,
  titulo,
  thumbnail = "maxresdefault",
  prioridade = false,
  sizes = "(min-width: 1240px) 600px, (min-width: 768px) 50vw, 100vw",
  className,
}: VideoFacadeProps) {
  const [tocando, setTocando] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const valido = /^[\w-]{11}$/.test(youtubeId);

  // Ouve o estado do player pela API de postMessage do YouTube (sem carregar o script da API).
  useEffect(() => {
    if (!tocando) return;
    const aoReceber = (e: MessageEvent) => {
      if (e.origin !== ORIGEM_YT || e.source !== iframeRef.current?.contentWindow) return;
      try {
        const dados = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        // playerState 0 = terminou
        if (dados?.event === "onStateChange" && dados.info === 0) setTocando(false);
        if (dados?.event === "infoDelivery" && dados.info?.playerState === 0) setTocando(false);
      } catch {
        /* mensagens que não são do player */
      }
    };
    window.addEventListener("message", aoReceber);
    return () => window.removeEventListener("message", aoReceber);
  }, [tocando]);

  const aoCarregarIframe = () => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: youtubeId }), ORIGEM_YT);
  };

  const params = new URLSearchParams({ autoplay: "1", rel: "0", playsinline: "1", enablejsapi: "1", iv_load_policy: "3" });

  return (
    <div className={cx("relative aspect-video overflow-hidden rounded-ida bg-bg", className)}>
      {tocando ? (
        <iframe
          ref={iframeRef}
          onLoad={aoCarregarIframe}
          src={`${ORIGEM_YT}/embed/${youtubeId}?${params}`}
          title={titulo}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => valido && setTocando(true)}
          disabled={!valido}
          aria-label={`Assistir: ${titulo}`}
          className="group absolute inset-0 flex size-full items-center justify-center"
        >
          {valido && (
            <Image
              src={`https://i.ytimg.com/vi/${youtubeId}/${thumbnail}.jpg`}
              alt=""
              fill
              sizes={sizes}
              priority={prioridade}
              // maxresdefault já é 16:9; as versões menores (sd/hq) são 4:3 com tarjas pretas embutidas,
              // então "cover" corta só as tarjas da miniatura (o vídeo em si continua sem recorte).
              className={cx(
                "transition duration-300 group-hover:scale-[1.02] group-hover:brightness-75",
                thumbnail === "maxresdefault" ? "object-contain" : "object-cover",
              )}
            />
          )}
          <span className="relative flex size-[72px] items-center justify-center rounded-full border-2 border-accent bg-bg/60 transition group-hover:bg-accent">
            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" className="fill-accent transition group-hover:fill-accent-contrast">
              <path d="M8 5l12 7-12 7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
