
import { useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import { setStorageItem } from "@/utils/databaseStorage";

/**
 * Hook to handle persisting student data to online database
 */
export const useStudentPersistence = (
  students: Student[],
  supplements: any[],
  isInitialized: boolean
) => {
  const { toast } = useToast();

  // Improved save to online database with proper error handling
  useEffect(() => {
    if (!isInitialized || students.length === 0) return;
    
    // بروزرسانی فوری بدون تاخیر
    const saveData = async () => {
      try {
        console.log(`Saving ${students.length} students to online database`);
        await setStorageItem('students', students);
      } catch (error) {
        console.error('Error saving students to database:', error);
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره اطلاعات پیش آمده است. لطفا مجدد تلاش کنید."
        });
      }
    };
    
    saveData();
  }, [students, isInitialized, toast]);

  // Save supplements to online database whenever they change with error handling
  useEffect(() => {
    if (!isInitialized || supplements.length === 0) return;
    
    // بروزرسانی فوری بدون تاخیر
    const saveSupplements = async () => {
      try {
        console.log(`Saving ${supplements.length} supplements to online database`);
        await setStorageItem('supplements', supplements);
      } catch (error) {
        console.error('Error saving supplements to database:', error);
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره اطلاعات مکمل‌ها پیش آمده است. لطفا مجدد تلاش کنید."
        });
      }
    };
    
    saveSupplements();
  }, [supplements, isInitialized, toast]);

  return {};
};
