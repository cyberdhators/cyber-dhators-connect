import { Monitor, Apple, Smartphone, Terminal, Globe } from "lucide-react";
import type { Platform } from "@/types/product";
import { cn } from "@/lib/utils";

const PLATFORM_CONFIG: Record<Platform, { icon: typeof Monitor; label: string }> = {
  windows: { icon: Monitor, label: "Windows" },
  macos: { icon: Apple, label: "macOS" },
  android: { icon: Smartphone, label: "Android" },
  ios: { icon: Smartphone, label: "iOS" },
  linux: { icon: Terminal, label: "Linux" },
  web: { icon: Globe, label: "Web" },
};

interface PlatformBadgeProps {
  platform: Platform;
  className?: string;
}

const PlatformBadge = ({ platform, className }: PlatformBadgeProps) => {
  const { icon: Icon, label } = PLATFORM_CONFIG[platform];

  return (
    <span
      className={cn("inline-flex items-center gap-1 text-xs text-muted-foreground", className)}
      title={label}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};

export default PlatformBadge;
