// Readable URLs for database content (blog posts, projects) without needing a slug column:
// "<title-words>-<first 8 hex chars of the UUID>", e.g. /blog/why-every-website-needs-strong-cybersecurity-31d795a9.
// Only relative imports here: this file is also used by the Cloudflare Worker and vite.config.ts.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG_ID_RE = /(?:^|-)([0-9a-f]{8})$/i;
const MAX_WORDS_LENGTH = 70;

export function slugify(text: string): string {
  const slug = text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (slug.length <= MAX_WORDS_LENGTH) return slug;
  const cut = slug.slice(0, MAX_WORDS_LENGTH);
  return cut.slice(0, cut.lastIndexOf("-") > 0 ? cut.lastIndexOf("-") : MAX_WORDS_LENGTH);
}

/** Canonical URL segment for a row with a title and a UUID primary key. */
export function contentSlug(title: string, id: string): string {
  const words = slugify(title);
  const shortId = id.slice(0, 8).toLowerCase();
  return words ? `${words}-${shortId}` : shortId;
}

export type SlugRef =
  | { kind: "id"; id: string }
  | { kind: "prefix"; prefix: string; lower: string; upper: string };

/** Parses a URL segment that is either a full UUID (old links) or a readable slug. */
export function parseContentSlug(segment: string | undefined): SlugRef | null {
  if (!segment) return null;
  const value = decodeURIComponent(segment).toLowerCase();
  if (UUID_RE.test(value)) return { kind: "id", id: value };
  const match = SLUG_ID_RE.exec(value);
  if (!match) return null;
  const prefix = match[1];
  return {
    kind: "prefix",
    prefix,
    lower: `${prefix}-0000-0000-0000-000000000000`,
    upper: `${prefix}-ffff-ffff-ffff-ffffffffffff`,
  };
}

/** From rows matching an id prefix, picks the one whose canonical slug equals the segment (else the first). */
export function pickBySlug<T extends { id: string; title: string }>(rows: T[], segment: string): T | undefined {
  const wanted = decodeURIComponent(segment).toLowerCase();
  return rows.find((r) => contentSlug(r.title, r.id) === wanted) ?? rows[0];
}
