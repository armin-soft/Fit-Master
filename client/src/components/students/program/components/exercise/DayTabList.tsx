
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";
import { Dumbbell } from "lucide-react";

interface DayTabListProps {
  days: number[];
  dayLabels: Record<number, string>;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  editingDay: number | null;
  tempDayLabel: string;
  setTempDayLabel: (label: string) => void;
  handleEditDayLabel: (day: number) => void;
  handleSaveDayLabel: () => void;
  confirmDeleteDay: (day: number) => void;
  readOnly?: boolean;
}

const DayTabList: React.FC<DayTabListProps> = ({
  days,
  dayLabels,
  currentDay,
  setCurrentDay,
  editingDay,
  tempDayLabel,
  setTempDayLabel,
  handleEditDayLabel,
  handleSaveDayLabel,
  confirmDeleteDay,
  readOnly = false
}) => {
  return (
    <div className="flex items-center flex-wrap gap-2 rounded-md">
      {days.sort((a, b) => a - b).map((day) => (
        <div
          key={day}
          className="relative"
        >
          {editingDay === day ? (
            <div className="flex items-center gap-1">
              <Input
                value={tempDayLabel}
                onChange={(e) => setTempDayLabel(e.target.value)}
                className="h-8 text-xs w-24"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveDayLabel();
                  }
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={handleSaveDayLabel}
              >
                تأیید
              </Button>
            </div>
          ) : (
            <Button
              variant={currentDay === day ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex items-center gap-1.5 transition-all whitespace-nowrap",
                currentDay === day
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                  : "hover:bg-indigo-50 hover:text-indigo-600"
              )}
              onClick={() => setCurrentDay(day)}
            >
              <Dumbbell className="h-3.5 w-3.5" />
              <span>{dayLabels[day] || `روز ${toPersianNumbers(day)}`}</span>
            </Button>
          )}

          {!readOnly && currentDay === day && days.length > 1 && (
            <div
              onClick={() => confirmDeleteDay(day)}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 cursor-pointer z-10"
            >
              <span className="text-xs">×</span>
            </div>
          )}
        </div>
      ))}

      {!readOnly && days.length < 7 && (
        <Button
          variant="outline"
          size="sm"
          className="border-dashed text-muted-foreground text-xs hover:text-foreground"
          onClick={() => {
            if (days.length < 7) {
              const newDay = Math.max(...days) + 1;
              setTempDayLabel(`روز ${toPersianNumbers(newDay)}`);
              handleEditDayLabel(newDay);
            }
          }}
        >
          افزودن روز
        </Button>
      )}
    </div>
  );
};

export default DayTabList;
