// Cloudflare Worker in front of the single-page app. It:
//  - serves a live /sitemap.xml (pages, products, published blog posts, projects, images)
//  - injects each page's title, description, canonical, Open Graph and JSON-LD into the HTML,
//    plus a <noscript> copy of the main content, so crawlers and link previews see real metadata
//  - returns real 404 status codes for unknown pages, posts and projects
//  - 301-redirects old /blog/<uuid> links and trailing-slash URLs to their canonical address
import { PUBLIC_PAGES, isPrivatePath, type PublicPage } from "../src/config/site";
import { getProductBySlug } from "../src/data/products";
import {
  ContentUnavailableError,
  findProject,
  findPublishedPost,
  listProjects,
  listPublishedPosts,
  type SupabaseConfig,
} from "../src/seo/content";
import {
  blogPostMeta,
  blogPostUrl,
  defaultMeta,
  notFoundMeta,
  pageMeta,
  privateMeta,
  productMeta,
  projectMeta,
  projectUrl,
  type BlogPostSEO,
  type PageMeta,
  type ProjectSEO,
} from "../src/seo/meta";
import { collectSitemapUrls, renderSitemap, type SitemapContent } from "../src/seo/sitemap";
import type { Product } from "../src/types/product";

interface Env {
  ASSETS: Fetcher;
}

const supabase: SupabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
};

/** Cache Supabase reads at the edge for 5 minutes. */
const CONTENT_FETCH: RequestInit = { cf: { cacheTtl: 300, cacheEverything: true } };
const SITEMAP_MAX_AGE = 3600;

interface Resolved {
  status: number;
  meta: PageMeta;
  /** HTML for the <noscript> fallback (already escaped). */
  body: string;
  redirect?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap.xml") return sitemapResponse(request, ctx);

    const isPage =
      (request.method === "GET" || request.method === "HEAD") &&
      !/\.[a-z0-9]+$/i.test(url.pathname) &&
      (request.headers.get("Accept") ?? "").includes("text/html");
    if (!isPage) return env.ASSETS.fetch(request);

    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.replace(/\/+$/, "") || "/";
      return Response.redirect(url.toString(), 301);
    }

    const resolved = await resolve(url.pathname);
    if (resolved.redirect) return Response.redirect(new URL(resolved.redirect + url.search, url).toString(), 301);

    const shell = await env.ASSETS.fetch(new Request(new URL("/", url), { headers: request.headers }));
    if (!shell.ok || !(shell.headers.get("Content-Type") ?? "").includes("text/html")) return shell;

    const headers = new Headers(shell.headers);
    if (resolved.meta.noindex) headers.set("X-Robots-Tag", "noindex");
    const html = new Response(shell.body, { status: resolved.status, headers });
    return injectSeo(html, resolved);
  },
} satisfies ExportedHandler<Env>;

// ---------------------------------------------------------------------------------------------
// Route resolution

async function resolve(pathname: string): Promise<Resolved> {
  const page = PUBLIC_PAGES.find((p) => p.path === pathname);
  if (page) return { status: 200, meta: pageMeta(page), body: pageBody(page) };

  if (isPrivatePath(pathname)) return { status: 200, meta: privateMeta, body: "" };

  const [, section, segment, ...rest] = pathname.split("/");
  if (segment && rest.length === 0) {
    try {
      if (section === "products") {
        const product = getProductBySlug(segment);
        if (product) return { status: 200, meta: productMeta(product), body: productBody(product) };
      } else if (section === "blog") {
        const post = await findPublishedPost(supabase, segment, CONTENT_FETCH);
        if (post) {
          const canonical = blogPostUrl(post);
          if (canonical !== pathname) return { status: 301, meta: defaultMeta, body: "", redirect: canonical };
          return { status: 200, meta: blogPostMeta(post), body: postBody(post) };
        }
      } else if (section === "projects") {
        const project = await findProject(supabase, segment, CONTENT_FETCH);
        if (project) {
          const canonical = projectUrl(project);
          if (canonical !== pathname) return { status: 301, meta: defaultMeta, body: "", redirect: canonical };
          return { status: 200, meta: projectMeta(project), body: projectBody(project) };
        }
      }
    } catch (err) {
      // Supabase is unreachable: serve the app normally rather than a false 404.
      if (err instanceof ContentUnavailableError) {
        console.error(err.message);
        return { status: 200, meta: defaultMeta, body: "" };
      }
      throw err;
    }
  }

  return { status: 404, meta: notFoundMeta, body: `<h1>Page not found</h1>${siteLinks()}` };
}

