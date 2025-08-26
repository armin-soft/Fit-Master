
export type MealType = "صبحانه" | "میان وعده صبح" | "ناهار" | "میان وعده عصر" | "شام" | "میان وعده شام";
export type WeekDay = "شنبه" | "یکشنبه" | "دوشنبه" | "سه شنبه" | "چهارشنبه" | "پنج شنبه" | "جمعه";

export interface Meal {
  id: number;
  name: string;
  category?: string;
  description?: string;
  type?: MealType; // برای سازگاری با کدهای قدیمی
  mealType?: MealType; // فیلد camelCase
  meal_type?: MealType; // فیلد اصلی از دیتابیس (snake_case)
  dayOfWeek?: WeekDay; // فیلد camelCase
  day_of_week?: WeekDay; // فیلد اصلی از دیتابیس (snake_case)
  day?: WeekDay; // برای سازگاری با کدهای قدیمی  
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
}
