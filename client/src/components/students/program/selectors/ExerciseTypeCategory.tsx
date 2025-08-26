
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { HierarchicalMenu } from "@/components/exercises/search-filters/HierarchicalMenu";

interface ExerciseTypeCategoryProps {
  selectedType: string | null;
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
  selectedCategoryId: number | null;
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  exerciseTypes: any[];
  filteredCategories: any[];
  filteredExercises: any[];
  clearFilters: () => void;
}

const ExerciseTypeCategory: React.FC<ExerciseTypeCategoryProps> = ({
  selectedType,
  setSelectedType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  filteredCategories,
  filteredExercises,
  clearFilters
}) => {
  return (
    <>
      <div className="mb-4">
        <HierarchicalMenu
          selectedExerciseType={selectedType}
          setSelectedExerciseType={setSelectedType}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          exerciseTypes={exerciseTypes}
          filteredCategories={filteredCategories}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {selectedType && selectedCategoryId ? (
            <span>
              نمایش {toPersianNumbers(filteredExercises.length)} تمرین برای{" "}
              <span className="font-semibold">{selectedType}</span>{" - "}
              <span className="font-semibold">
                {filteredCategories.find(c => c.id === selectedCategoryId)?.name}
              </span>
            </span>
          ) : selectedType ? (
            <span>لطفاً یک دسته‌بندی انتخاب کنید</span>
          ) : (
            <span>لطفاً ابتدا نوع تمرین را انتخاب کنید</span>
          )}
        </div>

        {(selectedType || selectedCategoryId) && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            پاک کردن فیلترها
            <X className="h-3 w-3 mr-1" />
          </Button>
        )}
      </div>
    </>
  );
};

export default ExerciseTypeCategory;
