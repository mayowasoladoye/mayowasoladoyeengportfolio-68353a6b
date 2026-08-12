export type Area = {
  slug: string;
  name: string;
  tagline: string;
};

/** Sub-portfolios. Add new areas here — pages are generated automatically. */
export const areas: Area[] = [
  { slug: "engineering", name: "Process Engineering", tagline: "Chemical & process design, simulation and calculation tools." },
  { slug: "data-analytics", name: "Data Analytics", tagline: "Dashboards, reporting and insight from messy data." },
  { slug: "data-engineering", name: "Data Engineering", tagline: "Pipelines, warehouses and reliable data infrastructure." },
  { slug: "data-science", name: "Data Science", tagline: "Modelling, forecasting and applied machine learning." },
  { slug: "video-editing", name: "Video Editing", tagline: "Narrative cuts, motion graphics and post-production." },
  { slug: "music-production", name: "Music Production", tagline: "Beats, mixing and sound design." },
  { slug: "photography", name: "Photography", tagline: "Portraits, events and visual storytelling." },
  { slug: "social-media-management", name: "Social Media Management", tagline: "Content strategy, community and growth." },
];

export const getArea = (slug?: string) => areas.find((a) => a.slug === slug);
