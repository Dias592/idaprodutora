// node scripts/ativar-links-pilar.mjs [data]
// Para cada complementar publicado, insere no pilar correspondente o link "Leia o guia completo: <título>"
// no fim do H2 daquele complementar (docs/04: complementar publicado → pilar atualizado no mesmo commit).
// Os H2 do pilar seguem a ordem de `complementares` no plano, depois do primeiro H2 (contexto).
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const hoje = process.argv[2] ?? new Date().toISOString().slice(0, 10);
const plano = JSON.parse(fs.readFileSync("data/blog-plan.json", "utf8"));
const status = (slug) => matter(fs.readFileSync(path.join("content/blog", `${slug}.mdx`), "utf8")).data.status;

for (const pilar of plano.filter((a) => a.tipo === "pilar")) {
  const arquivo = path.join("content/blog", `${pilar.slug}.mdx`);
  const doc = matter(fs.readFileSync(arquivo, "utf8"));
  if (doc.data.status !== "publicado") continue;

  let corpo = doc.content;
  let mudou = false;
  pilar.complementares.forEach((url, i) => {
    const comp = plano.find((a) => a.url === url);
    if (!comp || status(comp.slug) !== "publicado" || corpo.includes(`](${url})`)) return;

    // Localiza o (i+2)-ésimo H2 (o 1º é o contexto) e o fim da seção.
    const h2s = [...corpo.matchAll(/^## .+$/gm)];
    const secao = h2s[i + 1];
    if (!secao) return console.warn(`${pilar.slug}: H2 ${i + 2} não encontrado para ${url}`);
    const fim = h2s[i + 2]?.index ?? corpo.length;
    const trecho = corpo.slice(secao.index, fim);
    // Insere antes de um componente que feche a seção (CTA ou vídeo), senão no fim do texto da seção.
    const comp1 = trecho.search(/^<(CtaWhatsApp|VideoFacade)/m);
    const pos = secao.index + (comp1 > -1 ? comp1 : trecho.trimEnd().length);
    const link = `Leia o guia completo: [${comp.titulo}](${url}).\n\n`;
    corpo = corpo.slice(0, pos).trimEnd() + "\n\n" + link + corpo.slice(pos).trimStart();
    mudou = true;
    console.log(`${pilar.slug}: link ativado para ${url}`);
  });

  if (mudou) fs.writeFileSync(arquivo, matter.stringify(corpo, { ...doc.data, updatedAt: hoje }));
}
