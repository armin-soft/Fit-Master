
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, FolderOpen } from "lucide-react";
import { ExerciseCategory } from "@/types/exercise";

interface BackNavigationProps {
  onBackToCategories?: () => void;
  onBackToTypes?: () => void;
  selectedCategory?: ExerciseCategory;
}

const BackNavigation: React.FC<BackNavigationProps> = ({
  onBackToCategories,
  onBackToTypes,
  selectedCategory
}) => {
  return (
    <div className="flex items-center gap-2 mb-4 p-2 bg-muted/30 rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBackToTypes}
        className="text-muted-foreground hover:text-foreground"
      >
        <Home className="w-4 h-4 ml-1" />
        انواع تمرین
      </Button>
      
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onBackToCategories}
        className="text-muted-foreground hover:text-foreground"
      >
        <FolderOpen className="w-4 h-4 ml-1" />
        دسته‌بندی‌ها
      </Button>
      
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
      
      <span className="text-sm font-medium text-foreground">
        {selectedCategory?.name || "تمرینات"}
      </span>
    </div>
  );
};

export default BackNavigation;
