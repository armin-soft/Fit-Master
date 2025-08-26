
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

interface UseStudentProgramManagerProps {
  student: Student;
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  existingPrograms?: {
    exercises: any[];
    meals: any[];
    supplements: any[];
  };
}

export function useStudentProgramManager({
  student,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  existingPrograms
}: UseStudentProgramManagerProps) {
  const [activeTab, setActiveTab] = useState("exercise");
  const { toast } = useToast();

  // Exercise state
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(1);
  
  // Diet state
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [currentDietDay, setCurrentDietDay] = useState<number>(1);
  
  // Supplement state
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [currentSupplementDay, setCurrentSupplementDay] = useState<number>(1);

  // Load exercises when current day changes
  useEffect(() => {
    const exercises = existingPrograms?.exercises;
    if (!exercises) {
      setSelectedExercises([]);
      return;
    }
    
    const dayExercises = exercises.filter(
      (program: any) => program.dayOfWeek === currentDay
    );
    
    if (dayExercises.length > 0) {
      const loadedExercises: ExerciseWithSets[] = dayExercises.map((program: any) => ({
        id: program.exerciseId,
        sets: program.sets || 3,
        reps: program.reps || "12",
        day: currentDay
      }));
      setSelectedExercises(loadedExercises);
    } else {
      setSelectedExercises([]);
    }
  }, [currentDay, existingPrograms]);

  // Load meals when current diet day changes
  useEffect(() => {
    const meals = existingPrograms?.meals;
    if (!meals) {
      setSelectedMeals([]);
      return;
    }
    
    const dayMeals = meals.filter(
      (plan: any) => plan.dayOfWeek === currentDietDay
    );
    if (dayMeals.length > 0) {
      setSelectedMeals(dayMeals.map((plan: any) => plan.mealId));
    } else {
      setSelectedMeals([]);
    }
  }, [currentDietDay, existingPrograms]);

  // Load supplements - they are not day-specific but global for the student
  useEffect(() => {
    const supplements = existingPrograms?.supplements;
    if (!supplements) {
      setSelectedSupplements([]);
      setSelectedVitamins([]);
      return;
    }
    
    const supplementIds = supplements
      .filter((s: any) => s.supplementType === 'supplement')
      .map((s: any) => s.supplementId);
    const vitaminIds = supplements
      .filter((s: any) => s.supplementType === 'vitamin')
      .map((s: any) => s.supplementId);
    
    setSelectedSupplements(supplementIds);
    setSelectedVitamins(vitaminIds);
  }, [existingPrograms]);

  // This hook now only relies on existingPrograms data from the database, not student object properties

  const handleSaveAll = async () => {
    console.log('handleSaveAll called');
    
    try {
      // Save exercises for the current day using new bulk API
      if (selectedExercises.length > 0) {
        console.log('Saving exercises for student', student.id, 'day', currentDay, ':', selectedExercises);
        
        const response = await fetch(`/api/students/${student.id}/exercise-programs/bulk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            exercises: selectedExercises,
            day: currentDay
          })
        });

        if (!response.ok) {
          throw new Error('Failed to save exercises');
        }

        const result = await response.json();
        console.log('Exercises saved successfully:', result);
        
        // Force refresh of existing programs by triggering a window event
        window.dispatchEvent(new CustomEvent('programsUpdated', { detail: { studentId: student.id } }));
      }
      
      // Save meals for the current diet day using new bulk API
      if (selectedMeals.length > 0) {
        console.log('Saving meals for student', student.id, 'day', currentDietDay, ':', selectedMeals);
        
        const response = await fetch(`/api/students/${student.id}/meal-plans/bulk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            meals: selectedMeals,
            day: currentDietDay
          })
        });

        if (!response.ok) {
          throw new Error('Failed to save meals');
        }

        const result = await response.json();
        console.log('Meals saved successfully:', result);
      }
      
      // Save supplements - they are global, not day-specific
      if (selectedSupplements.length > 0 || selectedVitamins.length > 0) {
        console.log('Saving supplements for student', student.id, ':', { supplements: selectedSupplements, vitamins: selectedVitamins });
        
        const response = await fetch(`/api/students/${student.id}/supplements/bulk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            supplements: selectedSupplements,
            vitamins: selectedVitamins
          })
        });

        if (!response.ok) {
          throw new Error('Failed to save supplements');
        }

        const result = await response.json();
        console.log('Supplements saved successfully:', result);
      }
      
      // Force refresh of existing programs by triggering a window event
      window.dispatchEvent(new CustomEvent('programsUpdated', { detail: { studentId: student.id } }));
      
      toast({
        title: "ذخیره موفق",
        description: "برنامه‌های شاگرد با موفقیت ذخیره شد",
      });
      
      console.log('All saves completed');
    } catch (error) {
      console.error('Error saving programs:', error);
      toast({
        title: "خطا در ذخیره",
        description: "مشکلی در ذخیره برنامه‌ها رخ داد",
        variant: "destructive"
      });
    }
  };

  return {
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
  };
}
