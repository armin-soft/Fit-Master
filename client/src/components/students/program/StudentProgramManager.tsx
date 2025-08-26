
import React, { useMemo } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { useStudentProgramManager } from "./hooks/useStudentProgramManager";
import { useStudentAllPrograms } from "@/hooks/students/useStudentPrograms";
import StudentProgramHeader from "./components/StudentProgramHeader";
import StudentProgramTabs from "./components/StudentProgramTabs";
import StudentProgramExerciseContent from "./components/StudentProgramExerciseContent";
import StudentProgramDietContent from "./components/StudentProgramDietContent";
import StudentProgramSupplementContent from "./components/StudentProgramSupplementContent";
import { Loader2 } from "lucide-react";

interface StudentProgramManagerProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  onClose: () => void;
}

const StudentProgramManager: React.FC<StudentProgramManagerProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  onClose
}) => {
  console.log('StudentProgramManager: Received meals count:', meals?.length || 0);
  console.log('StudentProgramManager: Sample meal:', meals?.[0]);
  // Fetch existing student programs
  const { exercisePrograms, mealPlans, supplements: studentSupplements, isLoading } = useStudentAllPrograms(student.id);

  // Memoize the existingPrograms object to prevent infinite re-renders
  const existingPrograms = useMemo(() => ({
    exercises: exercisePrograms.data || [],
    meals: mealPlans.data || [],
    supplements: studentSupplements.data || []
  }), [exercisePrograms.data, mealPlans.data, studentSupplements.data]);

  const {
    activeTab,
    setActiveTab,
    currentDay,
    setCurrentDay,
    currentDietDay,
    setCurrentDietDay,
    currentSupplementDay,
    setCurrentSupplementDay,
    selectedExercises,
    setSelectedExercises,
    selectedMeals,
    setSelectedMeals,
    selectedSupplements,
    setSelectedSupplements,
    selectedVitamins,
    setSelectedVitamins,
    handleSaveAll
  } = useStudentProgramManager({
    student,
    onSaveExercises,
    onSaveDiet,
    onSaveSupplements,
    existingPrograms
  });

  // Show loading state while fetching existing programs
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
          <p className="text-slate-600 dark:text-slate-400">بارگذاری برنامه‌های موجود...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full w-full flex flex-col text-right" dir="rtl">
      <StudentProgramHeader 
        student={student} 
        onClose={onClose} 
        handleSaveAll={handleSaveAll} 
      />

      <StudentProgramTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentDay={activeTab === "exercise" 
          ? currentDay 
          : activeTab === "diet" 
            ? currentDietDay 
            : currentSupplementDay}
        setCurrentDay={activeTab === "exercise" 
          ? setCurrentDay 
          : activeTab === "diet" 
            ? setCurrentDietDay 
            : setCurrentSupplementDay}
      >
        <StudentProgramExerciseContent 
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          selectedExercises={selectedExercises}
          setSelectedExercises={setSelectedExercises}
          exercises={exercises}
        />
        
        <StudentProgramDietContent 
          selectedMeals={selectedMeals}
          setSelectedMeals={setSelectedMeals}
          meals={meals}
          currentDietDay={currentDietDay}
          setCurrentDietDay={setCurrentDietDay}
        />
        
        <StudentProgramSupplementContent 
          selectedSupplements={selectedSupplements}
          setSelectedSupplements={setSelectedSupplements}
          selectedVitamins={selectedVitamins}
          setSelectedVitamins={setSelectedVitamins}
          supplements={supplements}
          currentDay={currentSupplementDay}
          setCurrentDay={setCurrentSupplementDay}
        />
      </StudentProgramTabs>
    </div>
  );
};

export default StudentProgramManager;
