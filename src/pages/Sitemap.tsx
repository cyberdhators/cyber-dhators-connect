import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Home, FileText, Mail, Package, Users, BookOpen, FolderGit2 } from "lucide-react";
import { getAllProducts } from "@/data/products";
import { PUBLIC_PAGES, type SitemapSection } from "@/config/site";
import { supabase } from "@/integrations/supabase/client";
import { usePublicPageSEO } from "@/hooks/usePageSEO";
import { blogPostUrl, productUrl, projectUrl, truncate } from "@/seo/meta";

interface SitemapLink {
  name: string;
  description: string;
  path?: string;
  onClick?: () => void;
}

type Section = { title: string; icon: typeof Home; links: SitemapLink[] };

const SECTION_ICONS: Record<SitemapSection, typeof Home> = {
  "Main Pages": Home,
  Content: FileText,
  Company: Users,
  "Contact & Support": Mail,
};

function pagesIn(section: SitemapSection): SitemapLink[] {
  return PUBLIC_PAGES.filter((p) => p.section === section).map((p) => ({
    name: p.label,
    path: p.path,
    description: p.summary,
  }));
}

const Sitemap = () => {
  usePublicPageSEO("/sitemap");
  const [posts, setPosts] = useState<SitemapLink[]>([]);
  const [projects, setProjects] = useState<SitemapLink[]>([]);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id, title, excerpt, content")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) =>
        setPosts(
          (data ?? []).map((p) => ({
            name: p.title,
            path: blogPostUrl(p),
            description: truncate(p.excerpt || p.content, 120),
          })),
        ),
      );
    supabase
      .from("projects")
      .select("id, title, description")
      .order("created_at", { ascending: false })
      .then(({ data }) =>
        setProjects(
          (data ?? []).map((p) => ({
            name: p.title,
            path: projectUrl(p),
            description: truncate(p.description, 120),
          })),
        ),
      );
  }, []);

  const sections: Section[] = [
    { title: "Main Pages", icon: SECTION_ICONS["Main Pages"], links: pagesIn("Main Pages") },
    {
      title: "Software Products",
      icon: Package,
      links: getAllProducts().map((product) => ({
        name: product.name,
        path: productUrl(product),
        description: product.shortDescription,
      })),
    },
    { title: "Content", icon: SECTION_ICONS.Content, links: pagesIn("Content") },
    { title: "Blog Posts", icon: BookOpen, links: posts },
    { title: "Projects", icon: FolderGit2, links: projects },
    { title: "Company", icon: SECTION_ICONS.Company, links: pagesIn("Company") },
    {
      title: "Contact & Support",
      icon: SECTION_ICONS["Contact & Support"],
      links: [
        ...pagesIn("Contact & Support").filter((l) => l.path !== "/sitemap"),
        {
          name: "Report Threat",
          description: "Report a cybersecurity threat",
          onClick: () => window.dispatchEvent(new Event("open-report-dialog")),
        },
      ],
    },
  ].filter((section) => section.links.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Site Map</h1>
            <p className="text-lg text-muted-foreground">
              Navigate through all pages of Cyber Dhators
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                  </div>

                  <div className="space-y-3">
                    {section.links.map((link) =>
                      link.path ? (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block p-4 bg-background border border-border rounded-md hover:border-primary transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {link.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {link.description}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground font-mono shrink-0">
                              {link.path}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <button
                          key={link.name}
                          type="button"
                          onClick={link.onClick}
                          className="block w-full text-left p-4 bg-background border border-border rounded-md hover:border-primary transition-colors group"
                        >
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {link.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {link.description}
                          </p>
                        </button>
                      ),
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 bg-muted/50 border border-border rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">For Search Engines</h3>
            <p className="text-sm text-muted-foreground mb-3">
              XML sitemap for SEO and search engine crawlers:
            </p>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-mono text-sm"
            >
              /sitemap.xml
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sitemap;
