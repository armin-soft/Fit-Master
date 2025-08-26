
// انواع حرکت‌های اصلی
export interface ExerciseType {
  id: number;
  name: string;
  color?: string;
  trainerId: number;
  createdAt: string;
}

// دسته‌بندی‌های هر نوع حرکت (زیرمجموعه‌ها)
export interface ExerciseCategory {
  id: number;
  name: string;
  type: string;
  typeId?: number;
  color?: string;
  icon?: string;
  trainerId: number;
  createdAt: string;
}

// حرکت‌های تمرینی
export interface Exercise {
  id: number;
  name: string;
  categoryId: number;
  targetMuscle?: string;
  equipment?: string;
  category?: string; // افزودن فیلد category برای سازگاری با سایر بخش‌ها
  sets?: number; // فیلدهای مورد نیاز برای StudentExerciseDialog
  reps?: number;
  day?: number;
  type?: string; // نوع تمرین مانند "قدرتی"، "استقامتی" و غیره
  difficulty?: "easy" | "medium" | "hard"; // سطح دشواری تمرین
  imageUrl?: string; // آدرس تصویر حرکت
  videoUrl?: string; // آدرس ویدیوی آموزشی
  instructions?: string[]; // دستورالعمل‌های انجام حرکت
  muscles?: string[]; // عضلات درگیر
}

// Interface for exercise with sets and reps information
export interface ExerciseWithSets {
  id: number;
  sets: number;
  reps: string; // تغییر از number به string برای سازگاری با src/hooks/exercise-selection/types.ts
  day?: number;
  weight?: string;
  intensity?: number;
}
