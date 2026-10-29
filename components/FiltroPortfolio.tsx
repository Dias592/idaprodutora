"use client";
// Grade do /portfolio com filtro por serviço (botões com aria-pressed).
import { useState } from "react";

import { VideoFacade } from "@/components/VideoFacade";
import { cx } from "@/components/ui";

type ItemPortfolio = { youtubeId: string; cliente: string; projeto: string; thumbnail?: string; servicos: string[] };

export function FiltroPortfolio({ videos, filtros }: { videos: ItemPortfolio[]; filtros: { url: string; nome: string }[] }) {
  const [ativo, setAtivo] = useState<string | null>(null);
  const visiveis = ativo ? videos.filter((v) => v.servicos.includes(ativo)) : videos;

  return (
    <>
      <div role="group" aria-label="Filtrar por serviço" className="mb-10 flex flex-wrap gap-2">
        {[{ url: null, nome: "Todos" }, ...filtros].map((f) => (
          <button
            key={f.url ?? "todos"}
            type="button"
            aria-pressed={ativo === f.url}
            onClick={() => setAtivo(f.url)}
            className={cx(
              "min-h-11 rounded-ida border px-4 text-sm font-semibold transition",
              ativo === f.url ? "border-accent bg-surface text-text" : "border-surface text-muted hover:border-accent hover:text-text",
            )}
          >
            {f.nome}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visiveis.length} vídeo(s) exibido(s)
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-x-4 gap-y-8">
        {visiveis.map((v) => (
          <figure key={v.youtubeId} className="m-0 flex flex-col gap-3">
            <VideoFacade youtubeId={v.youtubeId} titulo={`${v.cliente} · ${v.projeto}`} thumbnail={v.thumbnail} />
            <figcaption className="text-sm text-muted">
              <strong className="font-semibold text-text">{v.cliente}</strong> · {v.projeto}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
