
import { Button } from "@/components/ui/button";
import { FolderTree, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryTable } from "@/components/exercises/CategoryTable";
import { ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

interface CategoriesTabContentProps {
  selectedType: string;
  filteredCategories: ExerciseCategory[];
  exerciseTypes: string[];
  onAddCategory: () => void;
  onEditCategory: (category: ExerciseCategory) => void;
  onDeleteCategory: (category: ExerciseCategory, exercises: any[]) => void;
  exercises: any[];
}

export const CategoriesTabContent = ({
  selectedType,
  filteredCategories,
  exerciseTypes,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  exercises
}: CategoriesTabContentProps) => {
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (exerciseTypes.length === 0) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "ابتدا باید یک نوع حرکت ایجاد کنید"
      });
      return;
    }
    onAddCategory();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-brand-500" />
          دسته‌بندی‌های {selectedType || "حرکات"}
        </h3>
        
        <Button
          onClick={handleAddCategory}
          className="bg-gradient-to-r from-brand-500 to-info-600 hover:from-brand-600 hover:to-info-700 text-white shadow-brand-200 shadow-lg transition-all duration-300 hover:scale-105"
          size="sm"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
          افزودن دسته‌بندی
        </Button>
      </div>

      <motion.div 
        className="flex-1 min-h-0 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CategoryTable 
          categories={filteredCategories}
          onAdd={handleAddCategory}
          onEdit={onEditCategory}
          onDelete={(category) => onDeleteCategory(category, exercises)}
        />
      </motion.div>
    </>
  );
};
