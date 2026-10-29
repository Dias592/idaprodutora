// npm run indexnow — envia ao IndexNow (Bing, Yandex...) as URLs do sitemap alteradas desde o último envio.
// Rodar depois de cada deploy. Lê o sitemap publicado (ou SITEMAP_URL) e guarda o estado em .indexnow-estado.json.
//   npm run indexnow            → envia só o que mudou
//   npm run indexnow -- --todas → reenvia todas as URLs
//   npm run indexnow -- --teste → mostra o que seria enviado, sem enviar
import fs from "node:fs";
import path from "node:path";

const HOST = "idaprodutora.com.br";
const SITE = `https://${HOST}`;
const SITEMAP_URL = process.env.SITEMAP_URL ?? `${SITE}/sitemap.xml`;
const ARQUIVO_ESTADO = path.join(process.cwd(), ".indexnow-estado.json");

type Estado = { ultimoEnvio: string | null; urls: Record<string, string> };

function chave(): string {
  const arquivo = fs.readdirSync(path.join(process.cwd(), "public")).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
  if (!arquivo) throw new Error("Chave do IndexNow não encontrada em public/<chave>.txt");
  return arquivo.replace(/\.txt$/, "");
}

function lerEstado(): Estado {
  if (!fs.existsSync(ARQUIVO_ESTADO)) return { ultimoEnvio: null, urls: {} };
  return JSON.parse(fs.readFileSync(ARQUIVO_ESTADO, "utf8")) as Estado;
}

async function lerSitemap(): Promise<{ loc: string; lastmod: string }[]> {
  const resposta = await fetch(SITEMAP_URL);
  if (!resposta.ok) throw new Error(`Falha ao baixar ${SITEMAP_URL}: ${resposta.status}`);
  const xml = await resposta.text();
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, bloco]) => ({
    loc: /<loc>(.*?)<\/loc>/.exec(bloco)?.[1].trim() ?? "",
    lastmod: /<lastmod>(.*?)<\/lastmod>/.exec(bloco)?.[1].trim() ?? "",
  }));
}

async function main() {
  const args = process.argv.slice(2);
  const todas = args.includes("--todas");
  const teste = args.includes("--teste");

  const estado = lerEstado();
  const entradas = (await lerSitemap()).filter((e) => e.loc.startsWith(SITE));

  // Alterada = nova no sitemap ou com lastmod diferente do último envio.
  const alteradas = entradas.filter((e) => todas || estado.urls[e.loc] === undefined || estado.urls[e.loc] !== e.lastmod);

  if (!alteradas.length) {
    console.log("Nenhuma URL alterada desde o último envio.");
    return;
  }

  console.log(`${alteradas.length} URL(s) para enviar:`);
  alteradas.forEach((e) => console.log(`  ${e.loc}`));
  if (teste) return;

  const key = chave();
  // A API aceita até 10.000 URLs por chamada.
  for (let i = 0; i < alteradas.length; i += 10000) {
    const lote = alteradas.slice(i, i + 10000).map((e) => e.loc);
    const resposta = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList: lote }),
    });
    if (![200, 202].includes(resposta.status)) {
      throw new Error(`IndexNow respondeu ${resposta.status}: ${await resposta.text()}`);
    }
    console.log(`Lote enviado (${lote.length} URLs) — HTTP ${resposta.status}`);
  }

  const novoEstado: Estado = {
    ultimoEnvio: new Date().toISOString(),
    urls: Object.fromEntries(entradas.map((e) => [e.loc, e.lastmod])),
  };
  fs.writeFileSync(ARQUIVO_ESTADO, JSON.stringify(novoEstado, null, 2));
}

main().catch((erro) => {
  console.error(erro instanceof Error ? erro.message : erro);
  process.exit(1);
});
