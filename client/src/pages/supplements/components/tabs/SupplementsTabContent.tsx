import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pill, Plus, Edit2, Trash2, Search, Filter, Folder } from "lucide-react";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SupplementsTabContentProps {
  supplements: Supplement[];
  categories: SupplementCategory[];
  onAddSupplement: (selectedCategoryId?: number) => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (supplementId: number) => void;
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (categoryId: number) => void;
}

export const SupplementsTabContent: React.FC<SupplementsTabContentProps> = ({
  supplements,
  categories,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // فیلتر مکمل‌ها بر اساس دسته‌بندی انتخاب شده
  const filteredSupplements = supplements.filter(supplement => {
    if (!selectedCategoryId) return false; // اگر دسته‌بندی انتخاب نشده، هیچ مکملی نشان نده
    
    const matchesCategory = supplement.categoryId === selectedCategoryId;
    const matchesSearch = supplement.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // تابع برای انتخاب/عدم انتخاب دسته‌بندی
  const handleCategoryClick = (categoryId: number) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null); // اگر روی همان دسته کلیک شد، آن را غیرفعال کن
      setSelectedCategory("");
    } else {
      setSelectedCategoryId(categoryId);
      const category = categories.find(cat => cat.id === categoryId);
      setSelectedCategory(category?.name || "");
    }
    setSearchQuery(""); // پاک کردن جستجو هنگام تغییر دسته‌بندی
  };

  return (
    <div className="space-y-4">
      {/* Headers */}
      <div className="space-y-6">
        {/* Categories Section */}
        <div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl">
                <Folder className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">دسته‌بندی‌های مکمل</h3>
                <p className="text-gray-500">مدیریت دسته‌بندی‌های مکمل‌های غذایی</p>
              </div>
            </div>
            <Button
              onClick={onAddCategory}
              className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-lg rounded-2xl px-6 py-3"
            >
              <Plus className="w-4 h-4 mr-2" />
              افزودن دسته‌بندی
            </Button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className={`hover:shadow-lg transition-all duration-300 border-2 cursor-pointer ${
                    selectedCategoryId === category.id 
                      ? 'border-emerald-400 bg-emerald-50 shadow-lg' 
                      : 'border-gray-100 hover:border-sky-200'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className={`font-bold mb-2 ${
                          selectedCategoryId === category.id ? 'text-emerald-800' : 'text-gray-800'
                        }`}>
                          {category.name}
                        </h4>
                        <Badge 
                          variant="secondary" 
                          className={
                            selectedCategoryId === category.id 
                              ? 'bg-emerald-200 text-emerald-800' 
                              : 'bg-sky-100 text-sky-700'
                          }
                        >
                          {toPersianNumbers(supplements.filter(s => s.categoryId === category.id).length)} مکمل
                        </Badge>
                        {selectedCategoryId === category.id && (
                          <div className="mt-2">
                            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-300">
                              انتخاب شده
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onEditCategory(category)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Supplements Section */}
        {selectedCategoryId && (
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">مکمل‌های {selectedCategory}</h3>
                <p className="text-gray-500">مدیریت مکمل‌های این دسته‌بندی</p>
              </div>
            </div>
            <Button
              onClick={() => onAddSupplement(selectedCategoryId)}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg rounded-2xl px-6 py-3"
            >
              <Plus className="w-4 h-4 mr-2" />
              افزودن مکمل
            </Button>
          </div>
        )}
      </div>

      {/* Search Filter - only when category is selected */}
      {selectedCategoryId && (
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={`جستجو در مکمل‌های ${selectedCategory}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 border-2 border-gray-200 focus:border-emerald-400 rounded-xl h-12"
              dir="rtl"
            />
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedCategoryId && categories.length > 0 && (
        <div className="flex items-center justify-center py-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="p-4 bg-gray-200 rounded-full inline-flex mb-4">
              <Folder className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              برای مشاهده مکمل‌ها، روی یک دسته‌بندی کلیک کنید
            </h3>
            <p className="text-gray-500">
              ابتدا یکی از دسته‌بندی‌های بالا را انتخاب کنید تا مکمل‌های آن دسته نمایش داده شود
            </p>
          </div>
        </div>
      )}

      {/* Supplements Grid */}
      {selectedCategoryId && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredSupplements.length > 0 ? filteredSupplements.map((supplement) => (
            <motion.div
              key={supplement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="p-6 rounded-2xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 bg-gradient-to-br from-white to-emerald-50/30">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                      <Pill className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditSupplement(supplement)}
                        className="h-9 w-9 p-0 hover:bg-emerald-100 hover:text-emerald-600 rounded-xl"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteSupplement(supplement.id)}
                        className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-3">{supplement.name}</h3>
                    
                    <div className="space-y-2">
                      {supplement.category && (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                          {supplement.category}
                        </Badge>
                      )}
                      
                      <div className="flex items-center justify-between text-sm">
                        {supplement.dosage && (
                          <span className="text-gray-600">
                            <strong>دوز:</strong> {supplement.dosage}
                          </span>
                        )}
                        {supplement.timing && (
                          <span className="text-gray-600">
                            <strong>زمان:</strong> {supplement.timing}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-12">
              <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {searchQuery ? "مکمل‌ای یافت نشد" : "هنوز مکمل‌ای در این دسته‌بندی ایجاد نشده"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery ? "لطفاً کلمه‌ی دیگری را امتحان کنید" : "برای شروع، اولین مکمل این دسته را ایجاد کنید"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => onAddSupplement(selectedCategoryId)}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  افزودن مکمل
                </Button>
              )}
            </div>
          )}
        </AnimatePresence>
        </div>
      )}
    </div>
  );
};