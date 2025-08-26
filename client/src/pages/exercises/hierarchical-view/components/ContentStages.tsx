
import React from "react";
import { ViewStage } from "../hooks/useHierarchicalView";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ContentStagesProps {
  currentStage: ViewStage;
  selectedTypeName?: string;
  selectedCategoryName?: string;
  onAddClick?: () => void;
}

export const ContentStages: React.FC<ContentStagesProps> = ({
  currentStage,
  selectedTypeName,
  selectedCategoryName,
  onAddClick
}) => {
  
  // تعیین عنوان دکمه افزودن بر اساس مرحله فعلی
  const getAddButtonLabel = () => {
    switch (currentStage) {
      case 'types':
        return "افزودن نوع تمرین";
      case 'categories':
        return "افزودن دسته‌بندی";
      case 'exercises':
        return "افزودن حرکت";
      default:
        return "افزودن";
    }
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`flex items-center ${currentStage !== 'types' ? 'text-primary' : 'text-muted-foreground'}`}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">{toPersianNumbers(1)}</span>
            <span className="mr-2">انواع تمرین</span>
            {selectedTypeName && <span className="mr-1 text-xs text-muted-foreground">({selectedTypeName})</span>}
          </div>
          
          <div className="mx-2 h-px w-6 bg-border"></div>
          
          <div className={`flex items-center ${currentStage === 'categories' ? 'text-primary' : currentStage === 'exercises' ? 'text-primary' : 'text-muted-foreground'}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStage === 'categories' || currentStage === 'exercises' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{toPersianNumbers(2)}</span>
            <span className="mr-2">دسته‌بندی‌ها</span>
            {selectedCategoryName && <span className="mr-1 text-xs text-muted-foreground">({selectedCategoryName})</span>}
          </div>
          
          <div className="mx-2 h-px w-6 bg-border"></div>
          
          <div className={`flex items-center ${currentStage === 'exercises' ? 'text-primary' : 'text-muted-foreground'}`}>
            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStage === 'exercises' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{toPersianNumbers(3)}</span>
            <span className="mr-2">تمرینات</span>
          </div>
        </div>
        
        {onAddClick && (
          <Button 
            onClick={onAddClick}
            size="sm" 
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
          >
            <Plus className="w-4 h-4 ml-1.5" />
            {getAddButtonLabel()}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContentStages;
