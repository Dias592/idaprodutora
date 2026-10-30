// Capa e vídeo de cada artigo (data/midia-blog.json, gerado por scripts/distribuir-midia.mjs).
import fs from "node:fs";
import path from "node:path";

import midiaJson from "@/data/midia-blog.json";
import { videos, type Video } from "@/lib/dados";

type Midia = { video?: string; capa?: string };
const midia = midiaJson as Record<string, Midia>;

/** Capa só existe quando o arquivo foi gerado em public/ (até as fotos chegarem, o artigo fica sem capa). */
export function capaDoArtigo(slug: string): string | undefined {
  const capa = midia[slug]?.capa;
  return capa && fs.existsSync(path.join(process.cwd(), "public", capa)) ? capa : undefined;
}

export function videoDoArtigo(slug: string): Video | undefined {
  const id = midia[slug]?.video;
  return id ? videos.find((v) => v.youtubeId === id) : undefined;
}
