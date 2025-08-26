import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { ExercisePageHeader } from "@/components/exercises/ExercisePageHeader";
import { ExerciseStatsSection } from "./ExerciseStatsSection";
import { ExercisePageTabs } from "./ExercisePageTabs";
import { TypeDialog } from "@/components/exercises/TypeDialog";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { ExerciseDialogMain } from "@/components/exercises/dialog/ExerciseDialogMain";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useExercisePageState } from "../hooks/useExercisePageState";
import { useExercisePageHandlers } from "../hooks/useExercisePageHandlers";
import { useDataRefresh } from "@/hooks/useDataRefresh";

export const ExercisePageContainer = () => {
  const deviceInfo = useDeviceInfo();
  const state = useExercisePageState();
  const handlers = useExercisePageHandlers(state);

  // Auto-refresh exercise data
  useDataRefresh({
    keys: ['exercises', 'exerciseCategories', 'exerciseTypes']
  });

  // Responsive spacing based on device type
  const getResponsiveClasses = () => {
    if (deviceInfo.isMobile) {
      return "space-y-2 p-2";
    } else if (deviceInfo.isTablet) {
      return "space-y-3 p-3";
    } else if (deviceInfo.isSmallLaptop) {
      return "space-y-4 p-4"; 
    } else {
      return "space-y-6 p-6";
    }
  };

  return (
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      className="w-full h-full min-h-screen overflow-x-hidden"
    >
      <div className={`w-full h-full flex flex-col overflow-x-hidden ${getResponsiveClasses()}`}>
        <div className="flex-shrink-0">
          <ExercisePageHeader />
        </div>
        
        <div className="flex-shrink-0">
          <ExerciseStatsSection
            exerciseTypesCount={state.exerciseTypes.length}
            categoriesCount={state.categories.length}
            exercisesCount={state.exercises.length}
          />
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <ExercisePageTabs
            activeTab={state.activeTab}
            setActiveTab={state.setActiveTab}
            state={state}
            handlers={handlers}
          />
        </div>

        <TypeDialog
          isOpen={state.isTypeDialogOpen}
          onOpenChange={state.setIsTypeDialogOpen}
          typeName={state.newTypeName}
          onTypeNameChange={state.setNewTypeName}
          onSave={handlers.handleSaveType}
          isEditing={!!state.editingType}
        />

        <CategoryDialog 
          isOpen={state.isCategoryDialogOpen}
          onOpenChange={state.setIsCategoryDialogOpen}
          exerciseTypes={state.exerciseTypes}
          selectedType={state.categoryFormData.type || state.selectedType || (state.exerciseTypes.length > 0 ? (typeof state.exerciseTypes[0] === 'object' ? state.exerciseTypes[0].name : state.exerciseTypes[0]) : "")}
          formData={state.categoryFormData}
          onFormDataChange={state.setCategoryFormData}
          onTypeChange={state.setSelectedType}
          onSave={handlers.handleSaveCategory}
        />

        <ExerciseDialogMain
          isOpen={state.isExerciseDialogOpen}
          onOpenChange={state.setIsExerciseDialogOpen}
          selectedExercise={state.selectedExercise}
          categories={state.filteredCategories}
          formData={state.exerciseFormData}
          onFormDataChange={state.setExerciseFormData}
          onSave={handlers.handleExerciseSave}
        />
      </div>
    </PageContainer>
  );
};
