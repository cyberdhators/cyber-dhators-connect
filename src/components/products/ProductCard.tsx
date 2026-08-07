import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/data/products";
import type { Product } from "@/types/product";
import PlatformBadge from "./PlatformBadge";
import StatusBadge from "./StatusBadge";
import VersionBadge from "./VersionBadge";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const Icon = product.icon;
  const hasDownloads = Object.keys(product.downloads).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: Math.min(index, 6) * 0.05 }}
      className="flex flex-col bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
    >
      <div className="flex items-start justify-between mb-4">
        {product.logo ? (
          <img
            src={product.logo}
            alt={`${product.name} logo`}
            loading="lazy"
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
        )}
        <div className="flex flex-col items-end gap-1.5">
          <StatusBadge status={product.status} />
          {product.featured && (
            <Badge variant="outline" className="border-primary/40 text-primary">
              Featured
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <VersionBadge version={product.version} />
      </div>

      <Badge variant="secondary" className="w-fit mb-3">
        {CATEGORY_LABELS[product.category]}
      </Badge>

      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">{product.shortDescription}</p>

      <div className="flex flex-wrap gap-3 mb-6">
        {product.platforms.map((platform) => (
          <PlatformBadge key={platform} platform={platform} />
        ))}
      </div>

      <div className="flex gap-3 mt-auto">
        <Button asChild className="flex-1">
          <Link to={`/products/${product.slug}`}>Learn More</Link>
        </Button>
        {hasDownloads && (
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/products/${product.slug}#downloads`}>Download</Link>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
