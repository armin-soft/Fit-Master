import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  Utensils, 
  Coffee, 
  Cookie, 
  Apple, 
  ChefHat,
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
  Plus,
  Minus,
  Calendar,
  Flame,
  Activity,
  Timer,
  Award,
  Star
} from "lucide-react";

// Meal types with their details
const MEAL_TYPES = [
  { 
    id: 'breakfast', 
    name: 'صبحانه', 
    icon: Coffee, 
    time: '7:00', 
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800'
  },
  { 
    id: 'snack1', 
    name: 'میان‌وعده صبح', 
    icon: Cookie, 
    time: '10:00', 
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800'
  },
  { 
    id: 'lunch', 
    name: 'ناهار', 
    icon: Utensils, 
    time: '13:00', 
    color: 'from-sky-500 to-sky-600',
    bgColor: 'bg-sky-50 dark:bg-sky-900/20',
    borderColor: 'border-sky-200 dark:border-sky-800'
  },
  { 
    id: 'snack2', 
    name: 'میان‌وعده عصر', 
    icon: Apple, 
    time: '16:00', 
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800'
  },
  { 
    id: 'dinner', 
    name: 'شام', 
    icon: ChefHat, 
    time: '19:00', 
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800'
  }
];

// Macronutrient colors
const MACRO_COLORS = {
  carbs: { color: 'text-sky-600', bg: 'bg-sky-100 dark:bg-sky-900/30', icon: '🍞' },
  protein: { color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30', icon: '🥩' },
  fat: { color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/30', icon: '🥑' },
  fiber: { color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30', icon: '🥬' }
};

const StudentDiet = () => {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>({});
  const [mealPortions, setMealPortions] = useState<Record<string, number>>({});
  const deviceInfo = useDeviceInfo();

  // Get current student data
  const { data: currentStudent, isLoading: isLoadingStudent } = useQuery<any>({
    queryKey: ['/api/current-student'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch student meal plans
  const { data: mealPlans = [], isLoading: isLoadingMeals } = useQuery<any[]>({
    queryKey: [`/api/students/${currentStudent?.id}/meal-plans`],
    enabled: !!currentStudent?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Group meals by type
  const mealsByType = MEAL_TYPES.map(type => {
    const meals = mealPlans.filter((meal: any) => 
      meal.mealType === type.id || 
      meal.type === type.id ||
      (meal.mealName && meal.mealName.includes(type.name))
    );
    
    return {
      ...type,
      meals: meals,
      totalCalories: meals.reduce((sum: number, meal: any) => sum + (meal.calories || meal.totalCalories || 0), 0),
      isCompleted: completedMeals[type.id] || false
    };
  });

  // Calculate daily totals
  const completedMealTypes = Object.values(completedMeals).filter(Boolean).length;
  const totalMealTypes = MEAL_TYPES.length;
  const progressPercentage = totalMealTypes > 0 ? (completedMealTypes / totalMealTypes) * 100 : 0;

  const dailyCalories = mealsByType.reduce((sum, type) => 
    sum + (type.isCompleted ? type.totalCalories : 0), 0
  );

  const targetCalories = currentStudent?.targetCalories || 
    mealsByType.reduce((sum, type) => sum + type.totalCalories, 0) || 
    2000; // Default

  const calorieProgress = targetCalories > 0 ? (dailyCalories / targetCalories) * 100 : 0;

  // Handle meal completion toggle
  const handleMealToggle = (mealType: string) => {
    setCompletedMeals(prev => ({
      ...prev,
      [mealType]: !prev[mealType]
    }));
  };

  // Handle portion adjustment
  const adjustPortion = (mealId: string, adjustment: number) => {
    setMealPortions(prev => ({
      ...prev,
      [mealId]: Math.max(0.5, (prev[mealId] || 1) + adjustment)
    }));
  };

  // Responsive classes
  const containerPadding = deviceInfo.isMobile ? "p-4" : deviceInfo.isTablet ? "p-6" : "p-8";
  const cardPadding = deviceInfo.isMobile ? "p-4" : deviceInfo.isTablet ? "p-5" : "p-6";
  const gridCols = deviceInfo.isMobile ? "grid-cols-1" : deviceInfo.isTablet ? "grid-cols-2" : "grid-cols-3";

  if (isLoadingStudent || isLoadingMeals) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", containerPadding)} dir="rtl">
        <Card className={cn("text-center max-w-md w-full", cardPadding)}>
          <CardContent>
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">در حال بارگذاری برنامه غذایی...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", containerPadding)} dir="rtl">
        <Card className={cn("text-center max-w-md w-full", cardPadding)}>
          <CardContent>
            <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">خطا در دریافت اطلاعات</h3>
            <p className="text-gray-600">اطلاعات شاگرد یافت نشد.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800", containerPadding)} dir="rtl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              برنامه غذایی
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              امروز - {toPersianNumbers(totalMealTypes)} وعده غذایی
            </p>
          </div>
          <div className="text-left">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">
              {toPersianNumbers(Math.round(progressPercentage))}%
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">پیشرفت امروز</p>
          </div>
        </div>

        {/* Progress Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meals Progress Card */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            <CardContent className={cardPadding}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-semibold">پیشرفت وعده‌ها</h3>
                    <p className="text-green-100">
                      {toPersianNumbers(completedMealTypes)} از {toPersianNumbers(totalMealTypes)} وعده تکمیل شده
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{toPersianNumbers(completedMealTypes)}</div>
                  <div className="text-sm text-green-100">تکمیل شده</div>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-white/20" />
            </CardContent>
          </Card>

          {/* Calories Progress Card */}
          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
            <CardContent className={cardPadding}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Flame className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-semibold">کالری مصرفی</h3>
                    <p className="text-orange-100">
                      {toPersianNumbers(dailyCalories)} از {toPersianNumbers(targetCalories)} کالری
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{toPersianNumbers(dailyCalories)}</div>
                  <div className="text-sm text-orange-100">کالری</div>
                </div>
              </div>
              <Progress value={Math.min(calorieProgress, 100)} className="h-3 bg-white/20" />
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Meal Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {mealsByType.map((mealType, index) => {
          const IconComponent = mealType.icon;
          const isExpanded = selectedMeal === mealType.id;
          
          return (
            <motion.div
              key={mealType.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={cn(
                "transition-all duration-300 border-2 hover:shadow-lg",
                mealType.isCompleted ? `${mealType.bgColor} ${mealType.borderColor}` : "hover:border-gray-300 dark:hover:border-gray-600",
                isExpanded && "ring-2 ring-blue-500 ring-offset-2"
              )}>
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setSelectedMeal(isExpanded ? null : mealType.id)}
                  data-testid={`card-meal-${mealType.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg",
                        `bg-gradient-to-br ${mealType.color}`
                      )}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                            {mealType.name}
                          </h3>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {toPersianNumbers(mealType.time)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Flame className="w-4 h-4" />
                            <span>{toPersianNumbers(mealType.totalCalories)} کالری</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Utensils className="w-4 h-4" />
                            <span>{toPersianNumbers(mealType.meals.length)} آیتم</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {mealType.isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      ) : (
                        <Target className="w-8 h-8 text-gray-400" />
                      )}
                      <Button
                        variant={mealType.isCompleted ? "outline" : "default"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMealToggle(mealType.id);
                        }}
                        className={cn(
                          mealType.isCompleted && "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        )}
                        data-testid={`button-toggle-meal-${mealType.id}`}
                      >
                        {mealType.isCompleted ? (
                          <>
                            <Star className="w-4 h-4 ml-2" />
                            تکمیل شد
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 ml-2" />
                            تکمیل کردن
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Expanded Meal Details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Separator />
                    <CardContent className={cn("space-y-4", cardPadding)}>
                      {mealType.meals.length === 0 ? (
                        <div className="text-center py-8">
                          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600">هنوز غذایی برای این وعده تعریف نشده</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {mealType.meals.map((meal: any, mealIndex: number) => {
                            const portion = mealPortions[meal.id] || 1;
                            const adjustedCalories = Math.round((meal.calories || meal.totalCalories || 0) * portion);
                            
                            return (
                              <div key={meal.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-semibold text-lg">
                                    {meal.foodName || meal.name || `غذای ${mealIndex + 1}`}
                                  </h4>
                                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                    {toPersianNumbers(adjustedCalories)} کالری
                                  </Badge>
                                </div>
                                
                                {/* Portion Control */}
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-sm text-muted-foreground">اندازه پرس:</span>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => adjustPortion(meal.id, -0.25)}
                                      disabled={portion <= 0.5}
                                      data-testid={`button-decrease-portion-${meal.id}`}
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="min-w-[60px] text-center font-semibold">
                                      {toPersianNumbers(portion)} پرس
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => adjustPortion(meal.id, 0.25)}
                                      disabled={portion >= 2}
                                      data-testid={`button-increase-portion-${meal.id}`}
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Macronutrients */}
                                {(meal.carbs || meal.protein || meal.fat) && (
                                  <div className="grid grid-cols-3 gap-2 mb-3">
                                    {meal.carbs && (
                                      <div className={cn("text-center p-2 rounded-lg", MACRO_COLORS.carbs.bg)}>
                                        <div className="text-xs text-muted-foreground mb-1">کربوهیدرات</div>
                                        <div className={cn("font-semibold", MACRO_COLORS.carbs.color)}>
                                          {toPersianNumbers(Math.round(meal.carbs * portion))}g
                                        </div>
                                      </div>
                                    )}
                                    {meal.protein && (
                                      <div className={cn("text-center p-2 rounded-lg", MACRO_COLORS.protein.bg)}>
                                        <div className="text-xs text-muted-foreground mb-1">پروتئین</div>
                                        <div className={cn("font-semibold", MACRO_COLORS.protein.color)}>
                                          {toPersianNumbers(Math.round(meal.protein * portion))}g
                                        </div>
                                      </div>
                                    )}
                                    {meal.fat && (
                                      <div className={cn("text-center p-2 rounded-lg", MACRO_COLORS.fat.bg)}>
                                        <div className="text-xs text-muted-foreground mb-1">چربی</div>
                                        <div className={cn("font-semibold", MACRO_COLORS.fat.color)}>
                                          {toPersianNumbers(Math.round(meal.fat * portion))}g
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Instructions */}
                                {meal.instructions && (
                                  <div className="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 p-3 rounded-lg">
                                    <span className="font-medium">دستورالعمل: </span>
                                    {meal.instructions}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Daily Summary */}
      {mealPlans.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                خلاصه تغذیه امروز
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {toPersianNumbers(dailyCalories)}
                  </div>
                  <div className="text-sm text-muted-foreground">کالری مصرفی</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {toPersianNumbers(completedMealTypes)}
                  </div>
                  <div className="text-sm text-muted-foreground">وعده تکمیل</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {toPersianNumbers(Math.round(progressPercentage))}%
                  </div>
                  <div className="text-sm text-muted-foreground">پیشرفت</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {toPersianNumbers(mealPlans.length)}
                  </div>
                  <div className="text-sm text-muted-foreground">آیتم غذایی</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default StudentDiet;