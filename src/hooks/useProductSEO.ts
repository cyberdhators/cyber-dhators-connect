import { useEffect } from "react";
import { CATEGORY_LABELS } from "@/data/products";
import type { Product } from "@/types/product";

const SITE_ORIGIN = "https://cyberdhators.codes";
const FALLBACK_IMAGE = "https://lovable.dev/opengraph-image-p98pqg.png";

const DEFAULTS = {
  title: "Cyber Dhators - Protecting Africa's Digital Future",
  description: "Innovative cybersecurity and tech solutions for a safer, smarter digital world. Leading technology organization based in Liberia.",
  keywords: "cybersecurity, technology, Africa, Liberia, digital security, tech solutions",
  ogDescription: "Innovative cybersecurity and tech solutions for a safer, smarter digital world.",
  image: FALLBACK_IMAGE,
};

/** Finds-or-creates a meta tag and sets its content. Tracks whether it was newly created so
 * cleanup can remove tags this hook added while resetting pre-existing ones to their defaults. */
const setMetaTag = (attr: "name" | "property", key: string, content: string) => {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !tag;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
  return { tag, created };
};

const useProductSEO = (product: Product | undefined) => {
  useEffect(() => {
    if (!product) return;

    const canonicalUrl = product.seo.canonicalUrl || `${SITE_ORIGIN}/products/${product.slug}`;
    const image = product.seo.ogImage || product.heroImage || product.logo || FALLBACK_IMAGE;

    document.title = product.seo.title;

    const description = setMetaTag("name", "description", product.seo.description);
    const keywords = setMetaTag("name", "keywords", product.seo.keywords.join(", "));

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalCreated = !canonicalLink;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    const ogTitle = setMetaTag("property", "og:title", product.seo.title);
    const ogDescription = setMetaTag("property", "og:description", product.seo.description);
    const ogImage = setMetaTag("property", "og:image", image);
    const ogUrl = setMetaTag("property", "og:url", canonicalUrl);

    const twitterTitle = setMetaTag("name", "twitter:title", product.seo.title);
    const twitterDescription = setMetaTag("name", "twitter:description", product.seo.description);
    const twitterImage = setMetaTag("name", "twitter:image", image);

    const averageRating =
      product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
        : undefined;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: product.name,
      applicationCategory: CATEGORY_LABELS[product.category],
      operatingSystem: product.platforms.join(", "),
      softwareVersion: product.version,
      description: product.seo.description,
      image,
      url: canonicalUrl,
      datePublished: product.releaseDate,
      dateModified: product.lastUpdated,
      ...(averageRating !== undefined
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: averageRating.toFixed(1),
              reviewCount: product.reviews.length,
            },
          }
        : {}),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    const resetOrRemove = (entry: { tag: HTMLMetaElement; created: boolean }, defaultValue?: string) => {
      if (entry.created || defaultValue === undefined) {
        entry.tag.remove();
      } else {
        entry.tag.setAttribute("content", defaultValue);
      }
    };

    return () => {
      document.title = DEFAULTS.title;
      resetOrRemove(description, DEFAULTS.description);
      resetOrRemove(keywords, DEFAULTS.keywords);
      resetOrRemove(ogTitle, DEFAULTS.title);
      resetOrRemove(ogDescription, DEFAULTS.ogDescription);
      resetOrRemove(ogImage, DEFAULTS.image);
      resetOrRemove(ogUrl);
      resetOrRemove(twitterTitle);
      resetOrRemove(twitterDescription);
      resetOrRemove(twitterImage, DEFAULTS.image);
      if (canonicalCreated) canonicalLink?.remove();
      script.remove();
    };
  }, [product]);
};

export default useProductSEO;
