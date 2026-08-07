import type { LucideIcon } from "lucide-react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DownloadAsset } from "@/types/product";

interface DownloadCardProps {
  label: string;
  icon: LucideIcon;
  asset: DownloadAsset;
}

const DownloadCard = ({ label, icon: Icon, asset }: DownloadCardProps) => (
  <div className="bg-card border border-border rounded-xl p-6 flex flex-col hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <h4 className="font-bold">{label}</h4>
    </div>

    <dl className="space-y-1 text-sm text-muted-foreground mb-4 flex-1">
      {asset.version && (
        <div className="flex justify-between gap-2">
          <dt>Version</dt>
          <dd className="font-mono">{asset.version}</dd>
        </div>
      )}
      {asset.size && (
        <div className="flex justify-between gap-2">
          <dt>Size</dt>
          <dd>{asset.size}</dd>
        </div>
      )}
      {asset.minOsVersion && (
        <div className="flex justify-between gap-2">
          <dt>Requires</dt>
          <dd>{asset.minOsVersion}</dd>
        </div>
      )}
      {asset.releaseDate && (
        <div className="flex justify-between gap-2">
          <dt>Released</dt>
          <dd>{new Date(asset.releaseDate).toLocaleDateString()}</dd>
        </div>
      )}
      {typeof asset.downloadCount === "number" && (
        <div className="flex justify-between gap-2">
          <dt>Downloads</dt>
          <dd>{asset.downloadCount.toLocaleString()}</dd>
        </div>
      )}
      {asset.checksum && (
        <div className="flex justify-between gap-2 truncate">
          <dt className="shrink-0">Checksum</dt>
          <dd className="font-mono text-xs truncate" title={asset.checksum}>
            {asset.checksum}
          </dd>
        </div>
      )}
    </dl>

    <Button asChild className="w-full">
      <a href={asset.url} download aria-label={`Download ${label}`}>
        <Download className="mr-2 h-4 w-4" aria-hidden="true" />
        Download
      </a>
    </Button>
  </div>
);

export default DownloadCard;
