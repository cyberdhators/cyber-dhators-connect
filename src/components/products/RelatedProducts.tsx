import type { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
      <ProductGrid products={products} />
    </section>
  );
};

export default RelatedProducts;
