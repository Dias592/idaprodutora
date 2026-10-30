// node scripts/distribuir-midia.mjs videos            → sorteia 1 vídeo por artigo (os 110 do plano)
// node scripts/distribuir-midia.mjs fotos <pasta>     → sorteia 1 foto diferente por artigo e gera public/blog/capas/<slug>.webp
//
// Resultado em data/midia-blog.json: { "<slug>": { "video": "<youtubeId>", "capa": "/blog/capas/<slug>.webp" } }
// Regras dos vídeos (só existem 8 para 110 artigos, então eles se repetem):
//   - distribuição equilibrada (cada vídeo aparece ~o mesmo número de vezes);
//   - um artigo nunca repete o vídeo do seu pilar nem o dos irmãos que ele linka.
// Regras das fotos: cada foto é usada uma única vez. Rodar de novo mantém o que já foi distribuído.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ARQUIVO = "data/midia-blog.json";
const plano = JSON.parse(fs.readFileSync("data/blog-plan.json", "utf8"));
const videos = JSON.parse(fs.readFileSync("data/videos.json", "utf8")).filter((v) => /^[\w-]{11}$/.test(v.youtubeId));
const midia = fs.existsSync(ARQUIVO) ? JSON.parse(fs.readFileSync(ARQUIVO, "utf8")) : {};
const embaralhar = (lista) => {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const slugDe = (url) => url.replace(/^\/blog\//, "");

const [modo, pasta] = process.argv.slice(2);

if (modo === "videos") {
  const usos = Object.fromEntries(videos.map((v) => [v.youtubeId, 0]));
  for (const m of Object.values(midia)) if (m.video && m.video in usos) usos[m.video]++;

  for (const pilar of plano.filter((a) => a.tipo === "pilar")) {
    const cluster = [pilar, ...pilar.complementares.map((u) => plano.find((a) => a.url === u))];
    for (const artigo of cluster) {
      if (midia[artigo.slug]?.video) continue;
      // Vizinhos: pilar do cluster, irmãos que o artigo linka e quem linka o artigo como irmão.
      const vizinhos = new Set([
        pilar.slug,
        ...(artigo.irmaos ?? []).map(slugDe),
        ...plano.filter((a) => (a.irmaos ?? []).includes(artigo.url)).map((a) => a.slug),
      ]);
      vizinhos.delete(artigo.slug);
      const proibidos = new Set([...vizinhos].map((s) => midia[s]?.video).filter(Boolean));
      const candidatos = embaralhar(videos.map((v) => v.youtubeId).filter((id) => !proibidos.has(id)));
      const escolhido = candidatos.sort((a, b) => usos[a] - usos[b])[0];
      midia[artigo.slug] = { ...midia[artigo.slug], video: escolhido };
      usos[escolhido]++;
    }
  }
  fs.writeFileSync(ARQUIVO, JSON.stringify(midia, null, 2) + "\n");
  console.log("Vídeos distribuídos:", Object.entries(usos).map(([id, n]) => `${videos.find((v) => v.youtubeId === id).cliente}: ${n}`).join(" · "));
} else if (modo === "fotos") {
  if (!pasta || !fs.existsSync(pasta)) throw new Error("Informe a pasta das fotos: node scripts/distribuir-midia.mjs fotos <pasta>");
  const usadas = new Set(Object.values(midia).map((m) => m.origemCapa).filter(Boolean));
  const fotos = embaralhar(
    fs.readdirSync(pasta).filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f) && !usadas.has(f)),
  );
  const semCapa = plano.filter((a) => !midia[a.slug]?.capa);
  if (fotos.length < semCapa.length) console.warn(`Atenção: ${fotos.length} fotos novas para ${semCapa.length} artigos sem capa. Os restantes ficam sem foto.`);
  fs.mkdirSync("public/blog/capas", { recursive: true });
  for (const [i, artigo] of semCapa.entries()) {
    const foto = fotos[i];
    if (!foto) break;
    const destino = `public/blog/capas/${artigo.slug}.webp`;
    await sharp(path.join(pasta, foto)).rotate().resize({ width: 1600, height: 900, fit: "cover" }).webp({ quality: 80 }).toFile(destino);
    midia[artigo.slug] = { ...midia[artigo.slug], capa: `/blog/capas/${artigo.slug}.webp`, origemCapa: foto };
  }
  fs.writeFileSync(ARQUIVO, JSON.stringify(midia, null, 2) + "\n");
  console.log(`${Math.min(fotos.length, semCapa.length)} capas geradas em public/blog/capas/.`);
} else {
  console.error("Uso: node scripts/distribuir-midia.mjs videos | fotos <pasta>");
  process.exit(1);
}
