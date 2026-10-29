// /clientes — logos e projetos de clientes (publicar só com autorização de cada cliente: docs/08).
import Image from "next/image";
import Link from "next/link";

import { CabecalhoInstitucional, metadataInstitucional } from "@/components/PaginaInstitucional";
import { Botao, Container } from "@/components/ui";
import { clientes, videos } from "@/lib/dados";

const DESCRICAO = "Empresas e eventos que já trabalharam com a IDA Produtora Audiovisual em vídeo, foto e cobertura de eventos.";

export const metadata = metadataInstitucional({ titulo: "Clientes | IDA Produtora", descricao: DESCRICAO, url: "/clientes" });

// O vídeo da Vert usa o logo da BR Auto Parts (docs/08).
const ALIAS: Record<string, string> = { "BR Auto Parts": "Vert", "Caioba Soccer Camp": "Caioba Soccer Camp", "MAM": "MAM São Paulo" };

export default function Clientes() {
  return (
    <>
      <CabecalhoInstitucional
        tipo="CollectionPage"
        url="/clientes"
        nome="Clientes"
        eyebrow="CLIENTES"
        h1="Clientes da IDA Produtora"
        descricao={DESCRICAO}
        intro={<p>Marcas, eventos e empresas que confiaram à IDA a produção de vídeo, foto e cobertura de eventos.</p>}
      />
      <Container className="pb-20">
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4 p-0">
          {clientes.map((c) => {
            const projetos = videos.filter((v) => v.cliente === c.nome || v.cliente === ALIAS[c.nome]);
            return (
              <li key={c.nome} className="flex flex-col gap-5 rounded-ida border border-surface p-7">
                <div className="flex h-16 items-center">
                  <Image src={c.destino} alt={c.nome} width={160} height={64} className="h-full w-auto max-w-[160px] object-contain" />
                </div>
                <div>
                  <h2 className="m-0 text-lg font-semibold">{c.nome}</h2>
                  {projetos.length > 0 && (
                    <ul className="m-0 mt-2 list-none p-0 text-sm text-muted">
                      {projetos.map((p) => (
                        <li key={p.youtubeId}>{p.projeto}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-[15px] text-muted">
          Veja os vídeos no <Link href="/portfolio">portfólio</Link>.
        </p>
      </Container>
      <section className="bg-surface">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-16">
          <p className="m-0 max-w-[620px] text-[22px] leading-snug font-bold">Sua empresa pode ser a próxima.</p>
          <Botao href="/orcamento">Pedir orçamento</Botao>
        </Container>
      </section>
    </>
  );
}
