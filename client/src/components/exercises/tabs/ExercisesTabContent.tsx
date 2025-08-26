
import { motion } from "framer-motion";
import { Dumbbell, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import ExerciseTableMain from "@/components/exercises/table/ExerciseTableMain";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ExercisesTabHeader } from "./ExercisesTabHeader";
import { ExercisesTabFilters } from "./ExercisesTabFilters";
import { useExercisesTabLogic } from "./hooks/useExercisesTabLogic";

interface ExercisesTabContentProps {
  filteredCategories: ExerciseCategory[];
  categories: ExerciseCategory[];
  filteredExercises: Exercise[];
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onAddExercise: () => void;
  onEditExercise: (exercise: Exercise) => void;
  onDeleteExercises: (ids: number[]) => boolean;
  isAscending: boolean;
  onSort: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export const ExercisesTabContent = ({
  filteredCategories,
  categories,
  filteredExercises,
  selectedCategoryId,
  setSelectedCategoryId,
  searchQuery,
  setSearchQuery,
  sortOrder,
  toggleSortOrder,
  viewMode,
  setViewMode,
  onAddExercise,
  onEditExercise,
  onDeleteExercises,
  isAscending,
  onSort
}: ExercisesTabContentProps) => {
  const {
    isDeleteAllDialogOpen,
    setIsDeleteAllDialogOpen,
    handleAddExercise,
    handleDeleteAll,
    confirmDeleteAll
  } = useExercisesTabLogic({
    filteredCategories,
    filteredExercises,
    onAddExercise,
    onDeleteExercises
  });

  const hasCategories = filteredCategories.length > 0;

  if (!hasCategories) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
        <FolderTree className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
        <h3 className="font-medium text-lg mb-1">هیچ دسته‌بندی ایجاد نشده است</h3>
        <p className="text-muted-foreground text-sm mb-4">
          ابتدا باید دسته‌بندی‌های مورد نظر خود را ایجاد کنید.
        </p>
      </div>
    );
  }

  return (
    <>
      <ExercisesTabHeader
        filteredCategories={filteredCategories}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredExercisesCount={filteredExercises.length}
        onAddExercise={handleAddExercise}
        onDeleteAll={handleDeleteAll}
      />

      <ExercisesTabFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <motion.div 
        className="flex-1 min-h-0 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {viewMode === "list" ? (
          <ExerciseTableMain
            exercises={filteredExercises}
            categories={categories}
            onAdd={handleAddExercise}
            onEdit={onEditExercise}
            onDelete={onDeleteExercises}
            onSort={onSort}
            isAscending={isAscending}
          />
        ) : (
          <motion.div 
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <motion.div key={exercise.id} variants={itemVariants}>
                  <ExerciseCard 
                    exercise={exercise}
                    category={categories.find(cat => cat.id === exercise.categoryId)}
                    isSelected={false}
                    viewMode="grid"
                    onClick={() => onEditExercise(exercise)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
                <h3 className="font-medium text-lg mb-1">هیچ حرکتی یافت نشد</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {searchQuery ? "با معیارهای جستجوی فعلی حرکتی پیدا نشد." : "برای این دسته‌بندی هنوز حرکتی اضافه نشده است."}
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSearchQuery("")}
                  >
                    پاک کردن جستجو
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      <ConfirmationDialog
        isOpen={isDeleteAllDialogOpen}
        onClose={() => setIsDeleteAllDialogOpen(false)}
        onConfirm={confirmDeleteAll}
        title="حذف همه حرکات"
        description={`آیا از حذف همه ${toPersianNumbers(filteredExercises.length)} حرکت نمایش داده شده اطمینان دارید؟ این عملیات قابل بازگشت نیست.`}
        confirmText="حذف همه"
        cancelText="انصراف"
        variant="destructive"
      />
    </>
  );
};
