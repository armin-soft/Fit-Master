import { Meal } from "@/components/diet/types";

interface DietStats {
  totalMeals: number;
  todayMeals: number;
  activeDays: number;
}

const WEEK_DAYS = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'];

export const calculateStats = (meals: Meal[], getDayMeals: (day: string) => Meal[], selectedDay: string): DietStats => {
  const totalMeals = meals.length;
  const todayMeals = getDayMeals(selectedDay).length;
  const activeDays = WEEK_DAYS.filter(day => getDayMeals(day).length > 0).length;

  return {
    totalMeals,
    todayMeals,
    activeDays
  };
};