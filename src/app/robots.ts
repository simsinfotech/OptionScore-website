import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/academy",
          "/workshop",
          "/master-class",
          "/contact",
          "/privacy-policy",
          "/terms",
          "/refund-policy",
          "/shipping-policy",
        ],
        disallow: [
          "/workshop/offer",
          "/workshop/confirmed",
          "/master-class/offer",
          "/master-class/confirmed",
          "/account-deletion",
        ],
      },
    ],
    sitemap: "https://optionscore.app/sitemap.xml",
  };
}
