import { Monitor, Apple, Smartphone, ShoppingBag, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProductDownloads } from "@/types/product";
import DownloadCard from "./DownloadCard";

const DOWNLOAD_CONFIG: Array<{ key: keyof ProductDownloads; label: string; icon: LucideIcon }> = [
  { key: "windows64", label: "Windows (64-bit)", icon: Monitor },
  { key: "windows32", label: "Windows (32-bit)", icon: Monitor },
  { key: "macAppleSilicon", label: "macOS (Apple Silicon)", icon: Apple },
  { key: "macIntel", label: "macOS (Intel)", icon: Apple },
  { key: "apk", label: "Android (APK)", icon: Smartphone },
  { key: "playStore", label: "Google Play", icon: ShoppingBag },
  { key: "appStore", label: "App Store", icon: Apple },
  { key: "linux", label: "Linux", icon: Terminal },
];

interface DownloadGridProps {
  downloads: ProductDownloads;
}

const DownloadGrid = ({ downloads }: DownloadGridProps) => {
  const available = DOWNLOAD_CONFIG.filter(({ key }) => downloads[key]);

  if (available.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-border rounded-xl">
        <p className="text-muted-foreground">Downloads aren't available yet — check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {available.map(({ key, label, icon }) => (
        <DownloadCard key={key} label={label} icon={icon} asset={downloads[key]!} />
      ))}
    </div>
  );
};

export default DownloadGrid;
