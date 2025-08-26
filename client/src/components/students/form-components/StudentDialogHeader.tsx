
import React from "react";
import { motion } from "framer-motion";
import { UserPlus, UserRound } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface StudentDialogHeaderProps {
  isEdit: boolean;
  itemVariants: any;
}

export const StudentDialogHeader: React.FC<StudentDialogHeaderProps> = ({ isEdit, itemVariants }) => {
  return (
    <motion.div variants={itemVariants} className="p-4 sm:p-6 pb-0">
      <DialogHeader>
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2"
        >
          {isEdit ? (
            <UserRound className="h-7 w-7 text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text" />
          ) : (
            <UserPlus className="h-7 w-7 text-transparent bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text" />
          )}
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
            {isEdit ? "ویرایش اطلاعات شاگرد" : "افزودن شاگرد جدید"}
          </DialogTitle>
        </motion.div>
        <motion.p variants={itemVariants} className="mt-2 text-muted-foreground text-sm">
          {isEdit 
            ? "اطلاعات شاگرد را ویرایش کنید" 
            : "برای افزودن شاگرد جدید، فرم زیر را تکمیل کنید"}
        </motion.p>
      </DialogHeader>
    </motion.div>
  );
};
