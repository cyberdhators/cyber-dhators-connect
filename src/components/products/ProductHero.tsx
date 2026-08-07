import { motion } from "framer-motion";
import { Calendar, Download, FileText, Github, MessageCircleWarning } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/data/products";
import type { Product } from "@/types/product";
import PlatformBadge from "./PlatformBadge";
import StatusBadge from "./StatusBadge";
import VersionBadge from "./VersionBadge";

interface ProductHeroProps {
  product: Product;
}

const ProductHero = ({ product }: ProductHeroProps) => {
  const Icon = product.icon;
  const hasDownloads = Object.keys(product.downloads).length > 0;
  const hasDocs = Boolean(product.documentation && Object.values(product.documentation).some(Boolean));
  const issueUrl = product.github ? `${product.github}/issues` : product.supportEmail ? `mailto:${product.supportEmail}` : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-16"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
        {product.logo ? (
          <img
            src={product.logo}
            alt={`${product.name} logo`}
            loading="lazy"
            className="h-20 w-20 rounded-2xl object-cover shrink-0"
          />
        ) : (
          <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
        )}

        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="cyber-gradient">{product.name}</span>
            </h1>
            <VersionBadge version={product.version} />
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <StatusBadge status={product.status} />
            {product.featured && (
              <Badge variant="outline" className="border-primary/40 text-primary">
                Featured
              </Badge>
            )}
            <Badge variant="secondary">{CATEGORY_LABELS[product.category]}</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
            <span>By {product.developer}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Released {new Date(product.releaseDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {product.platforms.map((platform) => (
              <PlatformBadge key={platform} platform={platform} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-lg text-muted-foreground max-w-3xl mb-6">{product.shortDescription}</p>

      <div className="flex flex-wrap gap-3">
        {hasDownloads && (
          <Button asChild>
            <a href="#downloads">
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Download
            </a>
          </Button>
        )}
        {hasDocs && (
          <Button asChild variant="outline">
            <a href="#documentation">
              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
              Visit Documentation
            </a>
          </Button>
        )}
        {product.github && (
          <Button asChild variant="outline">
            <a href={product.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </Button>
        )}
        {issueUrl && (
          <Button asChild variant="outline">
            <a href={issueUrl} target={product.github ? "_blank" : undefined} rel="noopener noreferrer">
              <MessageCircleWarning className="mr-2 h-4 w-4" aria-hidden="true" />
              Report an Issue
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductHero;
