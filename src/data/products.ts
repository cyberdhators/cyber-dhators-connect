import {
  Users,
  ShoppingCart,
  Wallet,
  ShieldCheck,
  Cloud,
  WifiOff,
  Moon,
  Bell,
  Globe2,
  RefreshCw,
  Zap,
  Layers,
  MessageSquare,
  BarChart3,
  Boxes,
  Receipt,
  Smartphone,
  Lock,
} from "lucide-react";
import type { Product, ProductCategory, SortOption } from "@/types/product";

export const CATEGORY_LABELS: Record<"all" | ProductCategory, string> = {
  all: "All",
  desktop: "Desktop",
  mobile: "Mobile",
  web: "Web",
  business: "Business",
  education: "Education",
  cybersecurity: "Cybersecurity",
  productivity: "Productivity",
  marketplace: "Marketplace",
};

export const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  oldest: "Oldest",
  alphabetical: "Alphabetical",
  "most-downloaded": "Most Downloaded",
  featured: "Featured",
};

export const products: Product[] = [
  {
    id: "cyber-dhators-connect",
    slug: "cyber-dhators-connect",
    name: "Cyber Dhators Connect",
    icon: Users,
    version: "1.0.0",
    status: "stable",
    featured: true,
    category: "business",
    platforms: ["windows", "macos", "android", "ios"],
    shortDescription:
      "The official Cyber Dhators companion app for staying connected to community events, blog updates, and project collaboration.",
    longDescription: [
      "Cyber Dhators Connect is the official companion app for the Cyber Dhators community, built to keep members, clients, and partners in sync with everything happening across the organization.",
      "It brings the community blog, project showcase, and event updates into a single, fast, native-feeling experience so you no longer need to keep a browser tab open to stay in the loop.",
      "Connect is designed for developers, cybersecurity enthusiasts, and organizations working with Cyber Dhators who want a lightweight, secure way to follow news, submit projects, and reach the team directly.",
    ],
    whoItsFor:
      "Community members, developers, cybersecurity enthusiasts, and organizations collaborating with Cyber Dhators.",
    useCases: [
      "Follow the latest Cyber Dhators blog posts and announcements",
      "Browse and submit community projects",
      "Report security threats directly to the team",
      "Stay up to date on events and training sessions",
    ],
    businessValue:
      "Centralizes community engagement in one secure app, reducing friction between Cyber Dhators and the developers and organizations it works with.",
    developer: "Cyber Dhators Engineering Team",
    company: "Cyber Dhators",
    releaseDate: "2026-01-15",
    lastUpdated: "2026-08-01",
    website: "https://cyberdhators.codes",
    github: "https://github.com/cyberdhators/cyber-dhators-connect",
    supportEmail: "cyberdhators@gmail.com",
    documentation: {
      releaseNotes: "/products/cyber-dhators-connect#changelog",
    },
    video: undefined,
    screenshots: [],
    features: [
      {
        icon: ShieldCheck,
        title: "Secure Authentication",
        description: "Sign in safely with encrypted, session-based authentication backed by Supabase.",
      },
      {
        icon: Layers,
        title: "Cross Platform",
        description: "One consistent experience across Windows, macOS, Android, and iOS.",
      },
      {
        icon: Cloud,
        title: "Cloud Sync",
        description: "Your profile, projects, and saved posts stay in sync across every device.",
      },
      {
        icon: Bell,
        title: "Notifications",
        description: "Get notified the moment new blog posts, events, or project updates go live.",
      },
      {
        icon: Moon,
        title: "Dark Mode",
        description: "A refined dark interface built for long reading and late-night coding sessions.",
      },
      {
        icon: Zap,
        title: "Fast Performance",
        description: "A lightweight app shell that loads instantly and stays out of your way.",
      },
    ],
    systemRequirements: {
      windows: {
        minimum: ["Windows 10 64-bit", "4 GB RAM", "200 MB free storage"],
        recommended: ["Windows 11 64-bit", "8 GB RAM", "500 MB free storage"],
      },
      macos: {
        intel: ["macOS 12 Monterey or later"],
        appleSilicon: ["macOS 12 Monterey or later (native Apple Silicon build)"],
        minRam: "4 GB",
        storage: "250 MB",
        os: "macOS 12+",
      },
      android: { minVersion: "Android 8.0 (Oreo)", storage: "80 MB" },
      ios: { minVersion: "iOS 15", storage: "100 MB" },
    },
    downloads: {},
    changelog: [
      {
        version: "1.0.0",
        date: "2026-01-15",
        changes: [
          "Initial stable release",
          "Community blog and project feed",
          "Secure Supabase-backed authentication",
          "Threat reporting shortcut",
        ],
      },
    ],
    faq: [
      { question: "Is it free?", answer: "Yes, Cyber Dhators Connect is completely free for community members." },
      {
        question: "How do I install it?",
        answer:
          "Download the installer for your operating system from the Downloads section on this page once it is published, then follow the on-screen setup instructions.",
      },
      {
        question: "Can I update automatically?",
        answer: "Automatic update checks are planned for a future release; for now, re-download the latest version from this page.",
      },
      {
        question: "Which operating systems are supported?",
        answer: "Windows, macOS (Intel and Apple Silicon), Android, and iOS.",
      },
      { question: "Where can I report bugs?", answer: "Use the Report an Issue link on this page or email cyberdhators@gmail.com." },
      { question: "Can I use it offline?", answer: "You can browse previously loaded content offline; posting and syncing require an internet connection." },
    ],
    reviews: [],
    relatedProducts: ["cynbend", "supermarket-management-system"],
    tags: ["community", "collaboration", "cybersecurity", "networking"],
    seo: {
      title: "Cyber Dhators Connect — Official Community App | Cyber Dhators",
      description:
        "Download Cyber Dhators Connect, the official companion app for the Cyber Dhators community across Windows, macOS, Android, and iOS.",
      keywords: ["cyber dhators connect", "cyber dhators app", "community app", "cybersecurity community"],
    },
  },
  {
    id: "cynbend",
    slug: "cynbend",
    name: "Cynbend",
    icon: Wallet,
    version: "0.9.0-beta",
    status: "beta",
    featured: false,
    category: "productivity",
    platforms: ["web", "android", "ios"],
    shortDescription:
      "A modern productivity and finance-tracking companion for individuals and small teams, currently in public beta.",
    longDescription: [
      "Cynbend is a productivity tool designed to help individuals and small teams organize tasks, track spending, and collaborate without the clutter of heavyweight enterprise software.",
      "Built mobile-first with a companion web app, Cynbend focuses on speed and simplicity, giving users a clean way to plan their day and keep shared finances or projects transparent.",
      "It is currently in public beta as the Cyber Dhators team gathers feedback ahead of a stable 1.0 release.",
    ],
    whoItsFor: "Freelancers, small teams, and individuals who want a lightweight productivity and tracking companion.",
    useCases: [
      "Track personal or shared expenses",
      "Organize daily and weekly tasks",
      "Collaborate with a small team on shared goals",
      "Get a quick overview of progress and spending trends",
    ],
    businessValue: "Reduces the overhead of juggling separate task and budgeting tools by combining both in one lightweight app.",
    developer: "Cyber Dhators Engineering Team",
    company: "Cyber Dhators",
    releaseDate: "2026-05-01",
    lastUpdated: "2026-07-20",
    supportEmail: "cyberdhators@gmail.com",
    video: undefined,
    screenshots: [],
    features: [
      {
        icon: BarChart3,
        title: "Spending Insights",
        description: "Visual breakdowns of where your money and time are going, updated in real time.",
      },
      {
        icon: MessageSquare,
        title: "Team Collaboration",
        description: "Share tasks and budgets with a small team and see updates instantly.",
      },
      {
        icon: WifiOff,
        title: "Offline Support",
        description: "Keep adding tasks and entries offline; everything syncs once you're back online.",
      },
      {
        icon: Bell,
        title: "Smart Reminders",
        description: "Get nudged about upcoming deadlines and recurring expenses before they sneak up on you.",
      },
      {
        icon: Globe2,
        title: "Multi-language",
        description: "Use Cynbend in the language your team is most comfortable with.",
      },
      {
        icon: Lock,
        title: "Private by Default",
        description: "Your financial and task data stays scoped to you and the people you explicitly invite.",
      },
    ],
    systemRequirements: {
      android: { minVersion: "Android 9.0", storage: "60 MB" },
      ios: { minVersion: "iOS 15", storage: "80 MB" },
    },
    downloads: {},
    changelog: [
      {
        version: "0.9.0-beta",
        date: "2026-07-20",
        changes: ["Public beta launch", "Task boards", "Shared budgets", "Offline-first sync engine"],
      },
    ],
    faq: [
      { question: "Is it free?", answer: "Cynbend is free during the public beta." },
      { question: "How do I install it?", answer: "Join the beta via the web app, or install the Android/iOS app once download links are published here." },
      { question: "Can I update automatically?", answer: "The web app always runs the latest version; mobile auto-updates are planned for the stable release." },
      { question: "Which operating systems are supported?", answer: "Web, Android, and iOS, with more platforms planned after the beta." },
      { question: "Where can I report bugs?", answer: "Email cyberdhators@gmail.com — beta feedback directly shapes the roadmap." },
      { question: "Can I use it offline?", answer: "Yes, core task and entry tracking works offline and syncs automatically when you reconnect." },
    ],
    reviews: [],
    relatedProducts: ["cyber-dhators-connect", "supermarket-management-system"],
    tags: ["productivity", "finance", "collaboration", "beta"],
    seo: {
      title: "Cynbend — Productivity & Finance Tracker (Beta) | Cyber Dhators",
      description:
        "Cynbend is a beta productivity and finance-tracking app from Cyber Dhators for Web, Android, and iOS.",
      keywords: ["cynbend", "productivity app", "finance tracker", "cyber dhators"],
    },
  },
  {
    id: "supermarket-management-system",
    slug: "supermarket-management-system",
    name: "Supermarket Management System",
    icon: ShoppingCart,
    version: "0.1.0",
    status: "coming-soon",
    featured: false,
    category: "business",
    platforms: ["windows", "web"],
    shortDescription:
      "An all-in-one point-of-sale, inventory, and staff management system built for supermarkets and retail stores across Africa.",
    longDescription: [
      "Supermarket Management System is a point-of-sale and inventory platform purpose-built for the realities of running a retail store in Africa — intermittent connectivity, multi-till checkout, and tight margins.",
      "It combines checkout, stock tracking, supplier management, and staff accounts into a single desktop and web system so store owners can run day-to-day operations without stitching together multiple tools.",
      "The product is currently in active development ahead of its first public release.",
    ],
    whoItsFor: "Supermarket owners, retail chains, and shop managers who need reliable POS and inventory tooling.",
    useCases: [
      "Ring up sales at checkout with barcode scanning",
      "Track stock levels and get low-inventory alerts",
      "Manage suppliers and purchase orders",
      "Review daily and monthly sales reports",
    ],
    businessValue: "Replaces manual stock books and disconnected spreadsheets with a single source of truth for sales and inventory.",
    developer: "Cyber Dhators Engineering Team",
    company: "Cyber Dhators",
    releaseDate: "2026-11-01",
    lastUpdated: "2026-08-01",
    supportEmail: "cyberdhators@gmail.com",
    video: undefined,
    screenshots: [],
    features: [
      {
        icon: Receipt,
        title: "Fast Checkout",
        description: "Barcode-driven point-of-sale built to keep queues moving during peak hours.",
      },
      {
        icon: Boxes,
        title: "Inventory Tracking",
        description: "Real-time stock counts with automatic low-stock alerts across every till.",
      },
      {
        icon: BarChart3,
        title: "Sales Reporting",
        description: "Daily, weekly, and monthly reports to track revenue and top-selling items.",
      },
      {
        icon: Smartphone,
        title: "Multi-Terminal",
        description: "Run multiple checkout terminals in one store, all syncing to the same inventory.",
      },
      {
        icon: RefreshCw,
        title: "Automatic Updates",
        description: "The system stays current with the latest fixes and features with minimal downtime.",
      },
      {
        icon: ShieldCheck,
        title: "Role-Based Access",
        description: "Give cashiers, managers, and owners exactly the permissions they need.",
      },
    ],
    systemRequirements: {
      windows: {
        minimum: ["Windows 10 64-bit", "4 GB RAM", "1 GB free storage"],
        recommended: ["Windows 11 64-bit", "8 GB RAM", "2 GB free storage", "Receipt printer + barcode scanner"],
      },
    },
    downloads: {},
    changelog: [
      {
        version: "0.1.0",
        date: "2026-08-01",
        changes: ["Development preview", "Core checkout flow", "Inventory data model"],
      },
    ],
    faq: [
      { question: "Is it free?", answer: "Pricing will be announced closer to launch; a free tier for small stores is planned." },
      { question: "How do I install it?", answer: "The Windows installer and web app will be available here once the product launches." },
      { question: "Can I update automatically?", answer: "Yes, automatic updates are planned for the Windows desktop client." },
      { question: "Which operating systems are supported?", answer: "Windows desktop and a companion web dashboard at launch." },
      { question: "Where can I report bugs?", answer: "Email cyberdhators@gmail.com to join the early access list and report issues." },
      { question: "Can I use it offline?", answer: "Checkout will work offline with automatic sync once connectivity returns." },
    ],
    reviews: [],
    relatedProducts: ["cyber-dhators-connect", "cynbend"],
    tags: ["retail", "point-of-sale", "inventory", "business"],
    seo: {
      title: "Supermarket Management System — POS & Inventory (Coming Soon) | Cyber Dhators",
      description:
        "A point-of-sale and inventory management system for supermarkets and retail stores, coming soon from Cyber Dhators.",
      keywords: ["supermarket management system", "point of sale", "inventory management", "retail software africa"],
    },
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const explicit = product.relatedProducts
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const fallback = products.filter(
    (p) => p.id !== product.id && p.category === product.category && !explicit.some((e) => e.id === p.id),
  );

  return [...explicit, ...fallback].slice(0, limit);
}

export function totalDownloadCount(product: Product): number {
  return Object.values(product.downloads).reduce((sum, asset) => sum + (asset?.downloadCount ?? 0), 0);
}

export function searchProducts(list: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;

  return list.filter((p) => {
    const haystack = [p.name, p.category, p.shortDescription, p.longDescription.join(" "), ...p.platforms, ...p.tags]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function filterProductsByCategory(list: Product[], category: "all" | ProductCategory): Product[] {
  if (category === "all") return list;
  return list.filter((p) => p.category === category);
}

export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    case "oldest":
      return sorted.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
    case "alphabetical":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "most-downloaded":
      return sorted.sort((a, b) => totalDownloadCount(b) - totalDownloadCount(a));
    case "featured":
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    default:
      return sorted;
  }
}
