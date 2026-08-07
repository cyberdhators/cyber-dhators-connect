import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Search products..." }: SearchBarProps) => (
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
    <Input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search products"
      className="pl-9 pr-9"
    />
    {value && (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Clear search"
        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
        onClick={() => onChange("")}
      >
        <X className="h-4 w-4" />
      </Button>
    )}
  </div>
);

export default SearchBar;
