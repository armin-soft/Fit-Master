
import React from "react";
import { Dumbbell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExercisesListProps {
  filteredExercises: Exercise[];
  selectedCategory?: ExerciseCategory;
  selectedExerciseIds: number[];
  setSelectedExerciseIds: React.Dispatch<React.SetStateAction<number[]>>;
  viewMode: "grid" | "list";
  onEditExercise: (exercise: Exercise) => void;
  onDeleteExercise: (exerciseId: number) => void;
  onAddExercise: () => void;
}

const ExercisesList: React.FC<ExercisesListProps> = ({
  filteredExercises,
  selectedCategory,
  selectedExerciseIds,
  setSelectedExerciseIds,
  viewMode,
  onEditExercise,
  onDeleteExercise,
  onAddExercise
}) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <motion.div 
          className={`grid gap-3 ${
            viewMode === "grid" 
              ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" 
              : "grid-cols-1"
          }`}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise, index) => {
              const isSelected = selectedExerciseIds.includes(exercise.id);
              
              return (
                <motion.div 
                  key={exercise.id} 
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  className="relative"
                >
                  {/* Exercise Number Badge */}
                  <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                    {toPersianNumbers(index + 1)}
                  </div>
                  
                  <ExerciseCard 
                    exercise={exercise}
                    category={selectedCategory}
                    isSelected={isSelected}
                    viewMode={viewMode}
                    onClick={() => {
                      setSelectedExerciseIds(prev => 
                        isSelected 
                          ? prev.filter(id => id !== exercise.id)
                          : [...prev, exercise.id]
                      );
                    }}
                    onEdit={() => onEditExercise(exercise)}
                    onDelete={() => onDeleteExercise(exercise.id)}
                  />
                </motion.div>
              );
            })
          ) : (
            <EmptyExerciseState onAddExercise={onAddExercise} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Empty state component
const EmptyExerciseState: React.FC<{ onAddExercise: () => void }> = ({ onAddExercise }) => (
  <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
    <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
    <h3 className="font-medium text-lg mb-1">هیچ حرکتی یافت نشد</h3>
    <p className="text-muted-foreground text-sm mb-4">
      در این دسته‌بندی هنوز حرکتی تعریف نشده است.
    </p>
    <Button 
      onClick={onAddExercise}
      className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white"
    >
      <Plus className="h-4 w-4 ml-2" />
      افزودن حرکت جدید
    </Button>
  </div>
);

export default ExercisesList;
