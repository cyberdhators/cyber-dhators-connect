import type { ProductFeature } from "@/types/product";
import FeatureCard from "./FeatureCard";

interface FeatureGridProps {
  features: ProductFeature[];
}

const FeatureGrid = ({ features }: FeatureGridProps) => {
  if (features.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} feature={feature} index={index} />
      ))}
    </div>
  );
};

export default FeatureGrid;
