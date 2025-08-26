
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgressOverviewNewProps {
  stats: {
    weeklyProgress: number;
    completedExercises: number;
    totalExercises: number;
    completedMeals: number;
    totalMeals: number;
    supplementsCompleted: number;
    totalSupplements: number;
  };
}

export const StudentProgressOverviewNew = ({ stats }: StudentProgressOverviewNewProps) => {
  const chartData = [
    {
      name: "تمرینات",
      completed: stats.completedExercises,
      total: stats.totalExercises,
      progress: Math.round((stats.completedExercises / stats.totalExercises) * 100)
    },
    {
      name: "وعده‌ها",
      completed: stats.completedMeals,
      total: stats.totalMeals,
      progress: Math.round((stats.completedMeals / stats.totalMeals) * 100)
    },
    {
      name: "مکمل‌ها",
      completed: stats.supplementsCompleted,
      total: stats.totalSupplements,
      progress: Math.round((stats.supplementsCompleted / stats.totalSupplements) * 100)
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
      style={{ boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">نمای کلی پیشرفت</h2>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                        <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
                        <p className="text-emerald-600">
                          تکمیل شده: {toPersianNumbers(data.completed.toString())}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          کل: {toPersianNumbers(data.total.toString())}
                        </p>
                        <p className="text-sky-600">
                          درصد: {toPersianNumbers(data.progress.toString())}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="progress" 
                fill="url(#progressGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentProgressOverviewNew;
