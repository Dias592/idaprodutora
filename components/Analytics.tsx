// GA4 via next/script com lazyOnload (docs/03). Só carrega quando NEXT_PUBLIC_GA_ID estiver definido.
// No painel do GA4, desligar Enhanced Measurement → Outbound clicks (docs/07), senão a URL do wa.me
// com o texto do cliente vai parar no relatório.
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // [PREENCHER: ID do GA4, ex. G-XXXXXXXXXX]

export function Analytics() {
  if (!GA_ID || !/^G-[A-Z0-9]+$/.test(GA_ID)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="ga4" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
