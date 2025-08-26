
import { WeekDay, DietStats } from './types';

export const WEEK_DAYS: WeekDay[] = [
  'شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'
];

export const calculateStats = (meals: any[], getDayMeals: (day: string) => any[], selectedDay: string): DietStats => {
  const totalMeals = meals.length;
  const todayMeals = getDayMeals(selectedDay).length;
  const activeDays = WEEK_DAYS.filter(day => getDayMeals(day).length > 0).length;

  return {
    totalMeals,
    todayMeals,
    activeDays
  };
};
