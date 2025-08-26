
import React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ActiveFiltersProps {
  selectedCategory: string | null;
  clearCategory: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedCategory,
  clearCategory
}) => {
  if (!selectedCategory) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <Badge 
        variant="outline" 
        className="px-2 py-1 flex items-center gap-1 bg-indigo-50 text-indigo-700 border-indigo-200">
        <span>{selectedCategory}</span>
        <X 
          className="h-3 w-3 cursor-pointer hover:text-indigo-900" 
          onClick={clearCategory}
        />
      </Badge>
    </div>
  );
};

export default ActiveFilters;
