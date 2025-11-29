import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  created_at: string;
  updated_at?: string;
}

export const generateBlogSitemap = async (): Promise<string> => {
  try {
    // Fetch all published blog posts
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Build XML sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cyberdhators.codes/blog</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

    // Add each blog post
    (posts || []).forEach((post: BlogPost) => {
      const lastmod = post.created_at.split("T")[0];
      xml += `  <url>
    <loc>https://cyberdhators.codes/blog/${post.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    xml += `</urlset>`;
    return xml;
  } catch (error) {
    console.error("Error generating blog sitemap:", error);
    return "";
  }
};

export default generateBlogSitemap;
