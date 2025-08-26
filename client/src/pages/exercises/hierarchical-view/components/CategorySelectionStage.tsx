
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ExerciseCategory } from '@/types/exercise';
import { useExerciseData } from '@/hooks/exercises/useExerciseData';

interface CategorySelectionStageProps {
  onCategorySelect: (categoryId: string) => void;
  onBack: () => void;
  selectedTypeId: string;
}

export const CategorySelectionStage: React.FC<CategorySelectionStageProps> = ({ 
  onCategorySelect, 
  onBack, 
  selectedTypeId 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, isLoading } = useExerciseData();
  
  // فیلتر کردن دسته‌بندی‌ها بر اساس نوع انتخاب شده
  const filteredCategories = categories.filter(cat => 
    cat.type === selectedTypeId && 
    (!searchTerm || cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">انتخاب دسته‌بندی تمرین</h2>
        <Button variant="outline" size="sm" onClick={onBack}>
          بازگشت به انواع تمرین
        </Button>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجوی دسته‌بندی..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 pr-10"
        />
      </div>
      
      <Separator className="my-2" />
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Card 
              key={category.id}
              className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
              onClick={() => onCategorySelect(category.id.toString())}
            >
              <CardContent className="p-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {/* Icon placeholder */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
                      <path d="M2 20h20"></path>
                      <path d="M14 12v.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium">{category.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">هیچ دسته‌بندی تمرینی یافت نشد</p>
            <Button variant="outline" className="mt-4">
              افزودن دسته‌بندی جدید
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelectionStage;
