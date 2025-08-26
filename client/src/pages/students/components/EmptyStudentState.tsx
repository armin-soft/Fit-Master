
import { motion } from "framer-motion";
import { UserPlus, Search, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface EmptyStudentStateProps {
  isSearching: boolean;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

export const EmptyStudentState: React.FC<EmptyStudentStateProps> = ({
  isSearching,
  onAddStudent,
  onClearSearch
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center h-full w-full p-4"
    >
      <Card className="max-w-md w-full backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-gray-200/60 dark:border-slate-800/60 shadow-xl">
        <CardHeader className="text-center pb-2">
          {isSearching ? (
            <>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-200">نتیجه‌ای یافت نشد</CardTitle>
              <CardDescription className="text-gray-500">
                هیچ شاگردی با این مشخصات پیدا نشد
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-200">هنوز شاگردی اضافه نشده</CardTitle>
              <CardDescription className="text-gray-500">
                برای شروع، شاگرد جدید اضافه کنید
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="flex justify-center py-6">
          {isSearching ? (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              <Search className="h-10 w-10 text-gray-400" />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center"
            >
              <UserPlus className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center pb-6 gap-3">
          {isSearching ? (
            <Button 
              variant="outline" 
              size="lg"
              onClick={onClearSearch}
              className="gap-2 bg-white dark:bg-slate-900"
            >
              <FilterX className="h-4 w-4" />
              <span>پاک کردن جستجو</span>
            </Button>
          ) : (
            <Button 
              size="lg"
              onClick={onAddStudent}
              className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
            >
              <UserPlus className="h-4 w-4" />
              <span>افزودن شاگرد</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
