
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface FormActionsProps {
  isEdit: boolean;
  onCancel: () => void;
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  isEdit, 
  onCancel,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`flex flex-col sm:flex-row justify-end items-center gap-3 sm:gap-4 p-4 sm:p-6 border-t bg-gradient-to-r from-emerald-50/50 to-sky-50/50 dark:bg-gradient-to-r dark:from-emerald-900/20 dark:to-sky-900/20 ${className || ''}`}
    >
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="w-full sm:w-auto gap-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
      >
        <X className="h-4 w-4" />
        <span>انصراف</span>
      </Button>
      
      <Button
        type="submit"
        className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 gap-1 border-0"
      >
        <Save className="h-4 w-4" />
        <span>{isEdit ? "ذخیره تغییرات" : "افزودن شاگرد"}</span>
      </Button>
    </motion.div>
  );
};
