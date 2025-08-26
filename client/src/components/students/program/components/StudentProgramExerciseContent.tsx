
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import DaySelector from "./exercise/DaySelector";
import useDayManagement from "./exercise/useDayManagement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentProgramExerciseContentProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  exercises: any[];
}

const StudentProgramExerciseContent: React.FC<StudentProgramExerciseContentProps> = ({
  currentDay,
  setCurrentDay,
  selectedExercises,
  setSelectedExercises,
  exercises,
}) => {
  const { toast } = useToast();
  
  // Use our custom hook for day management with 6 days (1-4 mandatory, 5-6 optional)
  const {
    days,
    dayLabels,
    editingDay,
    setEditingDay,
    tempDayLabel,
    setTempDayLabel,
    setShowAddDayDialog,
    setShowDeleteDayDialog,
    confirmDeleteDay,
    maxDays,
    getDayLabel,
    isDayMandatory,
    isDayOptional
  } = useDayManagement({
    initialDays: [1, 2, 3, 4, 5, 6], // Updated to include day 6
    initialDayLabels: {
      1: "روز اول",
      2: "روز دوم",
      3: "روز سوم",
      4: "روز چهارم",
      5: "روز پنجم",
      6: "روز ششم", // Added day 6
    },
    onDayChange: setCurrentDay
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <TabsContent value="exercise" className="m-0 h-full">
      <div className="text-right" dir="rtl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-4 h-full flex flex-col rtl"
        >
          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg mb-2 sm:mb-0 text-right">
                  برنامه تمرینی روز {toPersianNumbers(currentDay)}
                </h3>
                {isDayMandatory(currentDay) && (
                  <span className="text-xs bg-destructive-100 text-destructive-700 dark:bg-destructive-900/30 dark:text-destructive-300 px-2 py-1 rounded-full font-medium">
                    اجباری
                  </span>
                )}
                {isDayOptional(currentDay) && (
                  <span className="text-xs bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 px-2 py-1 rounded-full font-medium">
                    اختیاری
                  </span>
                )}
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <DaySelector 
              days={days}
              dayLabels={dayLabels}
              currentDay={currentDay}
              setCurrentDay={setCurrentDay}
              editingDay={editingDay}
              setEditingDay={setEditingDay}
              tempDayLabel={tempDayLabel}
              setTempDayLabel={setTempDayLabel}
              setShowAddDayDialog={setShowAddDayDialog}
              confirmDeleteDay={confirmDeleteDay}
              maxDays={maxDays}
              isDayMandatory={isDayMandatory}
              isDayOptional={isDayOptional}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`day-${currentDay}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="h-full"
              >
                <div dir="rtl" className="text-right">
                  <StudentExerciseSelector 
                    selectedExercises={selectedExercises}
                    setSelectedExercises={setSelectedExercises}
                    dayNumber={currentDay}
                    exercises={exercises}
                    dayLabel={getDayLabel(currentDay)}
                    isDayMandatory={isDayMandatory(currentDay)}
                    isDayOptional={isDayOptional(currentDay)}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramExerciseContent;
