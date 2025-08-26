
import { Student } from "@/components/students/StudentTypes";
import { storageManager } from "@/utils/storageManager";

export const saveStudentLogin = async (student: Student): Promise<boolean> => {
  const loginSaved = await storageManager.setItem("studentLoggedIn", "true");
  const idSaved = await storageManager.setItem("loggedInStudentId", student.id.toString());
  const studentDataSaved = await storageManager.setItem("studentData", JSON.stringify(student));
  
  console.log('storage: Storage results - login:', loginSaved, 'id:', idSaved, 'data:', studentDataSaved);
  
  return loginSaved && idSaved && studentDataSaved;
};

export const checkStorageAvailability = (): string | null => {
  console.log('storage: Storage availability:', storageManager.isAvailable());
  
  if (!storageManager.isAvailable()) {
    return "مرورگر شما دسترسی به ذخیره‌سازی را مسدود کرده است. لطفاً تنظیمات حریم خصوصی را بررسی کنید.";
  }
  
  return null;
};
