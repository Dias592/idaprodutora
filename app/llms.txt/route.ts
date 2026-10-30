// llms.txt gerado no build a partir de seo/llms.txt, com a seção "Guias" trocada pelos pilares publicados.
import fs from "node:fs";
import path from "node:path";

import { SITE } from "@/lib/schema";
import { pilaresPublicados } from "@/lib/content";
import { INSTAGRAM } from "@/lib/redes";

export const dynamic = "force-static";

export function GET() {
  const modelo = fs.readFileSync(path.join(process.cwd(), "seo", "llms.txt"), "utf8");
  const pilares = pilaresPublicados();
  const guias = pilares.length
    ? pilares.map((p) => `- [${p.titulo}](${SITE}${p.url}): ${p.pergunta}`).join("\n")
    : "- Em breve.";
  let texto = modelo.replace(/<!--[\s\S]*?-->/, guias);
  // Perfil ainda não criado: some do llms.txt (lib/redes.ts).
  texto = INSTAGRAM ? texto.replace("https://instagram.com/idaprodutora", INSTAGRAM.url) : texto.replace(/^- Instagram:.*\r?\n/m, "");
  return new Response(texto, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
