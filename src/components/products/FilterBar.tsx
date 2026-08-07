import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { CATEGORY_LABELS } from "@/data/products";
import type { ProductCategory } from "@/types/product";

type CategoryValue = "all" | ProductCategory;

interface FilterBarProps {
  categories: CategoryValue[];
  active: CategoryValue;
  onChange: (category: CategoryValue) => void;
}

const FilterButtons = ({ categories, active, onChange }: FilterBarProps) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((category) => (
      <Button
        key={category}
        type="button"
        variant={active === category ? "default" : "outline"}
        size="sm"
        aria-pressed={active === category}
        onClick={() => onChange(category)}
      >
        {CATEGORY_LABELS[category]}
      </Button>
    ))}
  </div>
);

const FilterBar = (props: FilterBarProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <FilterButtons {...props} />;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
          Filters
          {props.active !== "all" && ` · ${CATEGORY_LABELS[props.active]}`}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Filter by category</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <FilterButtons {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterBar;
