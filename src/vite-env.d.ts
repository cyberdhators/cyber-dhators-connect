/// <reference types="vite/client" />

/** Page path -> last git commit date (YYYY-MM-DD) of its source file. Injected by vite-plugins/sitemap.ts. */
declare const __PAGE_LASTMOD__: Record<string, string>;
