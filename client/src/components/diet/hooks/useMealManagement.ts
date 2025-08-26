import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Meal } from '../types';

export const useMealManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // بارگذاری وعده‌های غذایی از API
  const { data: apiMeals = [], isLoading: loading } = useQuery({
    queryKey: ['/api/meals'],
    queryFn: async () => {
      const response = await fetch('/api/meals', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      return response.json();
    },
  });

  // استخراج روز از نام وعده غذایی
  const extractDayFromName = (name: string): string => {
    const dayMap = {
      'شنبه': 'شنبه',
      'یکشنبه': 'یکشنبه', 
      'دوشنبه': 'دوشنبه',
      'سه شنبه': 'سه شنبه',
      'چهارشنبه': 'چهارشنبه',
      'پنج شنبه': 'پنج شنبه',
      'جمعه': 'جمعه'
    };
    
    for (const [day, persianDay] of Object.entries(dayMap)) {
      if (name.includes(day)) {
        return persianDay;
      }
    }
    return 'شنبه'; // پیش‌فرض
  };

  // تبدیل داده‌های API به فرمت مورد انتظار کامپوننت
  const meals: Meal[] = apiMeals.map((meal: any) => ({
    id: meal.id,
    name: meal.name,
    type: meal.meal_type || meal.mealType || 'صبحانه', // دعم از هر دو فرمت نام فیلد
    day: meal.day_of_week || meal.dayOfWeek || extractDayFromName(meal.name) // استخراج روز از نام یا پیش‌فرض
  }));

  // دیباگ لاگ برای بررسی وعده‌ها
  console.log('DEBUG: API meals count:', apiMeals.length);
  console.log('DEBUG: Processed meals count:', meals.length);
  if (meals.length > 0) {
    console.log('DEBUG: First meal sample:', meals[0]);
  }

  // Mutation برای ایجاد وعده غذایی جدید
  const createMealMutation = useMutation({
    mutationFn: async (mealData: Omit<Meal, 'id'>) => {
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: mealData.name,
          mealType: mealData.type,
          dayOfWeek: mealData.day, // ارسال روز انتخابی کاربر
          description: null
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create meal');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/meals'] });
      toast({
        title: "افزودن موفق",
        description: "وعده غذایی جدید با موفقیت اضافه شد"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در افزودن وعده غذایی پیش آمد"
      });
    },
  });

  // Mutation برای به‌روزرسانی وعده غذایی
  const updateMealMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: Omit<Meal, 'id'> }) => {
      const response = await fetch(`/api/meals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          mealType: data.type,
          dayOfWeek: data.day, // ارسال روز انتخابی کاربر
          description: null
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update meal');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/meals'] });
      toast({
        title: "ویرایش موفق",
        description: "وعده غذایی با موفقیت ویرایش شد"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ویرایش وعده غذایی پیش آمد"
      });
    },
  });

  // Mutation برای حذف وعده غذایی
  const deleteMealMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/meals/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete meal');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/meals'] });
      toast({
        title: "حذف موفق",
        description: "وعده غذایی با موفقیت حذف شد"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در حذف وعده غذایی پیش آمد"
      });
    },
  });

  // حذف وعده غذایی
  const deleteMeal = async (id: number) => {
    deleteMealMutation.mutate(id);
  };

  // افزودن یا ویرایش وعده غذایی
  const saveMeal = async (mealData: Omit<Meal, 'id'>, editingMeal?: Meal) => {
    if (editingMeal) {
      updateMealMutation.mutate({ id: editingMeal.id, data: mealData });
    } else {
      createMealMutation.mutate(mealData);
    }
  };

  return {
    meals,
    loading,
    deleteMeal,
    saveMeal
  };
};