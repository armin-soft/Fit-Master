
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Save, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentMealFooterProps {
  selectedMeals: number[];
  onSave: () => void;
  onClose: () => void;
  selectedCount?: number;
  onCancel?: () => void;
  saving?: boolean;
}

const StudentMealFooter: React.FC<StudentMealFooterProps> = ({
  selectedMeals,
  onSave,
  onClose,
  selectedCount,
  onCancel,
  saving = false
}) => {
  const count = selectedCount !== undefined ? selectedCount : selectedMeals.length;
  const handleCancel = onCancel || onClose;
  
  return (
    <div className="border-t p-4 mt-auto bg-muted/20 shrink-0 flex justify-between text-right" dir="rtl">
      <div className="flex items-center gap-2">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{
            scale: count > 0 ? 1 : 0.9,
            opacity: count > 0 ? 1 : 0
          }} 
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {toPersianNumbers(count)} وعده غذایی انتخاب شده
        </motion.div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleCancel} className="gap-2">
          <X className="h-4 w-4" />
          انصراف
        </Button>
        <Button 
          onClick={onSave} 
          className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0" 
          disabled={count === 0 || saving}
        >
          <Save className="h-4 w-4" />
          {saving ? "در حال ذخیره..." : "ذخیره برنامه غذایی"}
        </Button>
      </div>
    </div>
  );
};

export default StudentMealFooter;
