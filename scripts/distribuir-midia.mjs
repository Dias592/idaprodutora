// node scripts/distribuir-midia.mjs videos            → sorteia 1 vídeo por artigo (os 110 do plano)
// node scripts/distribuir-midia.mjs fotos <pasta>     → sorteia 1 foto diferente por artigo e gera public/blog/capas/<slug>.webp
//
// Resultado em data/midia-blog.json: { "<slug>": { "video": "<youtubeId>", "capa": "/blog/capas/<slug>.webp" } }
// Regras dos vídeos (só existem 8 para 110 artigos, então eles se repetem):
//   - distribuição equilibrada (cada vídeo aparece ~o mesmo número de vezes);
//   - um artigo nunca repete o vídeo do seu pilar nem o dos irmãos que ele linka.
// Regras das fotos: cada foto é usada uma única vez (sem repetir). Pilares têm prioridade. Rodar de novo mantém o que já foi
// distribuído e usa só fotos novas — basta acrescentar fotos à pasta (ou ao data/fotos.json).
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
  // Fonte: data/fotos.json (id, arquivo relativo à pasta, alt). Fotos soltas fora do catálogo também entram, com alt genérico.
  if (!pasta || !fs.existsSync(pasta)) throw new Error("Informe a pasta das fotos: node scripts/distribuir-midia.mjs fotos <pasta>");
  const catalogo = fs.existsSync("data/fotos.json") ? JSON.parse(fs.readFileSync("data/fotos.json", "utf8")) : [];
  const noCatalogo = new Set(catalogo.map((f) => f.arquivo));
  const soltas = fs
    .readdirSync(pasta, { recursive: true })
    .map((f) => f.split(path.sep).join("/"))
    .filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f) && !noCatalogo.has(f))
    .map((f) => ({ id: f, arquivo: f, alt: "Foto de evento corporativo produzida pela IDA Produtora" }));
  const usadas = new Set(Object.values(midia).map((m) => m.origemCapa).filter(Boolean));
  const fotos = embaralhar([...catalogo, ...soltas].filter((f) => !usadas.has(f.id)));
  // Pilares primeiro: se faltar foto, quem fica sem capa são complementares.
  const semCapa = plano.filter((a) => !midia[a.slug]?.capa);
  const fila = [...embaralhar(semCapa.filter((a) => a.tipo === "pilar")), ...embaralhar(semCapa.filter((a) => a.tipo !== "pilar"))];
  if (fotos.length < fila.length) console.warn(`Atenção: ${fotos.length} fotos novas para ${fila.length} artigos sem capa. ${fila.length - fotos.length} complementares ficam sem foto até chegarem mais.`);
  fs.mkdirSync("public/blog/capas", { recursive: true });
  let geradas = 0;
  for (const [i, artigo] of fila.entries()) {
    const foto = fotos[i];
    if (!foto) break;
    const destino = `public/blog/capas/${artigo.slug}.webp`;
    await sharp(path.join(pasta, foto.arquivo))
      .rotate()
      .resize({ width: 1600, height: 900, fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: 74, effort: 5 })
      .toFile(destino);
    midia[artigo.slug] = { ...midia[artigo.slug], capa: `/blog/capas/${artigo.slug}.webp`, origemCapa: foto.id, altCapa: foto.alt };
    geradas++;
  }
  fs.writeFileSync(ARQUIVO, JSON.stringify(midia, null, 2) + "\n");
  console.log(`${geradas} capas geradas em public/blog/capas/.`);
} else if (modo === "fotos-home") {
  // Completa artigos sem capa reutilizando as fotos "home" do catálogo (autorizado pelo cliente).
  // Regras: uso equilibrado; nunca a mesma foto do pilar ou dos irmãos; cada reuso com enquadramento diferente.
  const base = pasta ?? "materiais/Portifolio imagens";
  const home = JSON.parse(fs.readFileSync("data/fotos.json", "utf8")).filter((f) => f.home);
  const usos = Object.fromEntries(home.map((f) => [f.id, 0]));
  for (const m of Object.values(midia)) if (m.origemCapa in usos) usos[m.origemCapa]++;
  const reenquadrar = [
    { zoom: 0.8, x: 0.0 }, // aproximado à esquerda
    { zoom: 0.8, x: 1.0 }, // aproximado à direita
    { zoom: 0.7, x: 0.5 }, // mais fechado, centro
  ];
  let geradas = 0;
  for (const pilar of plano.filter((a) => a.tipo === "pilar")) {
    const cluster = [pilar, ...pilar.complementares.map((u) => plano.find((a) => a.url === u))];
    for (const artigo of cluster) {
      if (midia[artigo.slug]?.capa) continue;
      const vizinhos = new Set([
        pilar.slug,
        ...(artigo.irmaos ?? []).map(slugDe),
        ...plano.filter((a) => (a.irmaos ?? []).includes(artigo.url)).map((a) => a.slug),
      ]);
      vizinhos.delete(artigo.slug);
      const proibidas = new Set([...vizinhos].map((s) => midia[s]?.origemCapa).filter(Boolean));
      const foto = embaralhar(home.filter((f) => !proibidas.has(f.id))).sort((a, b) => usos[a.id] - usos[b.id])[0];
      const r = reenquadrar[(usos[foto.id] - 1 + reenquadrar.length) % reenquadrar.length];
      const img = sharp(path.join(base, foto.arquivo)).rotate();
      const { data, info } = await img.toBuffer({ resolveWithObject: true });
      const w = Math.round(info.width * r.zoom);
      const h = Math.round(info.height * r.zoom);
      const left = Math.round((info.width - w) * r.x);
      const top = Math.round((info.height - h) / 2);
      const destino = `public/blog/capas/${artigo.slug}.webp`;
      await sharp(data)
        .extract({ left, top, width: w, height: h })
        .resize({ width: 1600, height: 900, fit: "cover", position: sharp.strategy.attention })
        .webp({ quality: 74, effort: 5 })
        .toFile(destino);
      midia[artigo.slug] = { ...midia[artigo.slug], capa: `/blog/capas/${artigo.slug}.webp`, origemCapa: foto.id, altCapa: foto.alt };
      usos[foto.id]++;
      geradas++;
    }
  }
  fs.writeFileSync(ARQUIVO, JSON.stringify(midia, null, 2) + "\n");
  console.log(`${geradas} capas geradas com fotos da home. Usos por foto:`, Object.values(usos).join(" "));
} else {
  console.error("Uso: node scripts/distribuir-midia.mjs videos | fotos <pasta> | fotos-home [pasta]");
  process.exit(1);
}
