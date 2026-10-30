// node scripts/fotos-home.mjs [pasta]   → gera public/portfolio/fotos/<id>.webp (3:2) das fotos marcadas "home" em data/fotos.json.
// Pasta padrão: materiais/Portifolio imagens (originais ficam fora do git).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const pasta = process.argv[2] ?? "materiais/Portifolio imagens";
const fotos = JSON.parse(fs.readFileSync("data/fotos.json", "utf8")).filter((f) => f.home);
fs.mkdirSync("public/portfolio/fotos", { recursive: true });
for (const f of fotos) {
  await sharp(path.join(pasta, f.arquivo))
    .rotate()
    .resize({ width: 1500, height: 1000, fit: "cover", position: sharp.strategy.attention })
    .webp({ quality: 74, effort: 5 })
    .toFile(`public/portfolio/fotos/${f.id}.webp`);
}
console.log(`${fotos.length} fotos da home geradas em public/portfolio/fotos/.`);
