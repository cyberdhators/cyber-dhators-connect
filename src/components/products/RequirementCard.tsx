import { Check } from "lucide-react";

interface RequirementCardProps {
  title: string;
  items: string[];
}

const RequirementCard = ({ title, items }: RequirementCardProps) => (
  <div className="bg-card border border-border rounded-xl p-6">
    <h4 className="font-bold mb-3">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default RequirementCard;
