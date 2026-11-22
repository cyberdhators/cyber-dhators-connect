import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { cloudflare } from "@cloudflare/vite-plugin";
import { sitemap } from "./vite-plugins/sitemap";

// The Cloudflare plugin splits the build into dist/client + a Worker bundle. Lovable hosting
// needs a plain static build (dist/index.html), so only enable it for Cloudflare deploys.
const cloudflareBuild = process.env.WORKERS_CI === "1" || process.env.CLOUDFLARE_BUILD === "1";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ...(cloudflareBuild ? [cloudflare()] : []),
    sitemap(),
    ...(mode === "development" ? [componentTagger()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
