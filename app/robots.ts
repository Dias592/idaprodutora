import type { MetadataRoute } from "next";

import { SITE } from "@/lib/schema";

// Mesmas regras de seo/robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/styleguide" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
