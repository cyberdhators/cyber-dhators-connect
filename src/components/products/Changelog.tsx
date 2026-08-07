import type { ChangelogEntry } from "@/types/product";

interface ChangelogProps {
  entries: ChangelogEntry[];
}

const Changelog = ({ entries }: ChangelogProps) => {
  if (entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      {sorted.map((entry) => (
        <div key={entry.version} className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h4 className="font-bold">Version {entry.version}</h4>
            <span className="text-sm text-muted-foreground shrink-0">
              {new Date(entry.date).toLocaleDateString()}
            </span>
          </div>
          <ul className="space-y-1.5">
            {entry.changes.map((change, idx) => (
              <li key={idx} className="flex items-start text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-1.5 shrink-0" />
                {change}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Changelog;
