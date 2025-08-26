import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Utensils } from "lucide-react";

interface EmptyStateProps {
  selectedDay: string;
  onAddMeal: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ selectedDay, onAddMeal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
        <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center mb-4">
            <Utensils className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            هیچ وعده‌ای برای {selectedDay} تعریف نشده
          </h3>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            برای شروع، وعده غذایی جدیدی برای این روز اضافه کنید
          </p>
          
          <Button
            onClick={onAddMeal}
            className="bg-gradient-to-r from-brand-500 to-info-500 hover:from-brand-600 hover:to-info-600 text-white px-6 py-2.5 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="ml-2 h-4 w-4" />
            افزودن وعده غذایی
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};