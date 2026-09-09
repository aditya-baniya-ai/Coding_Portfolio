import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://adityabaniya.netlify.app",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
