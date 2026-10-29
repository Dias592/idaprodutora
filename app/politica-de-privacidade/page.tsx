// /politica-de-privacidade — LGPD: o formulário não armazena dados, abre o WhatsApp; GA4 sem dados pessoais.
import { CabecalhoInstitucional, metadataInstitucional } from "@/components/PaginaInstitucional";
import { Container } from "@/components/ui";
import { WHATSAPP_EXIBICAO, WHATSAPP_URL } from "@/lib/whatsapp";

const DESCRICAO = "Como a IDA Produtora trata dados pessoais no site: o formulário não armazena dados e abre uma conversa no WhatsApp.";

export const metadata = metadataInstitucional({ titulo: "Política de privacidade | IDA Produtora", descricao: DESCRICAO, url: "/politica-de-privacidade" });

export default function PoliticaDePrivacidade() {
  return (
    <>
      <CabecalhoInstitucional
        tipo="WebPage"
        url="/politica-de-privacidade"
        nome="Política de privacidade"
        eyebrow="LGPD"
        h1="Política de privacidade"
        descricao={DESCRICAO}
        intro={<p>Atualizada em 29 de outubro de 2026.</p>}
      />
      <Container className="pb-24">
        <div className="prosa">
          <p>
            Esta política explica como o site <strong>idaprodutora.com.br</strong>, da IDA Produtora Audiovisual, trata dados pessoais, de acordo
            com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, LGPD).
          </p>

          <h2>Resumo</h2>
          <ul>
            <li>O site não tem cadastro, login nem banco de dados de visitantes.</li>
            <li>O formulário de orçamento não armazena nada: ele monta uma mensagem no seu navegador e abre o WhatsApp.</li>
            <li>Os dados que você envia pelo WhatsApp são usados só para responder ao seu pedido de orçamento.</li>
          </ul>

          <h2>Formulário de orçamento</h2>
          <p>
            Ao preencher o formulário e clicar em “Enviar pelo WhatsApp”, o seu navegador monta o texto da mensagem com os campos preenchidos
            (nome, empresa, serviço, data, local e descrição) e abre uma conversa com a IDA no WhatsApp. Nenhuma dessas informações é gravada no
            site. A mensagem só é enviada se você confirmar o envio no próprio WhatsApp.
          </p>
          <p>
            A partir daí, a conversa acontece no WhatsApp, serviço da Meta, que tem política de privacidade própria. A IDA usa os dados recebidos
            na conversa apenas para responder ao orçamento e conduzir o projeto, se ele for contratado.
          </p>

          <h2>Medição de audiência</h2>
          <p>
            O site pode usar o Google Analytics 4 para entender, de forma agregada, quantas pessoas visitam as páginas e quantos pedidos de
            orçamento são iniciados. Nesses registros, enviamos apenas o tipo de serviço e a página de origem, nunca nome, empresa ou a descrição do
            projeto. Quando ativada, essa medição usa cookies do Google, que podem ser bloqueados nas configurações do seu navegador.
          </p>

          <h2>Vídeos do YouTube</h2>
          <p>
            Os vídeos do portfólio ficam hospedados no YouTube. Para proteger sua privacidade, o player só é carregado quando você clica no vídeo,
            e usa o domínio youtube-nocookie.com. Ao assistir, o YouTube pode coletar dados de acordo com a política de privacidade do Google.
          </p>

          <h2>Registros técnicos</h2>
          <p>
            Como todo site, a hospedagem registra dados técnicos de acesso, como endereço IP, data, hora e página acessada, para segurança e
            funcionamento do serviço. Esses registros não são usados para identificar visitantes.
          </p>

          <h2>Seus direitos</h2>
          <p>
            Pela LGPD, você pode pedir confirmação de tratamento, acesso, correção ou exclusão dos seus dados pessoais que estejam com a IDA, por
            exemplo em conversas de orçamento. Para isso, fale com a gente pelo WhatsApp{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener">
              {WHATSAPP_EXIBICAO}
            </a>
            .
          </p>

          <h2>Uso de imagem em produções</h2>
          <p>
            Fotos e vídeos produzidos pela IDA para clientes seguem as autorizações de uso de imagem combinadas com cada contratante. Se você
            aparece em um material publicado neste site e quer falar sobre ele, entre em contato pelo WhatsApp.
          </p>

          <h2>Alterações</h2>
          <p>Esta política pode ser atualizada. A data da última atualização fica sempre no topo da página.</p>
        </div>
      </Container>
    </>
  );
}
