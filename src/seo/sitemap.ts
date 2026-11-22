// Builds sitemap.xml (with image entries) from the page config, product catalogue and Supabase content.
// Used by the Cloudflare Worker (live) and by the Vite build (static fallback). Only relative imports here.
import { PUBLIC_PAGES, absoluteUrl } from "../config/site";
import { getAllProducts } from "../data/products";
import type { BlogPostSEO, ProjectSEO } from "./meta";
import { blogPostUrl, productImages, productUrl, projectUrl } from "./meta";

export interface SitemapImage {
  loc: string;
}

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  images?: SitemapImage[];
}

export interface SitemapContent {
  posts: BlogPostSEO[];
  projects: ProjectSEO[];
}

function day(date: string | null | undefined): string | undefined {
  return date ? date.slice(0, 10) : undefined;
}

function latest(...dates: (string | undefined)[]): string | undefined {
  return dates.filter((d): d is string => !!d).sort().at(-1);
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * @param pageLastmod  path -> YYYY-MM-DD from git history (see vite-plugins/sitemap.ts)
 * @param content      published blog posts and projects; pass null when Supabase was unreachable
 */
export function collectSitemapUrls(pageLastmod: Record<string, string>, content: SitemapContent | null): SitemapUrl[] {
  const products = getAllProducts();
  const posts = content?.posts ?? [];
  const projects = content?.projects ?? [];

  const listingDates: Record<string, string | undefined> = {
    "/products": latest(...products.map((p) => p.lastUpdated)),
    "/blog": latest(...posts.map((p) => day(p.updated_at || p.created_at))),
    "/projects": latest(...projects.map((p) => day(p.updated_at || p.created_at))),
  };

  const pages: SitemapUrl[] = PUBLIC_PAGES.map((page) => ({
    loc: absoluteUrl(page.path),
    lastmod: latest(pageLastmod[page.path], listingDates[page.path]),
  }));

  const productUrls: SitemapUrl[] = products.map((product) => ({
    loc: absoluteUrl(productUrl(product)),
    lastmod: product.lastUpdated,
    images: productImages(product).map((loc) => ({ loc })),
  }));

  const postUrls: SitemapUrl[] = posts.map((post) => ({
    loc: absoluteUrl(blogPostUrl(post)),
    lastmod: day(post.updated_at || post.created_at),
    images: post.featured_image_url ? [{ loc: post.featured_image_url }] : undefined,
  }));

  const projectUrls: SitemapUrl[] = projects.map((project) => ({
    loc: absoluteUrl(projectUrl(project)),
    lastmod: day(project.updated_at || project.created_at),
    images: project.thumbnail_url ? [{ loc: project.thumbnail_url }] : undefined,
  }));

  return [...pages, ...productUrls, ...postUrls, ...projectUrls];
}

export function renderSitemap(urls: SitemapUrl[]): string {
  const body = urls
    .map((u) => {
      const lines = [`    <loc>${escapeXml(u.loc)}</loc>`];
      if (u.lastmod) lines.push(`    <lastmod>${u.lastmod}</lastmod>`);
      for (const img of u.images ?? []) {
        lines.push(`    <image:image>\n      <image:loc>${escapeXml(img.loc)}</image:loc>\n    </image:image>`);
      }
      return `  <url>\n${lines.join("\n")}\n  </url>`;
    })
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    `${body}\n</urlset>\n`
  );
}
