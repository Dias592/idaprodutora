import type { MetadataRoute } from "next";

import { SITE } from "@/lib/schema";

// Regras de seo/robots.txt. /styleguide não é citada: em produção ela responde 404.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
