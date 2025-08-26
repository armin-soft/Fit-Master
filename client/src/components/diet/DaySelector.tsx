
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { WEEK_DAYS } from "./utils";

interface DaySelectorProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
  getDayMeals: (day: string) => any[];
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDay,
  onDayChange,
  getDayMeals
}) => {
  return (
    <TabsList className="grid w-full grid-cols-7 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm h-12 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-lg mb-4 sm:mb-6 md:mb-8" dir="rtl">
      {WEEK_DAYS.map((day) => {
        const dayMealCount = getDayMeals(day).length;
        return (
          <TabsTrigger
            key={day}
            value={day}
            className={cn(
              "relative text-xs sm:text-sm font-bold px-1 sm:px-2 md:px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-1",
              selectedDay === day 
                ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg" 
                : "hover:bg-brand-50 dark:hover:bg-brand-950/30"
            )}
          >
            <div className="text-center leading-tight">
              <div className="truncate">{day}</div>
              {dayMealCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-2xs sm:text-xs px-1 sm:px-2 mt-0.5 sm:mt-1 h-4 sm:h-5",
                    selectedDay === day 
                      ? "bg-white/20 text-white border-white/20" 
                      : "bg-brand-100 text-brand-700 border-brand-200"
                  )}
                >
                  {toPersianNumbers(dayMealCount)}
                </Badge>
              )}
            </div>
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
};