// ---------------------------------------------------------------------------------------------
// Sitemap

async function sitemapResponse(request: Request, ctx: ExecutionContext): Promise<Response> {
  const cache = caches.default;
  const cacheKey = new Request(new URL("/sitemap.xml", request.url).toString(), { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  let content: SitemapContent | null = null;
  try {
    const [posts, projects] = await Promise.all([
      listPublishedPosts(supabase, CONTENT_FETCH),
      listProjects(supabase, CONTENT_FETCH),
    ]);
    content = { posts, projects };
  } catch (err) {
    if (!(err instanceof ContentUnavailableError)) throw err;
    console.error(err.message);
  }

  const response = new Response(renderSitemap(collectSitemapUrls(__PAGE_LASTMOD__, content)), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Don't cache an incomplete sitemap for long.
      "Cache-Control": `public, max-age=${content ? SITEMAP_MAX_AGE : 60}`,
    },
  });
  if (content) ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

// ---------------------------------------------------------------------------------------------
// HTML injection

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** JSON-LD must not be able to close its own <script> tag. */
function jsonForScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function headTags(meta: PageMeta): string {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.keywords ? `<meta name="keywords" content="${esc(meta.keywords)}" />` : "",
    meta.noindex ? `<meta name="robots" content="noindex" />` : "",
    meta.canonical ? `<link rel="canonical" href="${esc(meta.canonical)}" />` : "",
    `<meta property="og:site_name" content="Cyber Dhators" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${esc(meta.image)}" />`,
    meta.canonical ? `<meta property="og:url" content="${esc(meta.canonical)}" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@CyberDhators" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(meta.image)}" />`,
    ...(meta.jsonLd ?? []).map((d) => `<script type="application/ld+json" data-seo>${jsonForScript(d)}</script>`),
  ];
  return tags.filter(Boolean).join("\n    ");
}

function injectSeo(response: Response, resolved: Resolved): Response {
  const remove = { element: (el: Element) => void el.remove() };
  return new HTMLRewriter()
    .on("title", remove)
    .on('meta[name="description"], meta[name="keywords"], meta[name="robots"]', remove)
    .on('meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]', remove)
    .on("head", { element: (el) => void el.append(headTags(resolved.meta), { html: true }) })
    .on("#root", {
      element: (el) => {
        if (resolved.body) el.before(`<noscript>${resolved.body}</noscript>`, { html: true });
      },
    })
    .transform(response);
}

// ---------------------------------------------------------------------------------------------
// <noscript> bodies: the main content in plain HTML for crawlers that don't run JavaScript.

function paragraphs(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p)}</p>`)
    .join("");
}

function siteLinks(): string {
  const items = PUBLIC_PAGES.map((p) => `<li><a href="${p.path}">${esc(p.label)}</a></li>`).join("");
  return `<nav><ul>${items}</ul></nav>`;
}

function pageBody(page: PublicPage): string {
  return `<h1>${esc(page.title)}</h1><p>${esc(page.description)}</p>${siteLinks()}`;
}

function productBody(product: Product): string {
  return (
    `<article><h1>${esc(product.name)}</h1><p>${esc(product.shortDescription)}</p>` +
    product.longDescription.map((p) => `<p>${esc(p)}</p>`).join("") +
    `</article>${siteLinks()}`
  );
}

function postBody(post: BlogPostSEO): string {
  return (
    `<article><h1>${esc(post.title)}</h1>` +
    `<p><time datetime="${esc(post.created_at)}">${esc(post.created_at.slice(0, 10))}</time></p>` +
    (post.excerpt ? `<p>${esc(post.excerpt)}</p>` : "") +
    paragraphs(post.content) +
    `</article><p><a href="/blog">More articles</a></p>`
  );
}

function projectBody(project: ProjectSEO): string {
  const links = [
    project.github_url ? `<li><a href="${esc(project.github_url)}">Source code</a></li>` : "",
    project.demo_url ? `<li><a href="${esc(project.demo_url)}">Live demo</a></li>` : "",
  ].join("");
  return (
    `<article><h1>${esc(project.title)}</h1>${paragraphs(project.description)}` +
    (links ? `<ul>${links}</ul>` : "") +
    `</article><p><a href="/projects">All projects</a></p>`
  );
}
