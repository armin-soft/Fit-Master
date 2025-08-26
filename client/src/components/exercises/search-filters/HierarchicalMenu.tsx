
import React, { useState } from "react";
import { Menu, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TypeSelector } from "./TypeSelector";

interface HierarchicalMenuProps {
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: string[];
  filteredCategories: any[];
  onAddType?: () => void;
  onAddCategory?: () => void;
}

export const HierarchicalMenu: React.FC<HierarchicalMenuProps> = ({
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  filteredCategories,
  onAddType,
  onAddCategory
}) => {
  const getSelectedTypeName = () => {
    return selectedExerciseType || "انتخاب نوع تمرین";
  };
  
  const getSelectedCategoryName = () => {
    if (!selectedCategoryId) return "انتخاب دسته‌بندی";
    const category = filteredCategories.find(cat => cat.id === selectedCategoryId);
    return category?.name || "انتخاب دسته‌بندی";
  };

  return (
    <Card className="p-4 flex flex-col gap-3 bg-gradient-to-br from-emerald-50/50 to-sky-50/50 dark:from-emerald-900/20 dark:to-sky-900/20 border-emerald-200 dark:border-emerald-800">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-emerald-700 dark:text-emerald-400">نوع تمرین</label>
        <TypeSelector 
          exerciseTypes={exerciseTypes}
          selectedType={selectedExerciseType}
          onSelectType={type => {
            setSelectedExerciseType(type);
            // Reset category when type changes
            setSelectedCategoryId(null);
          }}
          onAddType={onAddType}
        />
      </div>
      
      {selectedExerciseType && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-sky-700 dark:text-sky-400">دسته‌بندی</label>
          {filteredCategories.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-1">
              {filteredCategories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategoryId === category.id ? "default" : "outline"}
                  className={cn(
                    "text-sm h-8 transition-all duration-200",
                    selectedCategoryId === category.id
                      ? "bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white"
                      : "bg-white hover:bg-emerald-50 dark:bg-gray-800 dark:hover:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700"
                  )}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  {category.name}
                </Button>
              ))}
              {onAddCategory && (
                <Button
                  variant="outline"
                  className="text-sm h-8 border-dashed border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                  onClick={onAddCategory}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  افزودن
                </Button>
              )}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground p-2 border border-dashed rounded-md text-center border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-900/20">
              هیچ دسته‌بندی برای این نوع تمرین یافت نشد
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 mt-1">
        <Menu className="h-3 w-3 ml-1" />
        <span>
          {selectedExerciseType && selectedCategoryId ? (
            `${getSelectedTypeName()} › ${getSelectedCategoryName()}`
          ) : selectedExerciseType ? (
            `${getSelectedTypeName()} › انتخاب دسته‌بندی`
          ) : (
            "لطفاً مسیر انتخاب را تکمیل کنید"
          )}
        </span>
      </div>
    </Card>
  );
};
