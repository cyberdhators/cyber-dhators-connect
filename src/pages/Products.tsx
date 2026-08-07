import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import usePageTitle from "@/hooks/usePageTitle";
import useMetaDescription from "@/hooks/useMetaDescription";
import ProductBreadcrumb from "@/components/products/ProductBreadcrumb";
import SearchBar from "@/components/products/SearchBar";
import FilterBar from "@/components/products/FilterBar";
import SortDropdown from "@/components/products/SortDropdown";
import ProductGrid from "@/components/products/ProductGrid";
import { CATEGORY_LABELS, filterProductsByCategory, getAllProducts, searchProducts, sortProducts } from "@/data/products";
import type { ProductCategory, SortOption } from "@/types/product";

type CategoryValue = "all" | ProductCategory;

const CATEGORIES = Object.keys(CATEGORY_LABELS) as CategoryValue[];

const Products = () => {
  usePageTitle("Our Products | Cyber Dhators");
  useMetaDescription(
    "Browse Cyber Dhators' full catalog of software products — desktop, mobile, and web apps built for Africa and beyond.",
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryValue>("all");
  const [sort, setSort] = useState<SortOption>("featured");

  const visibleProducts = useMemo(() => {
    const searched = searchProducts(getAllProducts(), search);
    const filtered = filterProductsByCategory(searched, category);
    return sortProducts(filtered, sort);
  }, [search, category, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <ProductBreadcrumb />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="cyber-gradient">Our Products</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Building innovative software solutions that solve real-world problems across Africa and beyond.
            </p>
            <Button asChild size="lg" className="group">
              <a href="#catalog">
                Browse the Catalog
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <div id="catalog" className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
            <div className="w-full lg:max-w-sm">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <FilterBar categories={CATEGORIES} active={category} onChange={setCategory} />
              <SortDropdown value={sort} onChange={setSort} />
            </div>
          </div>

          <ProductGrid products={visibleProducts} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
