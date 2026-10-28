import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const site = "https://adityabaniya.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site}/projects/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
