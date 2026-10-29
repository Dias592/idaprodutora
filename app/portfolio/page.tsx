// /portfolio — todos os vídeos de data/videos.json, com filtro por serviço. CollectionPage + ItemList de VideoObject.
import { CabecalhoInstitucional, metadataInstitucional } from "@/components/PaginaInstitucional";
import { FiltroPortfolio } from "@/components/FiltroPortfolio";
import { dadosVideoSchema } from "@/components/secoes";
import { Botao, Container } from "@/components/ui";
import { servicoPorUrl } from "@/lib/catalogo";
import { videos } from "@/lib/dados";
import { listaVideos } from "@/lib/schema";

const DESCRICAO = "Portfólio da IDA Produtora: vídeos institucionais, convenções, feiras e eventos corporativos produzidos em São Paulo.";

export const metadata = metadataInstitucional({ titulo: "Portfólio de vídeos | IDA Produtora", descricao: DESCRICAO, url: "/portfolio" });

export default function Portfolio() {
  const validos = videos.filter((v) => /^[\w-]{11}$/.test(v.youtubeId));
  const urls = [...new Set(validos.flatMap((v) => v.servicos))];
  const filtros = urls.map((url) => ({ url, nome: servicoPorUrl(url)?.nome ?? url }));

  return (
    <>
      <CabecalhoInstitucional
        tipo="CollectionPage"
        url="/portfolio"
        nome="Portfólio"
        eyebrow="PORTFÓLIO"
        h1="Portfólio de vídeos da IDA Produtora"
        descricao={DESCRICAO}
        schemaExtra={[listaVideos(validos.map(dadosVideoSchema))]}
        intro={<p>Trabalhos reais para empresas e eventos. Clique no vídeo para assistir aqui mesmo, sem sair do site.</p>}
      />
      <Container className="pb-20">
        <FiltroPortfolio
          videos={validos.map((v) => ({ youtubeId: v.youtubeId, cliente: v.cliente, projeto: v.projeto, thumbnail: v.thumbnail, servicos: v.servicos }))}
          filtros={filtros}
        />
      </Container>
      <section className="bg-surface">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-16">
          <p className="m-0 max-w-[620px] text-[22px] leading-snug font-bold">Quer um vídeo assim para a sua empresa?</p>
          <Botao href="/orcamento">Pedir orçamento</Botao>
        </Container>
      </section>
    </>
  );
}
