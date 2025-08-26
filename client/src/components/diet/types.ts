
export interface Meal {
  id: number;
  name: string;
  type: string;
  day: string;
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
}

export interface MealType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient?: string;
}

export type WeekDay = 'شنبه' | 'یکشنبه' | 'دوشنبه' | 'سه شنبه' | 'چهارشنبه' | 'پنج شنبه' | 'جمعه';

export interface DietStats {
  totalMeals: number;
  todayMeals: number;
  activeDays: number;
}
