import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";

export const useStudentDiet = (
  students: Student[], 
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  
  const handleSaveDiet = async (mealIds: number[], studentId: number, dayNumber?: number) => {
    try {
      console.log(`Saving meals for student ${studentId} day ${dayNumber || 'general'}:`, mealIds);
      
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student };
          
          // If dayNumber is provided, update the specific day's meals
          if (dayNumber !== undefined) {
            switch(dayNumber) {
              case 1:
                updatedStudent.mealsDay1 = [...mealIds];
                break;
              case 2:
                updatedStudent.mealsDay2 = [...mealIds];
                break;
              case 3:
                updatedStudent.mealsDay3 = [...mealIds];
                break;
              case 4:
                updatedStudent.mealsDay4 = [...mealIds];
                break;
              case 5:
                updatedStudent.mealsDay5 = [...mealIds];
                break;
              case 6:
                updatedStudent.mealsDay6 = [...mealIds];
                break;
              case 7:
                updatedStudent.mealsDay7 = [...mealIds];
                break;
              default:
                // در صورت ارسال عدد نامعتبر، برنامه کلی را بروزرسانی کنیم
                updatedStudent.meals = [...mealIds];
                break;
            }
          } else {
            // Otherwise update the general meals
            updatedStudent.meals = [...mealIds];
          }
          
          // Calculate progress
          let progressCount = 0;
          if (student.exercises?.length) progressCount++;
          if (student.exercisesDay1?.length || student.exercisesDay2?.length || 
              student.exercisesDay3?.length || student.exercisesDay4?.length) {
            progressCount++;
          }
          if (mealIds.length || student.mealsDay1?.length || student.mealsDay2?.length || 
              student.mealsDay3?.length || student.mealsDay4?.length ||
              student.mealsDay5?.length || student.mealsDay6?.length ||
              student.mealsDay7?.length) {
            progressCount++;
          }
          if (student.supplements?.length || student.vitamins?.length) progressCount++;
          
          const progress = Math.round((progressCount / 4) * 100);
          updatedStudent.progress = progress;
          
          return updatedStudent;
        }
        return student;
      });
      
      console.log("Updated students:", updatedStudents);
      
      // Update state
      setStudents(updatedStudents);
      
      // Ensure we're saving to database correctly
      try {
        const { setStorageItem } = await import('@/utils/databaseStorage');
        await setStorageItem('students', updatedStudents);
      } catch (storageError) {
        console.error('Error saving to database:', storageError);
        // Continue with the function even if storage fails
      }
      
      toast({
        title: "افزودن موفق",
        description: `برنامه غذایی ${dayNumber ? `روز ${dayNumber}` : ''} با موفقیت به شاگرد اضافه شد`
      });
      return true;
    } catch (error) {
      console.error("Error saving diet:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه غذایی پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  return { handleSaveDiet };
};
