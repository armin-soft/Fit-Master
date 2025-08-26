
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Utensils, 
  Plus, 
  Sparkles,
  Coffee,
  Sun,
  Sunset,
  Moon,
  Search,
  ChefHat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageContainer } from "@/components/ui/page-container";
import { AddMealDialog } from "@/components/diet/AddMealDialog";
import { useMealManagement } from "@/components/diet/hooks/useMealManagement";
import { useDietFilters } from "@/components/diet/hooks/useDietFilters";
import { MealCard } from "@/components/diet/MealCard";
import { MealTypeSelector } from "@/components/diet/MealTypeSelector";
import { DaySelector } from "./components/DaySelector";
import { StatsCards } from "./components/StatsCards";
import { EmptyState } from "./components/EmptyState";
import { calculateStats } from "./utils";
import { MealType, Meal } from "@/components/diet/types";

const MEAL_TYPES: MealType[] = [
  { 
    id: 'صبحانه', 
    name: 'صبحانه', 
    icon: Coffee, 
    color: 'bg-brand-400/10 border-brand-500/30 text-brand-600 dark:bg-brand-500/20 dark:border-brand-400/50 dark:text-brand-400'
  },
  { 
    id: 'میان وعده صبح', 
    name: 'میان وعده صبح', 
    icon: Sun, 
    color: 'bg-warning-500/10 border-warning-500/30 text-warning-600 dark:bg-warning-500/20 dark:border-warning-500/50 dark:text-warning-500'
  },
  { 
    id: 'ناهار', 
    name: 'ناهار', 
    icon: Utensils, 
    color: 'bg-brand-500/10 border-brand-500/30 text-brand-700 dark:bg-brand-500/20 dark:border-brand-500/50 dark:text-brand-500'
  },
  { 
    id: 'میان وعده عصر', 
    name: 'میان وعده عصر', 
    icon: Sunset, 
    color: 'bg-info-500/10 border-info-500/30 text-info-600 dark:bg-info-500/20 dark:border-info-500/50 dark:text-info-500'
  },
  { 
    id: 'شام', 
    name: 'شام', 
    icon: ChefHat, 
    color: 'bg-info-500/10 border-info-500/30 text-info-600 dark:bg-info-500/20 dark:border-info-500/50 dark:text-info-500'
  },
  { 
    id: 'میان وعده شام', 
    name: 'میان وعده شام', 
    icon: Moon, 
    color: 'bg-brand-600/10 border-brand-600/30 text-brand-700 dark:bg-brand-600/20 dark:border-brand-600/50 dark:text-brand-600'
  }
];

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  // استفاده از هوک‌های ریفکتور شده
  const { meals, loading, deleteMeal, saveMeal } = useMealManagement();
  const {
    selectedDay,
    setSelectedDay,
    searchQuery,
    setSearchQuery,
    getDayMeals,
    getMealsByType
  } = useDietFilters(meals);

  // محاسبه آمار
  const stats = calculateStats(meals, getDayMeals, selectedDay);
  
  // دیباگ لاگ برای آمار
  console.log('DEBUG: Diet stats:', stats);
  console.log('DEBUG: Current meals:', meals.length);
  console.log('DEBUG: Selected day:', selectedDay);

  // ویرایش وعده غذایی
  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setDialogOpen(true);
  };

  // افزودن وعده جدید
  const handleAddMeal = () => {
    setEditingMeal(null);
    setDialogOpen(true);
  };

  // ذخیره وعده غذایی
  const handleSaveMeal = (mealData: Omit<Meal, 'id'>) => {
    saveMeal(mealData, editingMeal || undefined);
    setDialogOpen(false);
    setEditingMeal(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-brand-400/5 via-white to-info-500/5 dark:from-brand-500/10 dark:via-gray-900 dark:to-info-500/10">
        <div className="flex items-center justify-center h-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      className="w-full h-full min-h-screen overflow-x-hidden"
    >
      <div className="w-full h-full flex flex-col overflow-x-hidden p-4 sm:p-6" dir="rtl">
        {/* هدر صفحه */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-info-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-warning-500 to-brand-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-brand-600 via-info-600 to-brand-700 bg-clip-text text-transparent mb-2">
            برنامه‌های غذایی
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            مدیریت و تنظیم برنامه‌های غذایی هفتگی
          </p>
        </motion.div>

        {/* کارت‌های آمار */}
        <StatsCards stats={stats} />

        {/* نوار ابزار */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 shadow-lg"
        >
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="جستجو در وعده‌های غذایی..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 h-10 text-sm border-gray-200 dark:border-gray-700 focus:border-brand-500 dark:focus:border-brand-400 bg-white/80 dark:bg-gray-900/80"
            />
          </div>
          <Button
            onClick={handleAddMeal}
            className="bg-gradient-to-r from-brand-500 to-info-500 hover:from-brand-600 hover:to-info-600 text-white px-4 h-10 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
          >
            <Plus className="ml-2 h-4 w-4" />
            افزودن وعده غذایی
          </Button>
        </motion.div>

        {/* تب‌های روزهای هفته */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <DaySelector 
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
              getDayMeals={getDayMeals}
            />

            {/* محتوای تب‌ها */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDay}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full pb-8">
                    {getDayMeals(selectedDay).length > 0 ? (
                      <div className="space-y-4 sm:space-y-6">
                        {MEAL_TYPES.map((mealType) => {
                          const mealsForType = getMealsByType(mealType.id);
                          if (mealsForType.length === 0) return null;

                          return (
                            <motion.div
                              key={mealType.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <MealTypeSelector 
                                mealType={mealType}
                                meals={mealsForType}
                              >
                                {mealsForType.map((meal, index) => (
                                  <MealCard
                                    key={meal.id}
                                    meal={meal}
                                    onEdit={handleEditMeal}
                                    onDelete={deleteMeal}
                                    index={index}
                                  />
                                ))}
                              </MealTypeSelector>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <EmptyState 
                        selectedDay={selectedDay}
                        onAddMeal={handleAddMeal}
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>

        {/* دیالوگ افزودن/ویرایش وعده غذایی */}
        <AddMealDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          meal={editingMeal}
          onSave={handleSaveMeal}
          defaultDay={selectedDay} // ارسال روز انتخابی به عنوان پیش‌فرض
        />
      </div>
    </PageContainer>
  );
};

export default Index;
