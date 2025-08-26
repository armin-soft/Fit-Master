
import React from "react";
import { useExercisesStage } from "../../hooks/useExercisesStage";
import ExerciseHeader from "./ExerciseHeader";
import ExercisesList from "./ExercisesList";
import QuickSpeechAdd from "./QuickSpeechAdd";
import ExerciseDialogs from "./ExerciseDialogs";
import BackNavigation from "./BackNavigation";
import { useDataRefresh } from "@/hooks/useDataRefresh";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Grid3X3, ListOrdered, CheckSquare, Square, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExercisesStageProps {
  categoryId: string | null;
  typeId: string | null;
  onBackToCategories?: () => void;
  onBackToTypes?: () => void;
  onAddClick?: () => void;
  onRegisterAddHandler?: (handler: () => void) => void;
}

const ExercisesStage = React.memo(({ 
  categoryId, 
  typeId, 
  onBackToCategories, 
  onBackToTypes,
  onAddClick,
  onRegisterAddHandler 
}: ExercisesStageProps) => {
  // Auto-refresh data for exercises
  useDataRefresh({
    keys: ['exercises', 'exerciseCategories']
  });

  const {
    isLoading,
    filteredExercises,
    selectedCategory,
    selectedExerciseIds,
    setSelectedExerciseIds,
    viewMode,
    setViewMode,
    handleEditExercise,
    handleDeleteExercise,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedExercise,
    formData,
    setFormData,
    handleSubmit,
    quickSpeechText,
    setQuickSpeechText,
    handleQuickAdd,
    showQuickSpeech,
    setShowQuickSpeech
  } = useExercisesStage({ categoryId, typeId });

  // Register the add handler with the parent component
  React.useEffect(() => {
    if (onRegisterAddHandler) {
      const handler = () => setIsAddDialogOpen(true);
      onRegisterAddHandler(handler);
    }
  }, [onRegisterAddHandler, setIsAddDialogOpen]);

  // Handle select all functionality
  const handleSelectAll = () => {
    const allExerciseIds = filteredExercises.map(exercise => exercise.id);
    setSelectedExerciseIds(allExerciseIds);
  };

  // Handle deselect all functionality
  const handleDeselectAll = () => {
    setSelectedExerciseIds([]);
  };

  // Check if all exercises are selected
  const allSelected = filteredExercises.length > 0 && selectedExerciseIds.length === filteredExercises.length;

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-emerald-50/30 to-sky-50/30 dark:from-emerald-900/10 dark:to-sky-900/10">
      {/* Back Navigation */}
      <div className="flex-shrink-0 mb-4">
        <BackNavigation
          onBackToCategories={onBackToCategories}
          onBackToTypes={onBackToTypes}
          selectedCategory={selectedCategory || undefined}
        />
      </div>

      {/* Controls for delete and view toggle */}
      <div className="flex-shrink-0 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            حرکات تمرینی ({toPersianNumbers(filteredExercises.length)})
          </h3>
          
          <div className="flex items-center gap-2">
            {/* Select/Deselect All Buttons */}
            {filteredExercises.length > 0 && (
              <>
                {!allSelected ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSelectAll}
                    className="border-emerald-500/50 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-400/50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                  >
                    <CheckSquare className="h-4 w-4 ml-2" />
                    انتخاب همه ({toPersianNumbers(filteredExercises.length)})
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDeselectAll}
                    className="border-gray-500/50 text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-400/50 dark:text-gray-400 dark:hover:bg-gray-900/20"
                  >
                    <X className="h-4 w-4 ml-2" />
                    لغو انتخاب
                  </Button>
                )}
              </>
            )}

            {/* Delete Selected Button */}
            {selectedExerciseIds.length > 0 && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 ml-2" />
                حذف انتخابی ({toPersianNumbers(selectedExerciseIds.length)})
              </Button>
            )}
            
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "grid" | "list")}
            >
              <TabsList className="bg-muted/30">
                <TabsTrigger value="grid" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-sky-600 data-[state=active]:text-white">
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-sky-600 data-[state=active]:text-white">
                  <ListOrdered className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <ExercisesList
          filteredExercises={filteredExercises}
          selectedCategory={selectedCategory || undefined}
          selectedExerciseIds={selectedExerciseIds}
          setSelectedExerciseIds={setSelectedExerciseIds}
          viewMode={viewMode}
          onEditExercise={handleEditExercise}
          onDeleteExercise={handleDeleteExercise}
          onAddExercise={() => setIsAddDialogOpen(true)}
        />
      </div>

      {showQuickSpeech && (
        <div className="flex-shrink-0 border-t bg-background border-emerald-200 dark:border-emerald-800">
          <QuickSpeechAdd
            onQuickAdd={handleQuickAdd}
            quickSpeechText={quickSpeechText}
            setQuickSpeechText={setQuickSpeechText}
          />
        </div>
      )}

      <ExerciseDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        selectedExercise={selectedExercise}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSubmit}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onDelete={handleDeleteExercise}
        selectedExerciseIds={selectedExerciseIds}
      />
    </div>
  );
});

ExercisesStage.displayName = "ExercisesStage";

export default ExercisesStage;
