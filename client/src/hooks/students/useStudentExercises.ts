import { Student } from '@/components/students/StudentTypes';
import { useToast } from '@/hooks/use-toast';
import { ExerciseWithSets } from '@/types/exercise';
import { Dispatch, SetStateAction } from 'react';

export const useStudentExercises = (
  students: Student[], 
  setStudents: Dispatch<SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  
  const handleSaveExercises = async (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
    try {
      console.log(`Saving exercises for student ${studentId} day ${dayNumber || 'general'}:`, exercisesWithSets);
      
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student };
          
          // Extract exercise IDs and sets
          const exerciseIds = exercisesWithSets.map(ex => ex.id);
          const exerciseSets = exercisesWithSets.reduce((acc, ex) => {
            acc[ex.id] = Number(ex.sets);
            return acc;
          }, {} as Record<number, number>);
          
          // Extract reps information as strings
          const exerciseReps = exercisesWithSets.reduce((acc, ex) => {
            if (ex.reps !== undefined) acc[ex.id] = String(ex.reps);
            return acc;
          }, {} as Record<number, string>);
          
          // Initialize reps objects if needed
          updatedStudent.exerciseReps = updatedStudent.exerciseReps || {};
          updatedStudent.exerciseRepsDay1 = updatedStudent.exerciseRepsDay1 || {};
          updatedStudent.exerciseRepsDay2 = updatedStudent.exerciseRepsDay2 || {};
          updatedStudent.exerciseRepsDay3 = updatedStudent.exerciseRepsDay3 || {};
          updatedStudent.exerciseRepsDay4 = updatedStudent.exerciseRepsDay4 || {};
          updatedStudent.exerciseRepsDay5 = updatedStudent.exerciseRepsDay5 || {};
          updatedStudent.exerciseRepsDay6 = updatedStudent.exerciseRepsDay6 || {};
          
          // If dayNumber is provided, update the specific day's exercises
          if (dayNumber !== undefined) {
            switch(dayNumber) {
              case 1:
                updatedStudent.exercisesDay1 = exerciseIds;
                updatedStudent.exerciseSetsDay1 = exerciseSets;
                updatedStudent.exerciseRepsDay1 = exerciseReps;
                break;
              case 2:
                updatedStudent.exercisesDay2 = exerciseIds;
                updatedStudent.exerciseSetsDay2 = exerciseSets;
                updatedStudent.exerciseRepsDay2 = exerciseReps;
                break;
              case 3:
                updatedStudent.exercisesDay3 = exerciseIds;
                updatedStudent.exerciseSetsDay3 = exerciseSets;
                updatedStudent.exerciseRepsDay3 = exerciseReps;
                break;
              case 4:
                updatedStudent.exercisesDay4 = exerciseIds;
                updatedStudent.exerciseSetsDay4 = exerciseSets;
                updatedStudent.exerciseRepsDay4 = exerciseReps;
                break;
              case 5:
                // Initialize day 5 properties if they don't exist
                if (!updatedStudent.exercisesDay5) {
                  updatedStudent.exercisesDay5 = [];
                }
                if (!updatedStudent.exerciseSetsDay5) {
                  updatedStudent.exerciseSetsDay5 = {};
                }
                if (!updatedStudent.exerciseRepsDay5) {
                  updatedStudent.exerciseRepsDay5 = {};
                }
                
                updatedStudent.exercisesDay5 = exerciseIds;
                updatedStudent.exerciseSetsDay5 = exerciseSets;
                updatedStudent.exerciseRepsDay5 = exerciseReps;
                break;
              case 6:
                // Initialize day 6 properties if they don't exist
                if (!updatedStudent.exercisesDay6) {
                  updatedStudent.exercisesDay6 = [];
                }
                if (!updatedStudent.exerciseSetsDay6) {
                  updatedStudent.exerciseSetsDay6 = {};
                }
                if (!updatedStudent.exerciseRepsDay6) {
                  updatedStudent.exerciseRepsDay6 = {};
                }
                
                updatedStudent.exercisesDay6 = exerciseIds;
                updatedStudent.exerciseSetsDay6 = exerciseSets;
                updatedStudent.exerciseRepsDay6 = exerciseReps;
                break;
              default:
                // For invalid day number, update day 1
                updatedStudent.exercisesDay1 = exerciseIds;
                updatedStudent.exerciseSetsDay1 = exerciseSets; 
                updatedStudent.exerciseRepsDay1 = exerciseReps;
                break;
            }
          } else {
            // Otherwise update the general exercises as number[]
            updatedStudent.exercises = exerciseIds;
            updatedStudent.exerciseSets = exerciseSets;
            updatedStudent.exerciseReps = exerciseReps;
          }
          
          // Calculate progress
          let progressCount = 0;
          if (updatedStudent.exercises?.length) progressCount++;
          if (updatedStudent.exercisesDay1?.length || updatedStudent.exercisesDay2?.length || 
              updatedStudent.exercisesDay3?.length || updatedStudent.exercisesDay4?.length ||
              updatedStudent.exercisesDay5?.length || updatedStudent.exercisesDay6?.length) {
            progressCount++;
          }
          if (updatedStudent.meals?.length) progressCount++;
          if (updatedStudent.supplements?.length || updatedStudent.vitamins?.length) progressCount++;
          
          updatedStudent.progress = Math.round((progressCount / 4) * 100);
          
          return updatedStudent;
        }
        return student;
      });
      
      setStudents(updatedStudents);
      
      // Save to database
      try {
        const { setStorageItem } = await import('@/utils/databaseStorage');
        await setStorageItem('students', updatedStudents);
      } catch (storageError) {
        console.error('Error saving to database:', storageError);
        // Continue with the function even if storage fails
      }
      
      toast({
        title: "افزودن موفق",
        description: `برنامه تمرینی ${dayNumber ? `روز ${dayNumber}` : ''} با موفقیت به شاگرد اضافه شد`
      });
      return true;
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه تمرینی پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  return { handleSaveExercises };
};
