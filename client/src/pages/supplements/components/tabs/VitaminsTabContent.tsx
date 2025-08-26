import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Plus, Edit2, Trash2, Search, Filter, Folder } from "lucide-react";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface VitaminsTabContentProps {
  vitamins: Supplement[];
  categories: SupplementCategory[];
  onAddVitamin: (selectedCategoryId?: number) => void;
  onEditVitamin: (vitamin: Supplement) => void;
  onDeleteVitamin: (vitaminId: number) => void;
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (categoryId: number) => void;
}

export const VitaminsTabContent: React.FC<VitaminsTabContentProps> = ({
  vitamins,
  categories,
  onAddVitamin,
  onEditVitamin,
  onDeleteVitamin,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // فیلتر ویتامین‌ها بر اساس دسته‌بندی انتخاب شده
  const filteredVitamins = vitamins.filter(vitamin => {
    if (!selectedCategoryId) return false; // اگر دسته‌بندی انتخاب نشده، هیچ ویتامینی نشان نده
    
    const matchesCategory = vitamin.categoryId === selectedCategoryId;
    const matchesSearch = vitamin.name.toLowerCase().includes(searchQuery.toLowerCase());
    
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
                <h3 className="text-xl font-bold text-gray-800">دسته‌بندی‌های ویتامین</h3>
                <p className="text-gray-500">مدیریت دسته‌بندی‌های ویتامین‌ها</p>
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
                      ? 'border-info-400 bg-info-50 shadow-lg' 
                      : 'border-gray-100 hover:border-sky-200'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className={`font-bold mb-2 ${
                          selectedCategoryId === category.id ? 'text-info-800' : 'text-gray-800'
                        }`}>
                          {category.name}
                        </h4>
                        <Badge 
                          variant="secondary" 
                          className={
                            selectedCategoryId === category.id 
                              ? 'bg-info-200 text-info-800' 
                              : 'bg-sky-100 text-sky-700'
                          }
                        >
                          {toPersianNumbers(vitamins.filter(v => v.categoryId === category.id).length)} ویتامین
                        </Badge>
                        {selectedCategoryId === category.id && (
                          <div className="mt-2">
                            <Badge variant="outline" className="bg-info-100 text-info-700 border-info-300">
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

        {/* Vitamins Section */}
        {selectedCategoryId && (
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-info-500 to-info-600 rounded-2xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">ویتامین‌های {selectedCategory}</h3>
                <p className="text-gray-500">مدیریت ویتامین‌های این دسته‌بندی</p>
              </div>
            </div>
            <Button
              onClick={() => onAddVitamin(selectedCategoryId)}
              className="bg-gradient-to-r from-info-500 to-info-600 hover:from-info-600 hover:to-info-700 text-white shadow-lg rounded-2xl px-6 py-3"
            >
              <Plus className="w-4 h-4 mr-2" />
              افزودن ویتامین
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
              placeholder={`جستجو در ویتامین‌های ${selectedCategory}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 border-2 border-gray-200 focus:border-info-400 rounded-xl h-12"
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
              برای مشاهده ویتامین‌ها، روی یک دسته‌بندی کلیک کنید
            </h3>
            <p className="text-gray-500">
              ابتدا یکی از دسته‌بندی‌های بالا را انتخاب کنید تا ویتامین‌های آن دسته نمایش داده شود
            </p>
          </div>
        </div>
      )}

      {/* Vitamins Grid */}
      {selectedCategoryId && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredVitamins.length > 0 ? filteredVitamins.map((vitamin) => (
            <motion.div
              key={vitamin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="p-6 rounded-2xl border-2 border-gray-200 hover:border-info-300 transition-all duration-300 bg-gradient-to-br from-white to-info-50/30">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-gradient-to-br from-info-500 to-info-600 rounded-xl">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditVitamin(vitamin)}
                        className="h-9 w-9 p-0 hover:bg-info-100 hover:text-info-600 rounded-xl"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteVitamin(vitamin.id)}
                        className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-3">{vitamin.name}</h3>
                    
                    <div className="space-y-2">
                      {vitamin.category && (
                        <Badge variant="secondary" className="bg-info-100 text-info-700">
                          {vitamin.category}
                        </Badge>
                      )}
                      
                      <div className="flex items-center justify-between text-sm">
                        {vitamin.dosage && (
                          <span className="text-gray-600">
                            <strong>دوز:</strong> {vitamin.dosage}
                          </span>
                        )}
                        {vitamin.timing && (
                          <span className="text-gray-600">
                            <strong>زمان:</strong> {vitamin.timing}
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
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {searchQuery ? "ویتامین‌ای یافت نشد" : "هنوز ویتامین‌ای در این دسته‌بندی ایجاد نشده"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery ? "لطفاً کلمه‌ی دیگری را امتحان کنید" : "برای شروع، اولین ویتامین این دسته را ایجاد کنید"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => onAddVitamin(selectedCategoryId)}
                  className="bg-gradient-to-r from-info-500 to-info-600 hover:from-info-600 hover:to-info-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  افزودن ویتامین
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