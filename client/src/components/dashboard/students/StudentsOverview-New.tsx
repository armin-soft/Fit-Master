
import { motion } from "framer-motion";
import { Users, Plus, TrendingUp } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentsOverviewNewProps {
  students: Student[];
}

export const StudentsOverviewNew = ({ students }: StudentsOverviewNewProps) => {
  const navigate = useNavigate();
  
  // محاسبه میانگین پیشرفت واقعی بر اساس داده‌های شاگردان
  const calculateRealAverageProgress = () => {
    if (students.length === 0) return 0;
    
    const totalProgress = students.reduce((sum, student) => {
      return sum + (student.progress || 0);
    }, 0);
    
    return Math.round(totalProgress / students.length);
  };

  const averageProgress = calculateRealAverageProgress();

  // نمایش آخرین شاگردان اضافه شده
  const recentStudents = students.slice(-3).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50"
      style={{ boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              شاگردان اخیر
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {toPersianNumbers(students.length.toString())} شاگرد فعال
            </p>
          </div>
        </div>
        
        <Button
          onClick={() => navigate('/Management/Students')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
        >
          <Plus className="w-4 h-4 ml-2" />
          مشاهده همه
        </Button>
      </div>

      {/* Progress Summary */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-l from-emerald-50 to-emerald-100/30 dark:from-emerald-950/30 dark:to-emerald-900/20">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <span className="font-medium text-emerald-700 dark:text-emerald-300">
            میانگین پیشرفت کلی
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex-1 bg-emerald-200 dark:bg-emerald-800 rounded-full h-3 mr-4">
            <motion.div 
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${averageProgress}%` }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
          <span className="text-2xl font-bold text-emerald-600">
            {toPersianNumbers(averageProgress.toString())}%
          </span>
        </div>
      </div>

      {/* Recent Students List */}
      <div className="space-y-3">
        {recentStudents.length > 0 ? (
          recentStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-200">
                <img 
                  src={student.image || "/Assets/Image/Place-Holder.svg"} 
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {student.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  پیشرفت: {toPersianNumbers((student.progress || 0).toString())}%
                </p>
              </div>
              
              <div className="w-12 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${student.progress || 0}%` }}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">
              هنوز شاگردی اضافه نشده است
            </p>
            <Button
              onClick={() => navigate('/Management/Students')}
              variant="outline"
              className="mt-3"
            >
              اضافه کردن شاگرد اول
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StudentsOverviewNew;
