// Reads public content straight from Supabase's REST API (no supabase-js), so it works in the
// Cloudflare Worker and at build time. Only relative imports here.
import { parseContentSlug, pickBySlug } from "../lib/slug";
import type { BlogPostSEO, ProjectSEO } from "./meta";

export interface SupabaseConfig {
  url: string;
  key: string;
}

const POST_FIELDS = "id,title,excerpt,content,created_at,updated_at,featured_image_url,category";
const PROJECT_FIELDS = "id,title,description,created_at,updated_at,thumbnail_url,github_url,demo_url,category";

/** Thrown when Supabase can't be reached or errors, so callers can tell "not found" from "unknown". */
export class ContentUnavailableError extends Error {}

async function query<T>(config: SupabaseConfig, path: string, init?: RequestInit): Promise<T[]> {
  let res: Response;
  try {
    res = await fetch(`${config.url}/rest/v1/${path}`, {
      ...init,
      headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
      signal: AbortSignal.timeout(8_000),
    });
  } catch (err) {
    throw new ContentUnavailableError(`Supabase request failed: ${String(err)}`);
  }
  if (!res.ok) throw new ContentUnavailableError(`Supabase responded ${res.status} for ${path.split("?")[0]}`);
  return (await res.json()) as T[];
}

export function listPublishedPosts(config: SupabaseConfig, init?: RequestInit) {
  return query<BlogPostSEO>(config, `blog_posts?select=${POST_FIELDS}&published=eq.true&order=created_at.desc`, init);
}

export function listProjects(config: SupabaseConfig, init?: RequestInit) {
  return query<ProjectSEO>(config, `projects?select=${PROJECT_FIELDS}&order=created_at.desc`, init);
}

async function findBySegment<T extends { id: string; title: string }>(
  config: SupabaseConfig,
  table: string,
  fields: string,
  extraFilter: string,
  segment: string,
  init?: RequestInit,
): Promise<T | undefined> {
  const ref = parseContentSlug(segment);
  if (!ref) return undefined;
  const filter = ref.kind === "id" ? `id=eq.${ref.id}` : `id=gte.${ref.lower}&id=lte.${ref.upper}`;
  const rows = await query<T>(config, `${table}?select=${fields}&${filter}${extraFilter}`, init);
  return ref.kind === "id" ? rows[0] : pickBySlug(rows, segment);
}

export function findPublishedPost(config: SupabaseConfig, segment: string, init?: RequestInit) {
  return findBySegment<BlogPostSEO>(config, "blog_posts", POST_FIELDS, "&published=eq.true", segment, init);
}

export function findProject(config: SupabaseConfig, segment: string, init?: RequestInit) {
  return findBySegment<ProjectSEO>(config, "projects", PROJECT_FIELDS, "", segment, init);
}
