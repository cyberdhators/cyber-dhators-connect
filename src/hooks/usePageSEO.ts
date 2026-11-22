import { useEffect } from "react";
import { getPublicPage, type PublicPath } from "@/config/site";
import { defaultMeta, pageMeta, type PageMeta } from "@/seo/meta";

function upsertMeta(attr: "name" | "property", key: string, content: string | undefined) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === undefined) {
    tag?.remove();
    return;
  }
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(href: string | undefined) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function replaceJsonLd(data: PageMeta["jsonLd"]) {
  document.head.querySelectorAll("script[data-seo]").forEach((s) => s.remove());
  for (const item of data ?? []) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "";
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  }
}

/** Writes the page's title, meta tags, canonical link and JSON-LD into <head>. Pass null while loading. */
function applyMeta(meta: PageMeta) {
  document.title = meta.title;
  upsertMeta("name", "description", meta.description);
  upsertMeta("name", "keywords", meta.keywords);
  upsertMeta("name", "robots", meta.noindex ? "noindex" : undefined);
  upsertCanonical(meta.canonical);
  upsertMeta("property", "og:type", meta.type);
  upsertMeta("property", "og:title", meta.title);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("property", "og:image", meta.image);
  upsertMeta("property", "og:url", meta.canonical);
  upsertMeta("name", "twitter:title", meta.title);
  upsertMeta("name", "twitter:description", meta.description);
  upsertMeta("name", "twitter:image", meta.image);
  replaceJsonLd(meta.jsonLd);
}

const usePageSEO = (meta: PageMeta | null) => {
  // Compare by value so callers can build the meta object inline on every render.
  const key = meta ? JSON.stringify(meta) : null;
  useEffect(() => {
    if (!key) return;
    applyMeta(JSON.parse(key) as PageMeta);
    return () => applyMeta(defaultMeta);
  }, [key]);
};

/** SEO for one of the static pages listed in src/config/site.ts. */
export const usePublicPageSEO = (path: PublicPath) => usePageSEO(pageMeta(getPublicPage(path)));

export default usePageSEO;
