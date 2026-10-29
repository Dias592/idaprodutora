import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IDA Produtora Audiovisual",
    short_name: "IDA Produtora",
    description: "Produtora audiovisual corporativa em São Paulo.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0B0B",
    theme_color: "#0B0B0B",
    lang: "pt-BR",
    icons: [
      { src: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
