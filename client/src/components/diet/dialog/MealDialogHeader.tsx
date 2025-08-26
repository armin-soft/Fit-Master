
import React from "react";
import { motion } from "framer-motion";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Utensils, Plus } from "lucide-react";

interface MealDialogHeaderProps {
  isEditing: boolean;
}

export const MealDialogHeader: React.FC<MealDialogHeaderProps> = ({ isEditing }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 sm:p-4 md:p-6 shrink-0">
      <DialogHeader>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            {isEditing ? <Utensils className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" /> : <Plus className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
          </div>
          <div className="min-w-0 flex-1">
            <DialogTitle className="text-sm sm:text-lg md:text-2xl font-black leading-tight">
              {isEditing ? "ویرایش وعده غذایی" : "افزودن وعده غذایی جدید"}
            </DialogTitle>
            <DialogDescription className="text-emerald-100 mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base leading-tight">
              {isEditing 
                ? "اطلاعات وعده غذایی را ویرایش کنید"
                : "وعده غذایی جدید به برنامه اضافه کنید"
              }
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
    </div>
  );
};
