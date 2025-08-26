
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import ExerciseTableHeader from "./ExerciseTableHeader";
import ExerciseTableFilter from "./ExerciseTableFilter";
import ExerciseTableContent from "./ExerciseTableContent";
import ExerciseTableDeleteDialog from "./ExerciseTableDeleteDialog";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ExerciseTableMainProps {
  exercises: Exercise[];
  categories: ExerciseCategory[];
  onAdd: () => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (exerciseIds: number[]) => void;
  onSort: () => void;
  isAscending: boolean;
}

export function ExerciseTableMain({ 
  exercises,
  categories,
  onAdd,
  onEdit,
  onDelete,
  onSort,
  isAscending
}: ExerciseTableMainProps) {
  const deviceInfo = useDeviceInfo();
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [exercisesToDelete, setExercisesToDelete] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercises);

  // Responsive padding
  const getCardPadding = () => {
    if (deviceInfo.isMobile) {
      return "p-2 sm:p-3";
    } else if (deviceInfo.isTablet) {
      return "p-3 md:p-4";
    } else {
      return "p-4 lg:p-6";
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedExercises(filteredExercises.map(ex => ex.id));
    } else {
      setSelectedExercises([]);
    }
  };

  const handleSelectExercise = (exerciseId: number, checked: boolean) => {
    setSelectedExercises(prev => 
      checked 
        ? [...prev, exerciseId]
        : prev.filter(id => id !== exerciseId)
    );
  };

  const confirmDelete = (ids: number[]) => {
    setExercisesToDelete(ids);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    onDelete(exercisesToDelete);
    setIsDeleteDialogOpen(false);
    setExercisesToDelete([]);
    setSelectedExercises([]);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId(null);
  };

  useEffect(() => {
    let result = exercises;

    if (searchQuery) {
      result = result.filter(ex => 
        ex.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategoryId) {
      result = result.filter(ex => ex.categoryId === selectedCategoryId);
    }

    setFilteredExercises(result);
  }, [exercises, searchQuery, selectedCategoryId]);

  useEffect(() => {
    setSelectedExercises([]);
  }, [filteredExercises]);

  const hasActiveFilters = searchQuery !== "" || selectedCategoryId !== null;

  return (
    <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-brand-50/30 dark:from-gray-900 dark:to-brand-900/10 w-full h-full">
      <div className={`${getCardPadding()} h-full flex flex-col`}>
        <div className="flex-shrink-0 mb-3 sm:mb-4">
          <ExerciseTableHeader
            selectedCount={selectedExercises.length}
            onAdd={onAdd}
            onSort={onSort}
            onDelete={() => confirmDelete(selectedExercises)}
            isAscending={isAscending}
          />
        </div>

        <div className="flex-shrink-0 mb-3 sm:mb-4">
          <ExerciseTableFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={setSelectedCategoryId}
            categories={categories}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
            isMobile={deviceInfo.isMobile}
          />
        </div>

        <div className="flex-1 min-h-0 w-full">
          <ExerciseTableContent
            exercises={filteredExercises}
            categories={categories}
            selectedExercises={selectedExercises}
            onSelectAll={handleSelectAll}
            onSelectExercise={handleSelectExercise}
            onEdit={onEdit}
            onDelete={confirmDelete}
            onClearFilters={hasActiveFilters ? handleClearFilters : undefined}
            isMobile={deviceInfo.isMobile}
          />
        </div>
      </div>

      <ExerciseTableDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        exercisesToDelete={exercisesToDelete}
        exercises={exercises}
        onConfirmDelete={handleDelete}
      />
    </Card>
  );
}

export default ExerciseTableMain;
