
import React from "react";
import { Plus, RotateCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface StudentsHeaderProps {
  onAddStudent: () => void;
  onRefresh?: () => void;
  lastRefreshTime?: Date;
  onDownload?: () => void;
}

export const StudentsHeader: React.FC<StudentsHeaderProps> = ({ 
  onAddStudent,
  onRefresh,
  onDownload
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
      <div className="flex flex-col items-center sm:items-start">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold text-primary bg-gradient-to-br from-emerald-600 to-sky-600 bg-clip-text text-transparent"
        >
          شاگردان
        </motion.h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          {onDownload && (
            <Button
              size="sm"
              variant="outline"
              onClick={onDownload}
              className="flex items-center gap-1.5 border-sky-200/80 dark:border-sky-700/80 shadow-sm transition-all duration-300 hover:shadow-md hover:border-sky-300 dark:hover:border-sky-600/60"
            >
              <Download className="h-4 w-4 mr-1 text-sky-500 dark:text-sky-400" />
              <span>خروجی برنامه</span>
            </Button>
          )}
          
          {onRefresh && (
            <Button
              size="sm"
              variant="outline"
              onClick={onRefresh}
              className="flex items-center gap-1.5 border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800/60"
            >
              <RotateCw className="h-4 w-4 mr-1 text-emerald-500 dark:text-emerald-400" />
              <span>بروزرسانی</span>
            </Button>
          )}
          
          <Button
            size="sm"
            onClick={onAddStudent}
            className="flex items-center gap-1.5 bg-gradient-to-br from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-sky-600/30 transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span>افزودن شاگرد</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
