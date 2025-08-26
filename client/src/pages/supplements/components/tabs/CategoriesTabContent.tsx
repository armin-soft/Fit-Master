import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Folder, Plus, Edit2, Trash2, Search } from "lucide-react";
import { SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CategoriesTabContentProps {
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (categoryId: number) => void;
  supplements: any[];
}

export const CategoriesTabContent: React.FC<CategoriesTabContentProps> = ({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategorySupplementCount = (categoryId: number) => {
    return supplements.filter(supplement => supplement.categoryId === categoryId).length;
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl">
            <Folder className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">دسته‌بندی‌ها</h3>
            <p className="text-gray-500">مدیریت دسته‌بندی‌های مکمل‌ها و ویتامین‌ها</p>
          </div>
        </div>
        <Button
          onClick={onAddCategory}
          className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-lg rounded-2xl px-6 py-3"
        >
          <Plus className="w-4 h-4 mr-2" />
          افزودن دسته‌بندی
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="جستجو در دسته‌بندی‌ها..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 border-2 border-gray-200 focus:border-brand-400 rounded-xl h-12"
          dir="rtl"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="p-6 rounded-2xl border-2 border-gray-200 hover:border-brand-300 transition-all duration-300 bg-gradient-to-br from-white to-brand-50/30">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl">
                      <Folder className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditCategory(category)}
                        className="h-9 w-9 p-0 hover:bg-brand-100 hover:text-brand-600 rounded-xl"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteCategory(category.id)}
                        className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{category.name}</h3>
                    {category.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-brand-100 text-brand-700 hover:bg-brand-200">
                        {toPersianNumbers(getCategorySupplementCount(category.id))} آیتم
                      </Badge>
                      {category.type && (
                        <Badge variant="outline" className="border-brand-300 text-brand-600">
                          {category.type === 'supplement' ? 'مکمل' : 'ویتامین'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {searchQuery ? "دسته‌بندی‌ای یافت نشد" : "هنوز دسته‌بندی‌ای ایجاد نشده"}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery ? "لطفاً کلمه کلیدی دیگری امتحان کنید" : "برای شروع، اولین دسته‌بندی خود را ایجاد کنید"}
          </p>
          {!searchQuery && (
            <Button
              onClick={onAddCategory}
              className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              افزودن دسته‌بندی
            </Button>
          )}
        </div>
      )}
    </div>
  );
};