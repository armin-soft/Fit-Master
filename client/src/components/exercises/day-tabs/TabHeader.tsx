
import React from "react";
import { TabsList } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import DayTabTrigger from "./DayTabTrigger";

interface TabHeaderProps {
  activeTab: string;
  dayTabs: string[];
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  selectedExercisesDay5: number[]; // Added day 5
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

const TabHeader: React.FC<TabHeaderProps> = ({
  activeTab,
  dayTabs,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  selectedExercisesDay5, // Added day 5
}) => {
  const getSelectedCount = (day: string) => {
    switch (day) {
      case "day1": return selectedExercisesDay1.length;
      case "day2": return selectedExercisesDay2.length;
      case "day3": return selectedExercisesDay3.length;
      case "day4": return selectedExercisesDay4.length;
      case "day5": return selectedExercisesDay5.length; // Added day 5
      default: return 0;
    }
  };

  return (
    <div className="flex justify-center mb-3 sm:mb-4">
      <TabsList className="bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 rounded-xl">
        {dayTabs.map((day, index) => (
          <DayTabTrigger
            key={day}
            value={day}
            active={activeTab === day}
            count={getSelectedCount(day)}
            dayNumber={index + 1}
          />
        ))}
      </TabsList>
    </div>
  );
};

export default TabHeader;
