
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Users } from "lucide-react";
import { motion } from "framer-motion";

interface StudentTableEmptyProps {
  columnsCount: number;
  searchQuery?: string;
  onAddStudent?: () => void;
  onClearSearch?: () => void;
}

export const StudentTableEmpty: React.FC<StudentTableEmptyProps> = ({
  columnsCount,
  searchQuery,
  onAddStudent,
  onClearSearch,
}) => {
  const isSearching = searchQuery && searchQuery.length > 0;

  return (
    <TableRow>
      <TableCell colSpan={columnsCount} className="h-80 text-center p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-full py-16 px-4 bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm"
        >
          <div className="bg-white dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg">
            {isSearching ? (
              <Search className="h-10 w-10 text-slate-400 dark:text-slate-500" />
            ) : (
              <Users className="h-10 w-10 text-slate-400 dark:text-slate-500" />
            )}
          </div>

          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {isSearching ? "موردی یافت نشد" : "هنوز شاگردی ثبت نشده است"}
          </h3>

          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md text-center">
            {isSearching
              ? `هیچ موردی با عبارت «${searchQuery}» یافت نشد. لطفاً جستجوی دیگری را امتحان کنید یا شاگرد جدیدی اضافه کنید.`
              : "برای شروع، یک شاگرد جدید اضافه کنید. شما می‌توانید اطلاعات شاگردان، برنامه‌های ورزشی و رژیم غذایی آنها را مدیریت کنید."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {isSearching && onClearSearch && (
              <Button 
                variant="outline" 
                onClick={onClearSearch}
                className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Search className="mr-2 h-4 w-4" />
                پاک کردن جستجو
              </Button>
            )}
            
            {onAddStudent && (
              <Button 
                onClick={onAddStudent}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {isSearching ? "افزودن شاگرد جدید" : "شاگرد اول را اضافه کنید"}
              </Button>
            )}
          </div>
        </motion.div>
      </TableCell>
    </TableRow>
  );
};
