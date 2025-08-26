
import { useState, useMemo } from 'react';
import { Meal, WeekDay } from '../types';

export const useDietFilters = (meals: Meal[]) => {
  const [selectedDay, setSelectedDay] = useState<WeekDay>('شنبه');
  const [searchQuery, setSearchQuery] = useState('');

  // فیلتر وعده‌های غذایی
  const filteredMeals = useMemo(() => {
    return meals.filter(meal => {
      const matchesSearch = !searchQuery || 
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [meals, searchQuery]);

  // دریافت وعده‌های روز انتخاب شده
  const getDayMeals = (day: string) => {
    const dayMeals = filteredMeals.filter(meal => meal.day === day);
    console.log(`DEBUG: getDayMeals for ${day}:`, dayMeals.length, 'meals');
    return dayMeals;
  };

  // دریافت وعده‌های هر نوع در روز انتخاب شده
  const getMealsByType = (type: string) => {
    return getDayMeals(selectedDay).filter(meal => meal.type === type);
  };

  // تابع برای تغییر روز با تبدیل صحیح نوع
  const handleDayChange = (day: string) => {
    setSelectedDay(day as WeekDay);
  };

  return {
    selectedDay,
    setSelectedDay: handleDayChange,
    searchQuery,
    setSearchQuery,
    filteredMeals,
    getDayMeals,
    getMealsByType
  };
};
