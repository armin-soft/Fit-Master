
import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

export interface DayItem {
  id: number;
  name: string;
}

// Define the week days
const weekDays: DayItem[] = [
  { id: 1, name: "شنبه" },
  { id: 2, name: "یکشنبه" },
  { id: 3, name: "دوشنبه" },
  { id: 4, name: "سه شنبه" },
  { id: 5, name: "چهارشنبه" },
  { id: 6, name: "پنج شنبه" },
  { id: 7, name: "جمعه" }
];

interface DaySelectorProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  centered?: boolean;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  currentDay,
  setCurrentDay,
  centered = false
}) => {
  return (
    <div className="text-center mb-6 mt-2">
      <h3 className="text-lg font-medium mb-3">انتخاب روز هفته</h3>
      <ScrollArea className="w-full" orientation="vertical">
        <div className={cn(
          "flex flex-wrap items-center gap-2 justify-center px-2"
        )}>
          {weekDays.map((day) => (
            <motion.button
              key={day.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentDay(day.id)}
              className={cn(
                "h-10 px-5 py-2 rounded-md border text-sm transition-all whitespace-nowrap",
                currentDay === day.id 
                  ? "bg-green-500 text-white border-green-500" 
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              )}
            >
              {day.name}
            </motion.button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DaySelector;
