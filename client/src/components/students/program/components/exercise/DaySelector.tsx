
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { Calendar, Star, Check } from "lucide-react";

interface DaySelectorProps {
  days: number[];
  dayLabels: Record<number, string>;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  editingDay: number | null;
  setEditingDay: (day: number | null) => void;
  tempDayLabel: string;
  setTempDayLabel: (label: string) => void;
  setShowAddDayDialog: (show: boolean) => void;
  confirmDeleteDay: (day: number) => void;
  maxDays: number;
  isDayMandatory?: (day: number) => boolean;
  isDayOptional?: (day: number) => boolean;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  dayLabels,
  currentDay,
  setCurrentDay,
  editingDay,
  setEditingDay,
  tempDayLabel,
  setTempDayLabel,
  setShowAddDayDialog,
  confirmDeleteDay,
  maxDays,
  isDayMandatory = () => false,
  isDayOptional = () => false
}) => {
  const getDayLabel = (day: number) => {
    return dayLabels[day] || `روز ${toPersianNumbers(day)}`;
  };

  return (
    <div className="mb-6" dir="rtl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div className="text-right">
          <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">انتخاب روز تمرین</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {toPersianNumbers(days.length)} روز موجود • روزهای ۱-۴ اجباری • روزهای ۵-۶ اختیاری
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-right" dir="rtl">
        {days.map((day, index) => {
          const isActive = currentDay === day;
          const isMandatory = isDayMandatory(day);
          const isOptional = isDayOptional(day);
          
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isActive ? "default" : "outline"}
                onClick={() => setCurrentDay(day)}
                className={`w-full h-20 flex flex-col items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-brand-500 to-info-600 text-white shadow-lg border-0"
                    : "bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:shadow-md"
                }`}
                dir="rtl"
              >
                {/* Background pattern for active day */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                )}
                
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}>
                    {isMandatory ? (
                      <Star className="w-4 h-4" />
                    ) : isOptional ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-bold">{toPersianNumbers(day)}</span>
                    )}
                  </div>
                  
                  <span className={`text-xs font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-white" 
                      : "text-gray-700 dark:text-gray-300"
                  }`}>
                    {getDayLabel(day)}
                  </span>
                  
                  {/* Status badge */}
                  <div className="flex gap-1">
                    {isMandatory && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs px-2 py-0.5 ${
                          isActive 
                            ? "bg-white/20 text-white border-white/30" 
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        اجباری
                      </Badge>
                    )}
                    {isOptional && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs px-2 py-0.5 ${
                          isActive 
                            ? "bg-white/20 text-white border-white/30" 
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        }`}
                      >
                        اختیاری
                      </Badge>
                    )}
                  </div>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DaySelector;
