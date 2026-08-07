import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Home, FileText, Mail, Package } from "lucide-react";
import { getAllProducts } from "@/data/products";

interface SitemapLink {
  name: string;
  description: string;
  path?: string;
  onClick?: () => void;
}

const Sitemap = () => {
  const sections: { title: string; icon: typeof Home; links: SitemapLink[] }[] = [
    {
      title: "Main Pages",
      icon: Home,
      links: [
        { name: "Home", path: "/", description: "Homepage with services overview" },
        { name: "About Us", path: "/about", description: "Learn about our team and mission" },
        { name: "Services", path: "/services", description: "Our cybersecurity services" },
        { name: "Products", path: "/products", description: "Browse our software products and downloads" },
      ],
    },
    {
      title: "Software Products",
      icon: Package,
      links: getAllProducts().map((product) => ({
        name: product.name,
        path: `/products/${product.slug}`,
        description: product.shortDescription,
      })),
    },
    {
      title: "Content",
      icon: FileText,
      links: [
        { name: "Blog", path: "/blog", description: "Latest cybersecurity insights and news" },
        { name: "Projects", path: "/projects", description: "Our work and case studies" },
      ],
    },
    {
      title: "Contact & Support",
      icon: Mail,
      links: [
        { name: "Contact Us", path: "/contact", description: "Get in touch with our team" },
        {
          name: "Report Threat",
          description: "Report a cybersecurity threat",
          onClick: () => window.dispatchEvent(new Event("open-report-dialog")),
        },
      ],
    },
  ];

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
                          key={link.name}
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
