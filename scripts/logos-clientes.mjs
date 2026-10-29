// node scripts/logos-clientes.mjs
// Trata os logos de materiais/clientes/ (docs/08-materiais.md): remove o fundo, converte para branco
// com transparência, recorta a sobra e exporta public/clientes/<nome>.webp (caixa 2x de 140 × 56 px).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const clientes = JSON.parse(fs.readFileSync("data/clientes.json", "utf8"));
const ORIGEM = "materiais/clientes";
const DESTINO = "public";
const LIMIAR = 18; // diferença mínima para o fundo virar transparente (ruído de compressão)

fs.mkdirSync(path.join(DESTINO, "clientes"), { recursive: true });

for (const c of clientes) {
  const { data, info } = await sharp(path.join(ORIGEM, c.arquivo)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const fundo = [data[0], data[1], data[2]]; // cor do canto superior esquerdo = fundo
  const saida = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const dist = Math.max(Math.abs(data[i] - fundo[0]), Math.abs(data[i + 1] - fundo[1]), Math.abs(data[i + 2] - fundo[2]));
    const alfa = dist <= LIMIAR ? 0 : Math.min(255, Math.round(((dist - LIMIAR) / 110) * 255));
    saida[j] = saida[j + 1] = saida[j + 2] = 255;
    saida[j + 3] = alfa;
  }

  const arquivo = path.join(DESTINO, c.destino);
  await sharp(saida, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ width: 280, height: 112, fit: "inside" })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(arquivo);

  const meta = await sharp(arquivo).metadata();
  console.log(`${c.nome.padEnd(20)} → ${c.destino} (${meta.width}×${meta.height})`);
}
