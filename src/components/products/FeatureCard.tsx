import { motion } from "framer-motion";
import type { ProductFeature } from "@/types/product";

interface FeatureCardProps {
  feature: ProductFeature;
  index?: number;
}

const FeatureCard = ({ feature, index = 0 }: FeatureCardProps) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
    >
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>
      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
      <p className="text-muted-foreground text-sm">{feature.description}</p>
    </motion.div>
  );
};

export default FeatureCard;
