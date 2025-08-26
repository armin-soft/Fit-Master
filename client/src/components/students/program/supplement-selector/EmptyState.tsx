
import React from "react";
import { Pill } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  searchQuery: string;
  selectedCategory: string | null;
  clearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  selectedCategory,
  clearFilters
}) => {
  return (
    <div className="col-span-full text-center p-8">
      <div className="flex justify-center mb-3">
        <div className="rounded-full bg-violet-100 p-3">
          <Pill className="h-6 w-6 text-violet-500" />
        </div>
      </div>
      <h3 className="text-lg font-medium mb-1">موردی یافت نشد</h3>
      <p className="text-muted-foreground text-sm">
        با تغییر معیارهای جستجو یا فیلتر، موارد بیشتری را مشاهده کنید
      </p>
      {(searchQuery || selectedCategory) && (
        <Button 
          variant="outline" 
          className="mt-3"
          onClick={clearFilters}
        >
          پاک کردن فیلترها
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
