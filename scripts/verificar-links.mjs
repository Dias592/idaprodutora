// node scripts/verificar-links.mjs [base]  (padrão: http://localhost:3123)
// Rastreia o site a partir do sitemap, segue todos os links internos e lista os que não respondem 200.
// Também confere: 1 H1 por página, title, meta description e JSON-LD válido.
const BASE = process.argv[2] ?? "http://localhost:3123";
const SITE = "https://idaprodutora.com.br";

const paraLocal = (u) => u.replace(SITE, BASE);
const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const fila = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(paraLocal(m[1])).pathname);
const visitados = new Map();
const origens = new Map();
const problemas = [];

while (fila.length) {
  const caminho = fila.shift();
  if (visitados.has(caminho)) continue;
  const r = await fetch(BASE + caminho, { redirect: "manual" });
  visitados.set(caminho, r.status);
  if (r.status !== 200 || !(r.headers.get("content-type") ?? "").includes("text/html")) continue;
  const html = await r.text();

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) problemas.push(`${caminho}: ${h1} H1`);
  if (!/<title>[^<]+<\/title>/.test(html)) problemas.push(`${caminho}: sem <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) problemas.push(`${caminho}: sem meta description`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      problemas.push(`${caminho}: JSON-LD inválido`);
    }
  }

  for (const [, href] of html.matchAll(/<a [^>]*href="([^"#?]*)[^"]*"/g)) {
    if (!href || /^(https?:|mailto:|tel:)/.test(href)) {
      if (href.startsWith(SITE)) fila.push(new URL(href).pathname);
      continue;
    }
    const alvo = href.replace(/\/$/, "") || "/";
    if (!origens.has(alvo)) origens.set(alvo, caminho);
    if (!visitados.has(alvo)) fila.push(alvo);
  }
}

const quebrados = [...visitados].filter(([, s]) => s !== 200);
console.log(`${visitados.size} URLs verificadas.`);
for (const [u, s] of quebrados) console.log(`  ${s}  ${u}  (link em ${origens.get(u) ?? "sitemap"})`);
for (const p of problemas) console.log(`  ! ${p}`);
if (!quebrados.length && !problemas.length) console.log("Nenhum link quebrado. Todas as páginas com 1 H1, title, description e JSON-LD válido.");
process.exit(quebrados.length || problemas.length ? 1 : 0);
