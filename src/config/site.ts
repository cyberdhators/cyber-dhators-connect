// Single source of truth for the site's public pages and SEO defaults.
// Used by the router (src/App.tsx), sitemap.xml and the Cloudflare Worker.
// Only relative imports here: this file is also loaded by vite.config.ts.

export const SITE_URL = "https://cyberdhators.com";
export const SITE_NAME = "Cyber Dhators";

export const DEFAULT_TITLE = "Cyber Dhators - Protecting Africa's Digital Future";
export const DEFAULT_DESCRIPTION =
  "Innovative cybersecurity and tech solutions for a safer, smarter digital world. Leading technology organization based in Liberia.";
export const DEFAULT_KEYWORDS = "cybersecurity, technology, Africa, Liberia, digital security, tech solutions";
export const DEFAULT_IMAGE = `${SITE_URL}/cd-logo.png`;

export interface PublicPage {
  path: string;
  /** Browser tab / search result title. */
  title: string;
  /** Meta description. */
  description: string;
  /** Short link text (used in the no-JavaScript fallback navigation). */
  label: string;
  /** Source file whose last git commit date is used as the sitemap <lastmod>. */
  source: string;
}

export const PUBLIC_PAGES = [
  {
    path: "/",
    title: DEFAULT_TITLE,
    description:
      "Discover Cyber Dhators: Leading cybersecurity and tech innovation for Africa. Protect your digital future with our advanced security solutions and services.",
    label: "Home",
    source: "src/pages/Home.tsx",
  },
  {
    path: "/about",
    title: "About Us | Cyber Dhators - Our Mission & Founders",
    description:
      "Learn about Cyber Dhators' mission to create secure, innovative tech solutions. Meet our founders and discover our core values of innovation, integrity, and security.",
    label: "About Us",
    source: "src/pages/About.tsx",
  },
  {
    path: "/services",
    title: "Our Services | Cybersecurity & Tech Solutions | Cyber Dhators",
    description:
      "Explore Cyber Dhators' comprehensive services: cybersecurity solutions, threat detection, tech innovation, training, consulting, and digital transformation for businesses.",
    label: "Services",
    source: "src/pages/Services.tsx",
  },
  {
    path: "/products",
    title: "Our Products | Cyber Dhators",
    description:
      "Browse Cyber Dhators' full catalog of software products — desktop, mobile, and web apps built for Africa and beyond.",
    label: "Products",
    source: "src/pages/Products.tsx",
  },
  {
    path: "/blog",
    title: "Blog | Cyber Dhators - Cybersecurity Insights & Articles",
    description:
      "Read our latest blog posts on cybersecurity, technology trends, and digital security solutions. Expert insights from Cyber Dhators team for African businesses.",
    label: "Blog",
    source: "src/pages/Blog.tsx",
  },
  {
    path: "/projects",
    title: "Community Projects | Cyber Dhators",
    description:
      "Explore innovative tech and cybersecurity projects built by the Cyber Dhators community, with source code and live demos.",
    label: "Projects",
    source: "src/pages/Projects.tsx",
  },
  {
    path: "/team",
    title: "Meet Our Team | Cyber Dhators - Founders & Members",
    description:
      "Meet the talented team behind Cyber Dhators. Our founders and experts are dedicated to cybersecurity innovation, security, and creating impact across Africa.",
    label: "Team",
    source: "src/pages/Team.tsx",
  },
  {
    path: "/gallery",
    title: "Gallery | Cyber Dhators - Projects & Team Highlights",
    description:
      "Explore Cyber Dhators gallery featuring our projects, team moments, and cybersecurity solutions. See our work in action and meet the team behind innovation.",
    label: "Gallery",
    source: "src/pages/Gallery.tsx",
  },
  {
    path: "/testimonials",
    title: "Testimonials | Cyber Dhators",
    description:
      "Read what organizations like Gardiner Consulting Services, MCAM, IDWP, CORWADO, and Our Lady of Fatima Alumni Association say about working with Cyber Dhators.",
    label: "Testimonials",
    source: "src/pages/Testimonials.tsx",
  },
  {
    path: "/contact",
    title: "Contact Us | Cyber Dhators - Get in Touch",
    description:
      "Get in touch with Cyber Dhators. Reach out to discuss your cybersecurity needs, partnerships, or inquiries. We're here to help protect your digital future.",
    label: "Contact Us",
    source: "src/pages/Contact.tsx",
  },
] as const satisfies readonly PublicPage[];

export type PublicPath = (typeof PUBLIC_PAGES)[number]["path"];

export function getPublicPage(path: PublicPath): PublicPage {
  return PUBLIC_PAGES.find((p) => p.path === path)!;
}

/** Routes that exist but must not be crawled or indexed (login and editors). */
export const PRIVATE_PATH_PREFIXES = ["/auth", "/blog/new", "/blog/edit/", "/projects/new", "/projects/edit/"];

export function isPrivatePath(pathname: string): boolean {
  return PRIVATE_PATH_PREFIXES.some((p) => pathname === p || pathname.startsWith(p.endsWith("/") ? p : `${p}/`));
}

export function absoluteUrl(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}
