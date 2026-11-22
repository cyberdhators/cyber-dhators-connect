import { execFileSync } from "node:child_process";
import { loadEnv, type Plugin } from "vite";
import { PUBLIC_PAGES } from "../src/config/site";
import { ContentUnavailableError, listProjects, listPublishedPosts } from "../src/seo/content";
import { collectSitemapUrls, renderSitemap, type SitemapContent } from "../src/seo/sitemap";

function gitLastModified(root: string, file: string): string | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

function pageLastModified(root: string): Record<string, string> {
  const dates: Record<string, string> = {};
  for (const page of PUBLIC_PAGES) {
    const date = gitLastModified(root, page.source);
    if (date) dates[page.path] = date;
  }
  return dates;
}

/**
 * - Exposes each page's last git commit date to the app and Worker as `__PAGE_LASTMOD__`.
 * - Writes a static sitemap.xml into the client build. The Cloudflare Worker serves a live
 *   version instead; this file is the fallback for hosts that only serve static files.
 */
export function sitemap(): Plugin {
  let root = process.cwd();
  let env: Record<string, string> = {};
  let lastmod: Record<string, string> = {};

  return {
    name: "cyber-dhators-sitemap",
    config(config) {
      root = config.root ?? process.cwd();
      lastmod = pageLastModified(root);
      return { define: { __PAGE_LASTMOD__: JSON.stringify(lastmod) } };
    },
    configResolved(config) {
      env = loadEnv(config.mode, config.envDir || root, "VITE_");
    },
    async generateBundle() {
      if (this.environment && this.environment.name !== "client") return;

      let content: SitemapContent | null = null;
      const supabase = { url: env.VITE_SUPABASE_URL, key: env.VITE_SUPABASE_PUBLISHABLE_KEY };
      if (supabase.url && supabase.key) {
        try {
          const [posts, projects] = await Promise.all([listPublishedPosts(supabase), listProjects(supabase)]);
          content = { posts, projects };
        } catch (err) {
          if (!(err instanceof ContentUnavailableError)) throw err;
          this.warn(`${err.message}; blog posts and projects left out of the static sitemap.`);
        }
      } else {
        this.warn("Supabase env vars missing; blog posts and projects left out of the static sitemap.");
      }

      const urls = collectSitemapUrls(lastmod, content);
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: renderSitemap(urls) });
      this.info(`Wrote sitemap.xml with ${urls.length} URLs.`);
    },
  };
}
