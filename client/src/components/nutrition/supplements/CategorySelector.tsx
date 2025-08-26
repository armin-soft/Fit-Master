
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, VisuallyHidden } from "@/components/ui/dialog";
import { Search, Plus, Check, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SupplementCategory } from "@/types/supplement";

interface CategorySelectorProps {
  categories: SupplementCategory[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  activeTab: 'supplement' | 'vitamin';
  onAddCategory?: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  activeTab,
  onAddCategory
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter categories by type and search term
  const filteredCategories = categories
    .filter(category => category.type === activeTab)
    .filter(category => 
      !searchTerm || category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  // Reset search term when dialog closes or active tab changes
  useEffect(() => {
    setSearchTerm("");
  }, [isOpen, activeTab]);

  // Get selected category name for display
  const getSelectedCategoryName = () => {
    if (!selectedCategory) return "انتخاب دسته‌بندی";
    return selectedCategory;
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full justify-between bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/30 dark:to-gray-900"
      >
        <span>{getSelectedCategoryName()}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh]" aria-describedby="category-selector-description">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              انتخاب دسته‌بندی {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
            </DialogTitle>
            <DialogDescription id="category-selector-description">
              از لیست زیر دسته‌بندی مورد نظر خود را انتخاب کنید
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجوی دسته‌بندی..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 pr-10"
            />
          </div>
          
          <div className="overflow-y-auto max-h-[50vh]">
            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {/* Add "All Categories" option */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => {
                      onSelectCategory(null);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full justify-between transition-all duration-200",
                      selectedCategory === null && "bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-900/50 dark:border-indigo-700"
                    )}
                  >
                    <span>همه دسته‌بندی‌ها</span>
                    {selectedCategory === null && <Check className="h-4 w-4 text-indigo-600" />}
                  </Button>
                </motion.div>
                
                {filteredCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => {
                        onSelectCategory(category.name);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full justify-between transition-all duration-200",
                        selectedCategory === category.name && "bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-900/50 dark:border-indigo-700"
                      )}
                    >
                      <span>{category.name}</span>
                      {selectedCategory === category.name && <Check className="h-4 w-4 text-indigo-600" />}
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">هیچ دسته‌بندی‌ای یافت نشد</p>
                {onAddCategory && (
                  <Button onClick={() => {
                    onAddCategory();
                    setIsOpen(false);
                  }}>
                    <Plus className="h-4 w-4 ml-2" />
                    افزودن دسته‌بندی جدید
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {onAddCategory && (
            <div className="mt-4 text-center pt-4 border-t">
              <Button onClick={() => {
                onAddCategory();
                setIsOpen(false);
              }} variant="outline">
                <Plus className="h-4 w-4 ml-2" />
                افزودن دسته‌بندی جدید
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategorySelector;
