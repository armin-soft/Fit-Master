
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface StudentCardFooterProps {
  onEdit: () => void;
}

export const StudentCardFooter: React.FC<StudentCardFooterProps> = ({ onEdit }) => {
  return (
    <div className="w-full">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onEdit}
          variant="ghost"
          className="w-full rounded-lg justify-between bg-gradient-to-r from-slate-50 to-slate-100 
                   hover:from-indigo-50 hover:to-indigo-100 border border-slate-200 
                   dark:from-slate-800/50 dark:to-slate-900/50 dark:hover:from-indigo-900/20 dark:hover:to-indigo-800/20 
                   dark:border-slate-700/50 dark:hover:border-indigo-800/40 text-sm"
        >
          <span>مشاهده جزئیات</span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
};
