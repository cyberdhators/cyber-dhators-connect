import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VersionBadgeProps {
  version: string;
  className?: string;
}

const VersionBadge = ({ version, className }: VersionBadgeProps) => (
  <Badge variant="outline" className={cn("font-mono text-xs", className)}>
    v{version}
  </Badge>
);

export default VersionBadge;
