
import React, { useState, useMemo } from "react";
import { Search, FolderTree, Plus, Edit, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CategoriesStageProps {
  typeId: string;
  onBack: () => void;
  onCategorySelect: (categoryId: string) => void;
  onEditCategory: (category: ExerciseCategory) => void;
}

export const CategoriesStage: React.FC<CategoriesStageProps> = ({
  typeId,
  onBack,
  onCategorySelect,
  onEditCategory
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, exercises, isLoading } = useExerciseData();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<ExerciseCategory | null>(null);
  
  // فیلتر کردن دسته‌بندی‌ها بر اساس نوع و عبارت جستجو
  const filteredCategories = useMemo(() => {
    return categories
      .filter(cat => cat.typeId?.toString() === typeId)
      .filter(cat => !searchTerm || cat.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [categories, typeId, searchTerm]);

  // حذف دسته‌بندی
  const handleDeleteCategory = (category: ExerciseCategory) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  // تأیید حذف دسته‌بندی
  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;
    
    // جلوگیری از فراخوانی چندباره
    setIsDeleteDialogOpen(false);
    
    try {      
      // بررسی آیا تمرینی برای این دسته‌بندی وجود دارد
      const hasExercises = exercises.some(ex => ex.categoryId === categoryToDelete.id);
      
      if (hasExercises) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "ابتدا باید تمام تمرین‌های این دسته بندی را حذف کنید"
        });
        setCategoryToDelete(null);
        return;
      }
      
      const response = await fetch(`/api/exercise-categories/${categoryToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        toast({
          variant: "destructive",
          title: "خطا",
          description: `خطا در حذف دسته‌بندی: ${errorData}`
        });
        setCategoryToDelete(null);
        return;
      }

      // Invalidate and refetch categories
      await queryClient.invalidateQueries({ queryKey: ["/api/exercise-categories"] });
      
      toast({
        title: "موفقیت",
        description: "دسته بندی با موفقیت حذف شد"
      });
      
      setCategoryToDelete(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف دسته بندی"
      });
      setCategoryToDelete(null);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">در حال بارگذاری دسته‌بندی‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="h-full flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack} className="flex items-center">
          <ChevronRight className="h-4 w-4 ml-1" />
          بازگشت به انواع تمرین
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجوی دسته‌بندی..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 pr-10"
        />
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.div 
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.07 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => {
              // شمارش تعداد تمرینات برای هر دسته‌بندی
              const exerciseCount = exercises.filter(ex => ex.categoryId === category.id).length;
              
              return (
                <motion.div 
                  key={category.id}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group"
                >
                  <div
                    className="h-full cursor-pointer bg-gradient-to-br from-teal-50 to-white dark:from-teal-950 dark:to-gray-900 border border-teal-100 dark:border-teal-900 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl p-4"
                    onClick={() => onCategorySelect(category.id.toString())}
                  >
                    <div className="flex flex-col h-full">
                      <div className="bg-gradient-to-r from-teal-600/80 to-cyan-600/80 p-5 flex items-center justify-center text-white rounded-lg mb-4">
                        <FolderTree className="h-8 w-8" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold mb-2 text-center group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <div className="mt-2 text-xs text-center bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-300 py-1 px-2 rounded-full">
                          {toPersianNumbers(exerciseCount)} تمرین
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity duration-300">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 bg-white hover:bg-sky-50 text-sky-600 shadow-sm rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditCategory(category);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 bg-white hover:bg-red-50 text-red-600 shadow-sm rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
              <FolderTree className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
              <h3 className="font-medium text-lg mb-1">هیچ دسته‌بندی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {searchTerm ? 
                  "با عبارت جستجو شده هیچ دسته‌بندی پیدا نشد." :
                  "برای این نوع تمرین هنوز دسته‌بندی تعریف نشده است."}
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSearchTerm("")}
                >
                  پاک کردن جستجو
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* دیالوگ تأیید حذف */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDeleteCategory}
        title="حذف دسته‌بندی"
        description={`آیا از حذف دسته‌بندی «${categoryToDelete?.name}» اطمینان دارید؟`}
        confirmText="حذف"
        cancelText="انصراف"
        variant="destructive"
      />
    </motion.div>
  );
};

export default CategoriesStage;
