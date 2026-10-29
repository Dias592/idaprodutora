import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

import { SITE, grafo, organizacao } from "@/lib/schema";
import { home } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BotaoWhatsAppFlutuante } from "@/components/whatsapp";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/ui";
import "./globals.css";

// next/font baixa a fonte no build e serve do próprio domínio (sem chamada externa).
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: home.title, template: "%s" },
  description: home.description,
  applicationName: "IDA Produtora Audiovisual",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "IDA Produtora Audiovisual",
    url: SITE,
    title: home.title,
    description: home.description,
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: "IDA Produtora Audiovisual" }],
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
    images: ["/brand/og-image.png"],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-bg font-sans text-text">
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-ida bg-accent px-4 py-3 font-bold text-accent-contrast focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <JsonLd dados={grafo([organizacao()])} />
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <BotaoWhatsAppFlutuante />
        <Analytics />
      </body>
    </html>
  );
}
