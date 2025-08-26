
import React from "react";
import { Supplement } from "@/types/supplement";
import { CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface VitaminSelectorProps {
  vitamins: Supplement[];
  selectedIds: number[];
  onChange: (newSelected: number[]) => void;
}

const VitaminSelector: React.FC<VitaminSelectorProps> = ({
  vitamins,
  selectedIds,
  onChange
}) => {
  const toggleVitamin = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(vid => vid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  if (vitamins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-700/30 dark:to-purple-700/30 rounded-2xl flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">هیچ ویتامینی یافت نشد</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">لطفا ابتدا ویتامین‌ها را اضافه کنید</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-right">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">ویتامین‌ها</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {toPersianNumbers(vitamins.length)} ویتامین موجود • {toPersianNumbers(selectedIds.length)} انتخاب شده
            </p>
          </div>
        </div>
      </div>

      {/* Vitamins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-right" dir="rtl">
        {vitamins.map((vitamin, index) => (
          <motion.div
            key={vitamin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleVitamin(vitamin.id)}
            className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all duration-300 shadow-sm hover:shadow-md ${
              selectedIds.includes(vitamin.id)
                ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-300 dark:border-blue-600 shadow-lg"
                : "bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/80"
            }`}
            dir="rtl"
          >
            <div className="flex-grow text-right">
              <p className="font-semibold text-base text-gray-800 dark:text-gray-100 mb-1">
                {vitamin.name}
              </p>
              {vitamin.dosage && (
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <span>دوز:</span>
                  <span className="font-medium">{vitamin.dosage}</span>
                </p>
              )}
            </div>
            
            <div className={`flex-shrink-0 transition-all duration-300 ${
              selectedIds.includes(vitamin.id) 
                ? "text-blue-500 scale-110" 
                : "text-gray-300 dark:text-gray-600"
            }`}>
              <CheckCircle className="h-6 w-6" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VitaminSelector;
