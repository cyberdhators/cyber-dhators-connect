import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

const ProductGrid = ({ products, emptyMessage = "No products match your search." }: ProductGridProps) => {
  if (products.length === 0) {
    return <p className="text-center text-muted-foreground py-16">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;
