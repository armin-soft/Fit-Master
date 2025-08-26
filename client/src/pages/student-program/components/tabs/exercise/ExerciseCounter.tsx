
import React from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseCounterProps {
  count: number;
}

const ExerciseCounter: React.FC<ExerciseCounterProps> = ({ count }) => {
  return (
    <div className="text-xs text-gray-500 dark:text-gray-400 text-center p-2">
      <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
        <span className="h-2 w-2 rounded-full bg-primary"></span>
        <span>{toPersianNumbers(count)} تمرین انتخاب شده</span>
      </span>
    </div>
  );
};

export default ExerciseCounter;
