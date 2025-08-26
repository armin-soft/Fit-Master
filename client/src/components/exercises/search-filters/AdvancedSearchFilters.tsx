
import React from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { ActiveFilterTags } from "./ActiveFilterTags";
import { HierarchicalMenu } from "./HierarchicalMenu";

interface AdvancedSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: any[];
  categories: any[];
  filteredCategories: any[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  onAddType?: () => void;
  onAddCategory?: () => void;
}

export const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  categories,
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder,
  onAddType,
  onAddCategory,
}) => {
  const hasFilters = selectedExerciseType || selectedCategoryId;
  const activeFilterCount = [
    selectedExerciseType ? 1 : 0,
    selectedCategoryId ? 1 : 0,
  ].reduce((a, b) => a + b, 0);
  
  const deviceInfo = useDeviceInfo();

  // Responsive background classes
  const getBgClass = () => {
    if (deviceInfo.isMobile) {
      return "sticky top-0 z-30 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-xl pb-3 px-1 pt-2";
    }
    return "sticky top-0 z-30 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-xl pb-3 px-1 pt-2";
  };

  return (
    <div className={getBgClass()}>
      <div className={`flex flex-col gap-2 ${deviceInfo.isTablet ? "md:flex-row md:gap-3" : deviceInfo.isMobile ? "gap-2" : "md:flex-row md:gap-3"}`}>
        {/* Hierarchical Menu with TypeSelector */}
        <HierarchicalMenu
          selectedExerciseType={selectedExerciseType}
          setSelectedExerciseType={setSelectedExerciseType}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          exerciseTypes={exerciseTypes}
          filteredCategories={filteredCategories}
          onAddType={onAddType}
          onAddCategory={onAddCategory}
        />
      </div>
      
      {/* Active Filter Tags */}
      {hasFilters && (
        <ActiveFilterTags
          searchQuery=""
          setSearchQuery={setSearchQuery}
          selectedExerciseType={selectedExerciseType}
          setSelectedExerciseType={setSelectedExerciseType}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          categories={categories}
          activeFilterCount={activeFilterCount}
          handleClearSearch={handleClearSearch}
        />
      )}
    </div>
  );
};
