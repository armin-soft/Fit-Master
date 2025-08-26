
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Dumbbell, Activity, Edit, Trash2 } from "lucide-react";

interface ExerciseTableContentProps {
  exercises: Exercise[];
  categories: ExerciseCategory[];
  selectedExercises: number[];
  onSelectAll: (checked: boolean) => void;
  onSelectExercise: (id: number, checked: boolean) => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (ids: number[]) => void;
  onClearFilters?: () => void;
  isMobile?: boolean;
}

export const ExerciseTableContent: React.FC<ExerciseTableContentProps> = ({
  exercises,
  categories,
  selectedExercises,
  onSelectAll,
  onSelectExercise,
  onEdit,
  onDelete,
  onClearFilters,
  isMobile
}) => {
  const allSelected = exercises.length > 0 && selectedExercises.length === exercises.length;
  const isIndeterminate = selectedExercises.length > 0 && selectedExercises.length < exercises.length;

  return (
    <div className="relative rounded-lg border border-brand-100 dark:border-brand-800 overflow-hidden w-full">
      <div className="w-full overflow-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] lg:max-h-[65vh]">
        <Table className="min-w-[450px] sm:min-w-[500px] w-full">
          <TableHeader className="sticky top-0 z-10 bg-white dark:bg-gray-800">
            <TableRow className="bg-gradient-to-r from-brand-50 to-info-50 dark:from-brand-900/30 dark:to-info-900/30 hover:bg-brand-50/50 dark:hover:bg-brand-900/20">
              <TableHead className="w-[40px] text-center py-2 sm:py-3">
                <Checkbox 
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                  className={cn(
                    "h-3.5 w-3.5 sm:h-4 sm:w-4 data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600",
                    isIndeterminate && "data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600"
                  )}
                />
              </TableHead>
              <TableHead className="font-bold text-brand-800 dark:text-brand-300 whitespace-nowrap py-2 sm:py-3 text-xs sm:text-sm">ردیف</TableHead>
              <TableHead className="font-bold text-brand-800 dark:text-brand-300 whitespace-nowrap py-2 sm:py-3 text-xs sm:text-sm">نام حرکت</TableHead>
              <TableHead className="font-bold text-brand-800 dark:text-brand-300 whitespace-nowrap py-2 sm:py-3 text-xs sm:text-sm">دسته‌بندی</TableHead>
              <TableHead className="w-[80px] sm:w-[100px] text-center font-bold text-brand-800 dark:text-brand-300 whitespace-nowrap py-2 sm:py-3 text-xs sm:text-sm">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercises.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={5} 
                  className="text-center h-24 sm:h-32 text-muted-foreground animate-fade-in"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Dumbbell className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-brand-200 dark:text-brand-700" />
                    <p className="text-sm sm:text-base">هیچ حرکتی یافت نشد</p>
                    {onClearFilters && (
                      <Button variant="link" onClick={onClearFilters} className="text-brand-500 dark:text-brand-400 text-xs sm:text-sm">
                        پاک کردن فیلترها
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              exercises.map((exercise, index) => {
                const category = categories.find(cat => cat.id === exercise.categoryId);
                const isSelected = selectedExercises.includes(exercise.id);
                
                return (
                  <TableRow 
                    key={exercise.id}
                    className={cn(
                      "hover:bg-brand-50/50 dark:hover:bg-brand-900/20 transition-colors duration-200 border-b border-brand-100 dark:border-brand-800",
                      isSelected && "bg-brand-50 dark:bg-brand-900/30"
                    )}
                  >
                    <TableCell className="text-center py-2 sm:py-3">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={(checked) => onSelectExercise(exercise.id, !!checked)}
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600"
                      />
                    </TableCell>
                    <TableCell className="text-center py-2 sm:py-3 text-xs sm:text-sm">
                      {toPersianNumbers(index + 1)}
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 text-xs sm:text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-600 dark:text-brand-400" />
                        {exercise.name}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 sm:py-3 text-xs sm:text-sm text-muted-foreground">
                      {category?.name || 'دسته‌بندی نشده'}
                    </TableCell>
                    <TableCell className="text-center py-2 sm:py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6 sm:h-7 sm:w-7 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/30"
                          onClick={() => onEdit(exercise)}
                        >
                          <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6 sm:h-7 sm:w-7 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                          onClick={() => onDelete([exercise.id])}
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExerciseTableContent;
