
import { Tag, FolderTree, Activity } from "lucide-react";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { TypesTabContent } from "@/components/exercises/tabs/TypesTabContent";
import { CategoriesTabContent } from "@/components/exercises/tabs/CategoriesTabContent";
import { ExercisesTabContent } from "@/components/exercises/tabs/ExercisesTabContent";

interface ExercisePageTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  state: any;
  handlers: any;
}

export const ExercisePageTabs = ({
  activeTab,
  setActiveTab,
  state,
  handlers
}: ExercisePageTabsProps) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex-1 flex flex-col overflow-hidden"
    >
      <TabsList className="bg-muted/30 p-1 flex justify-center mb-4">
        <TabsTrigger value="types" className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500 data-[state=active]:to-info-500 data-[state=active]:text-white">
          <Tag className="h-4 w-4" />
          <span className="hidden xs:inline">انواع حرکات</span>
        </TabsTrigger>
        <TabsTrigger value="categories" className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500 data-[state=active]:to-info-500 data-[state=active]:text-white">
          <FolderTree className="h-4 w-4" />
          <span className="hidden xs:inline">دسته بندی‌ها</span>
        </TabsTrigger>
        <TabsTrigger value="exercises" className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500 data-[state=active]:to-info-500 data-[state=active]:text-white">
          <Activity className="h-4 w-4" />
          <span className="hidden xs:inline">حرکات</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="types" className="flex flex-col flex-1 space-y-4 outline-none">
        <TypesTabContent
          exerciseTypes={state.exerciseTypes}
          selectedType={state.selectedType}
          onSelectType={state.setSelectedType}
          onAddType={handlers.handleAddType}
          onEditType={handlers.handleEditType}
          onDeleteType={handlers.handleDeleteType}
          categories={state.categories}
        />
      </TabsContent>

      <TabsContent value="categories" className="flex flex-col flex-1 space-y-4 outline-none">
        <CategoriesTabContent
          selectedType={state.selectedType}
          filteredCategories={state.filteredCategories}
          exerciseTypes={state.exerciseTypes}
          onAddCategory={handlers.handleAddCategory}
          onEditCategory={handlers.handleEditCategory}
          onDeleteCategory={handlers.handleDeleteCategory}
          exercises={state.exercises}
        />
      </TabsContent>

      <TabsContent value="exercises" className="flex flex-col flex-1 space-y-4 outline-none">
        <ExercisesTabContent
          filteredCategories={state.filteredCategories}
          categories={state.categories}
          filteredExercises={state.filteredExercises}
          selectedCategoryId={state.selectedCategoryId}
          setSelectedCategoryId={state.setSelectedCategoryId}
          searchQuery={state.searchQuery}
          setSearchQuery={state.setSearchQuery}
          sortOrder={state.sortOrder}
          toggleSortOrder={state.toggleSortOrder}
          viewMode={state.viewMode}
          setViewMode={state.setViewMode}
          onAddExercise={handlers.handleAddExercise}
          onEditExercise={handlers.handleEditExercise}
          onDeleteExercises={handlers.handleDeleteExercises}
          isAscending={state.isAscending}
          onSort={handlers.handleSort}
        />
      </TabsContent>
    </Tabs>
  );
};
