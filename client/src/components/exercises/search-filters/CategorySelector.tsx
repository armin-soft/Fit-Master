
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface CategorySelectorProps {
  categories: any[];
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  const getCategoryName = () => {
    if (!selectedCategoryId) return "انتخاب دسته‌بندی";
    const category = categories.find((cat) => cat.id === selectedCategoryId);
    return category?.name || "انتخاب دسته‌بندی";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between"
          disabled={categories.length === 0}
        >
          {getCategoryName()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>دسته‌بندی حرکت</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenuItem
            key={category.id}
            className={cn(
              "flex items-center justify-between",
              selectedCategoryId === category.id ? "bg-brand-50 text-brand-700 font-medium" : ""
            )}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.name}
            {selectedCategoryId === category.id && <Check className="h-4 w-4 text-brand-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
