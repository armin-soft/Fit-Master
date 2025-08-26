
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Target, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ExerciseWithSets } from "@/types/exercise";

interface ExerciseStatsHeaderProps {
  selectedExercises: ExerciseWithSets[];
  exercises: any[];
  dayLabel: string;
}

const ExerciseStatsHeader: React.FC<ExerciseStatsHeaderProps> = ({
  selectedExercises,
  exercises,
  dayLabel
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
    >
      <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 border border-emerald-200/50 dark:border-emerald-700/50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">تمرینات انتخاب شده</p>
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{toPersianNumbers(selectedExercises.length)}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-sky-50 to-sky-100/50 dark:from-sky-900/20 dark:to-sky-800/10 border border-sky-200/50 dark:border-sky-700/50">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">کل تمرینات</p>
            <p className="text-xl font-bold text-sky-700 dark:text-sky-300">{toPersianNumbers(exercises.length)}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-emerald-50 via-sky-50 to-emerald-50 dark:from-emerald-900/20 dark:via-sky-900/20 dark:to-emerald-900/20 border border-emerald-200/30 dark:border-emerald-700/30">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">{dayLabel}</p>
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">فعال</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExerciseStatsHeader;
