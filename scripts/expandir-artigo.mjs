// node scripts/expandir-artigo.mjs <slug> <trecho.md> [marcador] [data]
// Insere um trecho (seções novas) em content/blog/<slug>.mdx antes do marcador
// (padrão: "## Perguntas frequentes"), atualiza updatedAt e mostra a contagem de palavras.
// Usado para aprofundar artigos já publicados sem perder links ativados pelos outros scripts.
import { dataPermitida } from "./hoje-sp.mjs";
import fs from "node:fs";
import matter from "gray-matter";

const [slug, arquivoTrecho, marcador = "## Perguntas frequentes", data] = process.argv.slice(2);
const destino = `content/blog/${slug}.mdx`;
const doc = matter(fs.readFileSync(destino, "utf8"));
const trecho = fs.readFileSync(arquivoTrecho, "utf8").trim() + "\n\n";
const i = doc.content.indexOf(marcador);
if (i < 0) throw new Error(`${slug}: marcador "${marcador}" não encontrado`);
const corpo = doc.content.slice(0, i) + trecho + doc.content.slice(i);
fs.writeFileSync(destino, matter.stringify(corpo, { ...doc.data, updatedAt: dataPermitida(data) }));
const palavras = corpo.split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
console.log(`${slug}: ${palavras} palavras`);
