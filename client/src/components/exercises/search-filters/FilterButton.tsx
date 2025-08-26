
import React, { useState } from "react";
import { Filter, X, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  VisuallyHidden,
} from "@/components/ui/dialog";
import { TypeSelector } from "./TypeSelector";
import { Badge } from "@/components/ui/badge";

interface FilterButtonProps {
  searchQuery: string;
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: string[];
  filteredCategories: any[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  activeFilterCount: number;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  searchQuery,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder,
  activeFilterCount,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="flex h-10 items-center gap-1 bg-white hover:bg-emerald-50 dark:bg-gray-800 dark:hover:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700"
      >
        <Filter className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span>فیلترها</span>
        {activeFilterCount > 0 && (
          <Badge
            variant="secondary"
            className="h-5 w-5 rounded-full p-0 flex items-center justify-center ml-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
          >
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-emerald-700 dark:text-emerald-400">فیلتر حرکات</DialogTitle>
            <VisuallyHidden>
              <DialogDescription>
                فیلتر و مرتب‌سازی حرکات ورزشی بر اساس نوع و دسته‌بندی
              </DialogDescription>
            </VisuallyHidden>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="space-y-2">
              <h3 className="text-base font-medium text-emerald-600 dark:text-emerald-400">نوع تمرین</h3>
              <div className="w-full">
                <TypeSelector
                  exerciseTypes={exerciseTypes}
                  selectedType={selectedExerciseType}
                  onSelectType={setSelectedExerciseType}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                انتخاب نوع تمرین، دسته‌بندی‌های قابل انتخاب را فیلتر می‌کند.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-medium text-sky-600 dark:text-sky-400">دسته‌بندی</h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedExerciseType ? (
                  filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategoryId === category.id ? "default" : "outline"}
                        className={`justify-start transition-all duration-200 ${
                          selectedCategoryId === category.id
                            ? "bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white"
                            : "hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700"
                        }`}
                        onClick={() =>
                          setSelectedCategoryId(
                            selectedCategoryId === category.id ? null : category.id
                          )
                        }
                      >
                        {category.name}
                      </Button>
                    ))
                  ) : (
                    <div className="col-span-2 py-3 text-center text-muted-foreground">
                      هیچ دسته‌بندی‌ای برای این نوع تمرین وجود ندارد
                    </div>
                  )
                ) : (
                  <div className="col-span-2 py-3 text-center text-muted-foreground">
                    لطفا ابتدا یک نوع تمرین انتخاب کنید
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-medium">مرتب‌سازی</h3>
              <Button
                variant="outline"
                className="w-full justify-between hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700"
                onClick={toggleSortOrder}
              >
                <span>
                  {sortOrder === "asc" ? "صعودی (الف تا ی)" : "نزولی (ی تا الف)"}
                </span>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleClearSearch} className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30">
              <X className="h-4 w-4 ml-2" />
              پاک کردن فیلترها
            </Button>
            <Button onClick={() => setOpen(false)} className="bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white">
              اعمال فیلترها
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterButton;
