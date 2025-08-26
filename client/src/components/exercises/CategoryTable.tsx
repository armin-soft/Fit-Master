
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, ChevronDown, Plus, FolderTree } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExerciseCategory } from "@/types/exercise";

interface CategoryTableProps {
  categories: ExerciseCategory[];
  onAdd: () => void;
  onEdit: (category: ExerciseCategory) => void;
  onDelete: (category: ExerciseCategory) => void;
}

export function CategoryTable({ categories, onAdd, onEdit, onDelete }: CategoryTableProps) {
  return (
    <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-brand-50/30 rounded-2xl">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-brand-100 rounded-xl">
              <FolderTree className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">دسته بندی تمرین</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">مدیریت دسته بندی های تمرینی</p>
            </div>
          </div>
          <Button 
            onClick={onAdd}
            className="bg-gradient-to-r from-brand-500 to-info-600 hover:from-brand-600 hover:to-info-700 text-white shadow-brand-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
            size="sm"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            افزودن دسته بندی
          </Button>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-brand-50/50 rounded-2xl border-2 border-dashed border-brand-200">
              <div className="p-3 sm:p-4 bg-brand-100 rounded-full mb-3 sm:mb-4">
                <FolderTree className="w-6 h-6 sm:w-8 sm:h-8 text-brand-400" />
              </div>
              <p className="text-brand-600 font-medium">هیچ دسته بندی ثبت نشده است</p>
              <p className="text-brand-400 text-xs sm:text-sm mt-1">برای شروع، یک دسته بندی جدید اضافه کنید</p>
            </div>
          ) : (
            categories.map((category) => (
              <div 
                key={category.id}
                className="group bg-white p-3 sm:p-4 rounded-xl border border-brand-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-brand-50 rounded-lg group-hover:bg-brand-100 transition-colors">
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-brand-500 to-info-600 text-white rounded-xl text-xs sm:text-sm font-medium shadow-sm group-hover:shadow-md transition-shadow">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-brand-50 hover:text-brand-600 transition-colors"
                      onClick={() => onEdit(category)}
                    >
                      <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                      onClick={() => onDelete(category)}
                    >
                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}
