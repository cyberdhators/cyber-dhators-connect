import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SORT_LABELS } from "@/data/products";
import type { SortOption } from "@/types/product";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => (
  <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
    <SelectTrigger className="w-full sm:w-[180px]" aria-label="Sort products">
      <SelectValue placeholder="Sort by" />
    </SelectTrigger>
    <SelectContent>
      {Object.entries(SORT_LABELS).map(([value, label]) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default SortDropdown;
