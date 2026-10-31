// /portfolio — vídeos (data/videos.json, com filtro por serviço) e fotos (data/fotos.json, com visualizador).
// CollectionPage + ItemList de VideoObject + ImageGallery.
import { CabecalhoInstitucional, metadataInstitucional } from "@/components/PaginaInstitucional";
import { FiltroPortfolio } from "@/components/FiltroPortfolio";
import { GaleriaFotos } from "@/components/GaleriaFotos";
import { dadosVideoSchema } from "@/components/secoes";
import { Botao, Container } from "@/components/ui";
import { servicoPorUrl } from "@/lib/catalogo";
import { fotosPortfolio, videos } from "@/lib/dados";
import { galeriaImagens, listaVideos } from "@/lib/schema";

const DESCRICAO = "Portfólio da IDA Produtora: vídeos institucionais, convenções, feiras e fotografia de eventos corporativos produzidos em São Paulo.";

export const metadata = metadataInstitucional({ titulo: "Portfólio de vídeos e fotos | IDA Produtora", descricao: DESCRICAO, url: "/portfolio" });

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
        h1="Portfólio de vídeos e fotos da IDA Produtora"
        descricao={DESCRICAO}
        schemaExtra={[
          listaVideos(validos.map(dadosVideoSchema)),
          galeriaImagens({ nome: "Fotografia de eventos corporativos", url: "/portfolio", fotos: fotosPortfolio }),
        ]}
        intro={
          <p>
            Trabalhos reais para empresas e eventos. Clique no vídeo para assistir aqui mesmo, sem sair do site. Mais abaixo, a{" "}
            <a href="#fotos">fotografia de eventos</a>: clique na foto para ampliar.
          </p>
        }
      />
      <Container className="pb-20">
        <FiltroPortfolio
          videos={validos.map((v) => ({ youtubeId: v.youtubeId, cliente: v.cliente, projeto: v.projeto, thumbnail: v.thumbnail, servicos: v.servicos }))}
          filtros={filtros}
        />
      </Container>
      <section id="fotos" aria-labelledby="fotos-titulo" className="scroll-mt-24 border-t border-surface">
        <Container className="py-16">
          <GaleriaFotos titulo="Fotografia de eventos corporativos" nivelTitulo="h2" idTitulo="fotos-titulo" fotos={fotosPortfolio} inicial={24} filtrarPorEvento />
        </Container>
      </section>
      <section className="bg-surface">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-16">
          <p className="m-0 max-w-[620px] text-[22px] leading-snug font-bold">Quer um vídeo assim para a sua empresa?</p>
          <Botao href="/orcamento">Pedir orçamento</Botao>
        </Container>
      </section>
    </>
  );
}
