
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Apple, Plus } from "lucide-react";

interface EmptyStateProps {
  selectedDay: string;
  onAddMeal: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ selectedDay, onAddMeal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 sm:py-16 md:py-20"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <Apple className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400" />
      </div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">
        هنوز وعده غذایی برای {selectedDay} تعریف نشده
      </h3>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 px-4">
        برای شروع، وعده غذایی جدید اضافه کنید
      </p>
      <Button
        onClick={onAddMeal}
        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Plus className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        افزودن اولین وعده
      </Button>
    </motion.div>
  );
};
