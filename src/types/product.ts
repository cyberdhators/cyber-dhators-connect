import type { LucideIcon } from "lucide-react";

export type Platform = "windows" | "macos" | "android" | "ios" | "linux" | "web";

export type ProductCategory =
  | "desktop"
  | "mobile"
  | "web"
  | "business"
  | "education"
  | "cybersecurity"
  | "productivity"
  | "marketplace";

export type ProductStatus = "stable" | "beta" | "coming-soon";

export type SortOption = "newest" | "oldest" | "alphabetical" | "most-downloaded" | "featured";

export type ScreenshotDevice = "desktop" | "tablet" | "mobile";

export interface DownloadAsset {
  url: string;
  version?: string;
  size?: string;
  checksum?: string;
  releaseDate?: string;
  downloadCount?: number;
  minOsVersion?: string;
}

export interface ProductDownloads {
  windows64?: DownloadAsset;
  windows32?: DownloadAsset;
  macAppleSilicon?: DownloadAsset;
  macIntel?: DownloadAsset;
  apk?: DownloadAsset;
  playStore?: DownloadAsset;
  appStore?: DownloadAsset;
  linux?: DownloadAsset;
}

export interface WindowsRequirements {
  minimum: string[];
  recommended?: string[];
}

export interface MacRequirements {
  intel?: string[];
  appleSilicon?: string[];
  minRam?: string;
  storage?: string;
  os?: string;
}

export interface MobileRequirements {
  minVersion: string;
  storage: string;
}

export interface SystemRequirements {
  windows?: WindowsRequirements;
  macos?: MacRequirements;
  android?: MobileRequirements;
  ios?: MobileRequirements;
}

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProductScreenshot {
  url: string;
  alt: string;
  device: ScreenshotDevice;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductReview {
  id: string;
  user: string;
  country: string;
  rating: number;
  review: string;
  avatar?: string;
  date?: string;
}

export interface ProductDocumentation {
  userGuide?: string;
  apiDocs?: string;
  installationGuide?: string;
  releaseNotes?: string;
  developerDocs?: string;
}

export interface ProductSEO {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  heroImage?: string;
  icon: LucideIcon;
  version: string;
  status: ProductStatus;
  featured: boolean;
  category: ProductCategory;
  platforms: Platform[];
  shortDescription: string;
  longDescription: string[];
  whoItsFor?: string;
  useCases?: string[];
  businessValue?: string;
  developer: string;
  company: string;
  releaseDate: string;
  lastUpdated: string;
  website?: string;
  documentation?: ProductDocumentation;
  github?: string;
  supportEmail?: string;
  whatsapp?: string;
  video?: string;
  screenshots: ProductScreenshot[];
  features: ProductFeature[];
  systemRequirements: SystemRequirements;
  downloads: ProductDownloads;
  changelog: ChangelogEntry[];
  faq: FAQItem[];
  reviews: ProductReview[];
  relatedProducts: string[];
  tags: string[];
  seo: ProductSEO;
}
