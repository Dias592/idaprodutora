// /termos — termos de uso do site.
import Link from "next/link";

import { CabecalhoInstitucional, metadataInstitucional } from "@/components/PaginaInstitucional";
import { Container } from "@/components/ui";

const DESCRICAO = "Termos de uso do site da IDA Produtora Audiovisual: conteúdo, orçamentos, vídeos de portfólio e links externos.";

export const metadata = metadataInstitucional({ titulo: "Termos de uso | IDA Produtora", descricao: DESCRICAO, url: "/termos" });

export default function Termos() {
  return (
    <>
      <CabecalhoInstitucional
        tipo="WebPage"
        url="/termos"
        nome="Termos de uso"
        eyebrow="TERMOS"
        h1="Termos de uso"
        descricao={DESCRICAO}
        intro={<p>Atualizados em 29 de outubro de 2026.</p>}
      />
      <Container className="pb-24">
        <div className="prosa">
          <p>
            Ao usar o site <strong>idaprodutora.com.br</strong>, você concorda com estes termos. Se não concordar, recomendamos não utilizar o
            site.
          </p>

          <h2>Sobre o site</h2>
          <p>
            Este site apresenta os serviços da IDA Produtora Audiovisual, produtora corporativa de São Paulo, e permite pedir orçamentos pelo
            WhatsApp. As informações têm caráter informativo e podem mudar sem aviso.
          </p>

          <h2>Orçamentos</h2>
          <p>
            O envio de um pedido pelo formulário ou pelo WhatsApp não cria contrato nem obrigação para nenhuma das partes. Valores, prazos e
            entregas só valem depois de aprovados por escrito, em proposta ou contrato específico do projeto.
          </p>

          <h2>Conteúdo e propriedade intelectual</h2>
          <p>
            Textos, marca, logotipos, layout e materiais do site pertencem à IDA Produtora Audiovisual ou são usados com autorização. Os vídeos e
            as marcas de clientes exibidos no portfólio pertencem aos respectivos titulares e aparecem aqui com o objetivo de apresentar o trabalho
            da IDA. Não é permitido copiar, baixar, redistribuir ou usar esse conteúdo sem autorização.
          </p>

          <h2 id="uso-de-imagens">Uso de fotos e vídeos</h2>
          <p>
            As fotos e os vídeos do portfólio e do blog foram produzidos pela IDA Produtora Audiovisual em trabalhos para clientes. As pessoas,
            marcas e locais que aparecem neles pertencem aos respectivos titulares. Não é permitido copiar, baixar, editar ou publicar essas
            imagens sem autorização. Para pedir autorização de uso, fale com a IDA pela <Link href="/contato">página de contato</Link>.
          </p>

          <h2>Blog</h2>
          <p>
            Os artigos do blog trazem orientações gerais sobre produção audiovisual. Eles não substituem consultoria jurídica, técnica ou
            regulatória específica. Regras de órgãos públicos, como as de voo com drone, podem mudar: confira sempre a fonte oficial.
          </p>

          <h2>Links externos</h2>
          <p>
            O site tem links para serviços de terceiros, como WhatsApp, YouTube e Instagram, e para sites oficiais. A IDA não é responsável pelo
            conteúdo ou pelas políticas desses serviços.
          </p>

          <h2>Privacidade</h2>
          <p>
            O tratamento de dados pessoais está descrito na <Link href="/politica-de-privacidade">política de privacidade</Link>.
          </p>

          <h2>Alterações e legislação</h2>
          <p>
            Estes termos podem ser atualizados a qualquer momento, e a data da última atualização fica no topo da página. Eles são regidos pela
            legislação brasileira.
          </p>
        </div>
      </Container>
    </>
  );
}
