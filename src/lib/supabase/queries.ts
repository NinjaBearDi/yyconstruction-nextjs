import { createClient } from "@supabase/supabase-js";
import { getStorageUrl } from "./storage";

// Use anon key for public reads — no auth required
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/** Shape of a row in the `projects` table */
export interface ProjectRow {
  id: number;
  slug: string;
  title_en: string;
  title_zh: string;
  description_en: string;
  description_zh: string;
  category: "commercial" | "residential";
  location_en: string;
  location_zh: string;
  year: string;
  featured_image: string;
  gallery: string[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

/** Normalized project shape used by components (matches old interface) */
export interface Project {
  id: number;
  slug: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  category: "commercial" | "residential";
  location: { en: string; zh: string };
  year: string;
  featuredImage: string;
  gallery: string[];
}

/** Convert a DB row into the component-friendly shape */
function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: { en: row.title_en, zh: row.title_zh },
    description: { en: row.description_en, zh: row.description_zh },
    category: row.category,
    location: { en: row.location_en, zh: row.location_zh },
    year: row.year,
    featuredImage: getStorageUrl(row.featured_image),
    gallery: row.gallery.map(getStorageUrl),
  };
}

/** Fetch all published projects, ordered by sort_order */
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch projects:", error.message);
    return [];
  }

  return (data as ProjectRow[]).map(toProject);
}

/** Fetch a single project by slug */
export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;

  return toProject(data as ProjectRow);
}

/** Fetch related projects (same category, excluding current) */
export async function getRelatedProjects(
  slug: string,
  limit = 3
): Promise<Project[]> {
  // First get current project's category
  const current = await getProjectBySlug(slug);
  if (!current) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .eq("category", current.category)
    .neq("slug", slug)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error || !data) return [];

  return (data as ProjectRow[]).map(toProject);
}

/** Fetch all slugs (for generateStaticParams) */
export async function getAllProjectSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("slug")
    .eq("is_published", true);

  if (error || !data) return [];

  return data.map((row) => row.slug);
}
