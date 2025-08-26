
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ActiveFilterTagsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  categories: any[];
  activeFilterCount: number;
  handleClearSearch: () => void;
}

export const ActiveFilterTags: React.FC<ActiveFilterTagsProps> = ({
  searchQuery,
  setSearchQuery,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  categories,
  activeFilterCount,
  handleClearSearch,
}) => {
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
  
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      {searchQuery && (
        <Badge variant="secondary" className="py-1 px-2 gap-1 bg-secondary/10 hover:bg-secondary/20">
          <span>جستجو: {searchQuery}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 rounded-full p-0 hover:bg-muted"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {selectedExerciseType && (
        <Badge variant="secondary" className="py-1 px-2 gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          <span>نوع: {selectedExerciseType}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 rounded-full p-0 hover:bg-muted"
            onClick={() => setSelectedExerciseType(null)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {selectedCategory && (
        <Badge variant="secondary" className="py-1 px-2 gap-1 bg-secondary/10 hover:bg-secondary/20">
          <span>دسته‌بندی: {selectedCategory.name}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 rounded-full p-0 hover:bg-muted"
            onClick={() => setSelectedCategoryId(null)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {activeFilterCount > 1 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs text-muted-foreground hover:text-destructive"
          onClick={handleClearSearch}
        >
          پاک کردن همه
        </Button>
      )}
    </div>
  );
};
