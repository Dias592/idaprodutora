// node scripts/publicar-artigo.mjs <rascunho.mdx> [data]
// Junta um rascunho (frontmatter com metaTitle/metaDescription + corpo MDX) ao arquivo de content/blog/<slug>.mdx,
// preservando o frontmatter do plano (títulos, slugs e palavras-chave não mudam) e marcando status "publicado".
// O slug vem do nome do rascunho. Valida os limites de docs/03 (title até 60, description até 155).
import { dataPermitida } from "./hoje-sp.mjs";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const [rascunho, dataArg] = process.argv.slice(2);
if (!rascunho) {
  console.error("Uso: node scripts/publicar-artigo.mjs <rascunho.mdx> [aaaa-mm-dd]");
  process.exit(1);
}

const slug = path.basename(rascunho, ".mdx");
const destino = path.join("content", "blog", `${slug}.mdx`);
if (!fs.existsSync(destino)) throw new Error(`Não existe ${destino} (slug fora do plano?)`);

const novo = matter(fs.readFileSync(rascunho, "utf8"));
const atual = matter(fs.readFileSync(destino, "utf8"));
const hoje = dataPermitida(dataArg);

const { metaTitle, metaDescription } = novo.data;
const erros = [];
if (!metaTitle || metaTitle.length > 60) erros.push(`metaTitle com ${metaTitle?.length ?? 0} caracteres (máx. 60)`);
if (!metaDescription || metaDescription.length > 155) erros.push(`metaDescription com ${metaDescription?.length ?? 0} caracteres (máx. 155)`);
if (erros.length) throw new Error(`${slug}: ${erros.join("; ")}`);

const data = {
  ...atual.data,
  status: "publicado",
  metaTitle,
  metaDescription,
  publishedAt: atual.data.publishedAt || hoje,
  updatedAt: hoje,
};

fs.writeFileSync(destino, matter.stringify(novo.content.trimStart(), data));
const palavras = novo.content
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  .replace(/<\/?[A-Za-z]+|\/?>|[{}[\]]|(pergunta|resposta|itens|urls|servico|youtubeId|titulo):/g, " ")
  .split(/\s+/)
  .filter((w) => /\p{L}/u.test(w)).length;
console.log(`${slug}: publicado (${palavras} palavras no corpo, title ${metaTitle.length}, description ${metaDescription.length})`);
