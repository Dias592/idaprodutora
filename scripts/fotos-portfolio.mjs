// node scripts/fotos-portfolio.mjs [pasta]   → versões otimizadas das fotos de data/fotos.json:
//   public/portfolio/fotos/<id>.webp            miniatura 3:2 (recorte inteligente) para as grades da home e do /portfolio
//   public/portfolio/fotos/ampliadas/<id>.webp  foto inteira, sem recorte, até 1800 px no lado maior (visualizador)
// Grava largura/altura da ampliada em data/fotos.json. Pasta padrão: materiais/Portifolio imagens (originais fora do git).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const pasta = process.argv[2] ?? "materiais/Portifolio imagens";
const fotos = JSON.parse(fs.readFileSync("data/fotos.json", "utf8"));
fs.mkdirSync("public/portfolio/fotos/ampliadas", { recursive: true });
for (const f of fotos) {
  const origem = path.join(pasta, f.arquivo);
  const miniatura = `public/portfolio/fotos/${f.id}.webp`;
  const ampliada = `public/portfolio/fotos/ampliadas/${f.id}.webp`;
  if (!fs.existsSync(miniatura)) {
    await sharp(origem)
      .rotate()
      .resize({ width: 1500, height: 1000, fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: 74, effort: 5 })
      .toFile(miniatura);
  }
  if (!fs.existsSync(ampliada)) {
    await sharp(origem).rotate().resize({ width: 1800, height: 1800, fit: "inside" }).webp({ quality: 74, effort: 5 }).toFile(ampliada);
  }
  const { width, height } = await sharp(ampliada).metadata();
  Object.assign(f, { largura: width, altura: height });
}
fs.writeFileSync("data/fotos.json", JSON.stringify(fotos, null, 1) + "\n");
console.log(`${fotos.length} fotos prontas em public/portfolio/fotos/ (miniaturas e ampliadas).`);
