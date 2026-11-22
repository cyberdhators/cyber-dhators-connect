// Builds the SEO metadata (title, description, canonical, Open Graph, JSON-LD) for every kind of page.
// Shared by the browser (usePageSEO) and the Cloudflare Worker, which injects it into the HTML for crawlers.
// Only relative imports here.
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  type PublicPage,
} from "../config/site";
import { CATEGORY_LABELS } from "../data/products";
import { contentSlug } from "../lib/slug";
import type { Product } from "../types/product";

export interface PageMeta {
  title: string;
  description: string;
  /** Absolute canonical URL; omitted for pages that should not be indexed. */
  canonical?: string;
  image: string;
  type: "website" | "article";
  keywords?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

export interface BlogPostSEO {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  created_at: string;
  updated_at?: string | null;
  featured_image_url: string | null;
  category?: string | null;
}

export interface ProjectSEO {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string | null;
  thumbnail_url: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  category?: string | null;
}

const PUBLISHER = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: DEFAULT_IMAGE },
};

export function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : cut.length)}…`;
}

export const defaultMeta: PageMeta = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  image: DEFAULT_IMAGE,
  type: "website",
  keywords: DEFAULT_KEYWORDS,
};

export function pageMeta(page: PublicPage): PageMeta {
  const canonical = absoluteUrl(page.path);
  const jsonLd: Record<string, unknown>[] =
    page.path === "/"
      ? [
          {
            "@context": "https://schema.org",
            ...PUBLISHER,
            sameAs: ["https://www.linkedin.com/company/cyberdhators/", "https://github.com/cyberdhators/"],
          },
          { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        ]
      : [];
  return { ...defaultMeta, title: page.title, description: page.description, canonical, jsonLd };
}

export function productUrl(product: Pick<Product, "slug">): string {
  return `/products/${product.slug}`;
}

export function productImages(product: Product): string[] {
  const urls = [product.seo.ogImage, product.heroImage, product.logo, ...product.screenshots.map((s) => s.url)];
  return [...new Set(urls.filter((u): u is string => !!u).map(absoluteUrl))];
}

export function productMeta(product: Product): PageMeta {
  const canonical = product.seo.canonicalUrl || absoluteUrl(productUrl(product));
  const image = productImages(product)[0] ?? DEFAULT_IMAGE;
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : undefined;

  return {
    title: product.seo.title,
    description: product.seo.description,
    canonical,
    image,
    type: "website",
    keywords: product.seo.keywords.join(", "),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: product.name,
        applicationCategory: CATEGORY_LABELS[product.category],
        operatingSystem: product.platforms.join(", "),
        softwareVersion: product.version,
        description: product.seo.description,
        image,
        url: canonical,
        datePublished: product.releaseDate,
        dateModified: product.lastUpdated,
        ...(averageRating !== undefined
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: averageRating.toFixed(1),
                reviewCount: product.reviews.length,
              },
            }
          : {}),
      },
    ],
  };
}

export function blogPostUrl(post: { id: string; title: string }): string {
  return `/blog/${contentSlug(post.title, post.id)}`;
}

export function blogPostMeta(post: BlogPostSEO): PageMeta {
  const canonical = absoluteUrl(blogPostUrl(post));
  const description = truncate(post.excerpt || post.content);
  const image = post.featured_image_url || DEFAULT_IMAGE;
  return {
    title: `${post.title} | Cyber Dhators Blog`,
    description,
    canonical,
    image,
    type: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description,
        image,
        url: canonical,
        mainEntityOfPage: canonical,
        datePublished: post.created_at,
        dateModified: post.updated_at || post.created_at,
        ...(post.category ? { articleSection: post.category } : {}),
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: PUBLISHER,
      },
    ],
  };
}

export function projectUrl(project: { id: string; title: string }): string {
  return `/projects/${contentSlug(project.title, project.id)}`;
}

export function projectMeta(project: ProjectSEO): PageMeta {
  const canonical = absoluteUrl(projectUrl(project));
  const description = truncate(project.description);
  const image = project.thumbnail_url || DEFAULT_IMAGE;
  return {
    title: `${project.title} | Cyber Dhators Projects`,
    description,
    canonical,
    image,
    type: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description,
        image,
        url: canonical,
        dateCreated: project.created_at,
        dateModified: project.updated_at || project.created_at,
        ...(project.category ? { genre: project.category } : {}),
        ...(project.github_url ? { codeRepository: project.github_url } : {}),
        ...(project.demo_url ? { sameAs: project.demo_url } : {}),
        publisher: PUBLISHER,
      },
    ],
  };
}

export const notFoundMeta: PageMeta = {
  ...defaultMeta,
  title: "Page Not Found | Cyber Dhators",
  description: "The page you were looking for doesn't exist.",
  noindex: true,
};

export const privateMeta: PageMeta = { ...defaultMeta, noindex: true };
