
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentStatsCardProps {
  title: string;
  value: number;
  total: number;
  icon: LucideIcon;
  color: "emerald" | "sky" | "orange" | "emerald-sky" | "teal" | "amber";
  progress: number;
  unit?: string;
}

export const StudentStatsCard = ({ title, value, total, icon: Icon, color, progress, unit }: StudentStatsCardProps) => {
  const colorClasses = {
    emerald: {
      bg: "from-emerald-500 to-emerald-600",
      icon: "text-emerald-500",
      progress: "bg-emerald-500"
    },
    sky: {
      bg: "from-sky-500 to-sky-600", 
      icon: "text-sky-500",
      progress: "bg-sky-500"
    },
    orange: {
      bg: "from-orange-500 to-orange-600",
      icon: "text-orange-500", 
      progress: "bg-orange-500"
    },
    teal: {
      bg: "from-emerald-500 to-teal-600",
      icon: "text-emerald-500",
      progress: "bg-emerald-500"
    },
    amber: {
      bg: "from-orange-500 to-amber-600",
      icon: "text-orange-500",
      progress: "bg-orange-500"
    },
    "emerald-sky": {
      bg: "from-emerald-500 to-sky-600",
      icon: "text-emerald-500",
      progress: "bg-gradient-to-r from-emerald-500 to-sky-500"
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-700/50 p-6"
      style={{ boxShadow: 'var(--shadow-soft)' }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${colorClasses[color].bg}`} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl bg-gray-50 dark:bg-gray-800`}>
            <Icon className={`h-6 w-6 ${colorClasses[color].icon}`} />
          </div>
          <div className="text-left">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {unit ? 
                `${toPersianNumbers(value.toString())} ${unit}` :
                title === "پیشرفت کلی" ? 
                  `${toPersianNumbers(value.toString())}%` : 
                  `${toPersianNumbers(value.toString())}/${toPersianNumbers(total.toString())}`
              }
            </div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">{title}</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {toPersianNumbers(progress.toString())}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div 
              className={`h-full ${colorClasses[color].progress} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: 0.3, duration: 1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
