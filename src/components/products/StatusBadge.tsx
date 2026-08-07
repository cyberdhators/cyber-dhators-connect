import { Badge } from "@/components/ui/badge";
import type { ProductStatus } from "@/types/product";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<ProductStatus, { label: string; className: string }> = {
  stable: { label: "Stable", className: "border-transparent bg-primary/15 text-primary hover:bg-primary/20" },
  beta: { label: "Beta", className: "border-transparent bg-amber-500/15 text-amber-500 hover:bg-amber-500/20" },
  "coming-soon": { label: "Coming Soon", className: "text-muted-foreground" },
};

interface StatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];
  const variant = status === "coming-soon" ? "outline" : undefined;

  return (
    <Badge variant={variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
