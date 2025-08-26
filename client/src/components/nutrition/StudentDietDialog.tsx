
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Search, Save, X, Apple, 
  Check, Salad, UtensilsCrossed, Sparkles, ChevronLeft,
  LayoutGrid, ListFilter, SlidersHorizontal
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface StudentDietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[]) => boolean;
  initialMeals: number[];
}

interface Meal {
  id: number;
  name: string;
  day: string;
  type: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

const defaultDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه"
];

const defaultMealTypes = [
  "صبحانه",
  "میان وعده صبح",
  "ناهار",
  "میان وعده عصر",
  "شام",
  "میان وعده شب"
];

export function StudentDietDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialMeals = [],
}: StudentDietDialogProps) {
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [currentDay, setCurrentDay] = useState<string | "all">("all");
  const [currentType, setCurrentType] = useState<string | "all">("all");
  const [days, setDays] = useState<string[]>(defaultDays);
  const [types, setTypes] = useState<string[]>(defaultMealTypes);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (open) {
      console.log("StudentDietDialog opened with initialMeals:", initialMeals);
      setSelectedMeals(initialMeals || []);
    }
  }, [open, initialMeals]);

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const { getStorageItem } = await import('@/utils/databaseStorage');
        const savedMeals = await getStorageItem("meals", []);
        setMeals(Array.isArray(savedMeals) ? savedMeals : []);
      } catch (error) {
        console.error("Error loading meals:", error);
        setMeals([]);
      }
    };
    loadMeals();
  }, []);

  useEffect(() => {
    const mealsWithDays = meals.filter(meal => meal.day);
    const uniqueDays = mealsWithDays.length > 0 
      ? Array.from(new Set(mealsWithDays.map(meal => meal.day)))
      : defaultDays;
    
    const mealsWithTypes = meals.filter(meal => meal.type);
    const uniqueTypes = mealsWithTypes.length > 0
      ? Array.from(new Set(mealsWithTypes.map(meal => meal.type)))
      : defaultMealTypes;
    
    setDays(uniqueDays);
    setTypes(uniqueTypes);
  }, [meals]);

  useEffect(() => {
    let filtered = meals;
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (meal) =>
          meal.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((meal) => meal.day === activeTab);
    }

    if (currentType !== "all") {
      filtered = filtered.filter((meal) => meal.type === currentType);
    }

    setFilteredMeals(filtered);
  }, [searchQuery, meals, activeTab, currentType]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals((prev) => {
      const isSelected = prev.includes(mealId);
      const newSelection = isSelected
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId];
      console.log(`Toggling meal ${mealId}, now selected: ${!isSelected}`, newSelection);
      return newSelection;
    });
  };

  const handleSave = () => {
    console.log("Attempting to save meals in StudentDietDialog:", selectedMeals);
    const success = onSave(selectedMeals);
    console.log("Save result:", success);
    if (success) {
      onOpenChange(false);
    }
    return success;
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case "صبحانه": return "text-primary bg-primary/10 border-primary/20 dark:text-primary dark:bg-primary/20 dark:border-primary/30";
      case "میان وعده صبح": return "text-secondary-foreground bg-secondary/10 border-secondary/20 dark:text-secondary-foreground dark:bg-secondary/20 dark:border-secondary/30";
      case "ناهار": return "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-800";
      case "میان وعده عصر": return "text-destructive bg-destructive/10 border-destructive/20 dark:text-destructive dark:bg-destructive/20 dark:border-destructive/30";
      case "شام": return "text-sky-600 bg-sky-50 border-sky-200 dark:text-sky-400 dark:bg-sky-950/30 dark:border-sky-800";
      case "میان وعده شب": return "text-muted-foreground bg-muted border-border dark:text-muted-foreground dark:bg-muted dark:border-border";
      default: return "text-muted-foreground bg-muted border-border dark:text-muted-foreground dark:bg-muted dark:border-border";
    }
  };

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case "صبحانه": return <Apple className="h-3.5 w-3.5" />;
      case "میان وعده صبح": return <Apple className="h-3.5 w-3.5" />;
      case "ناهار": return <UtensilsCrossed className="h-3.5 w-3.5" />;
      case "میان وعده عصر": return <Salad className="h-3.5 w-3.5" />;
      case "شام": return <UtensilsCrossed className="h-3.5 w-3.5" />;
      case "میان وعده شب": return <Apple className="h-3.5 w-3.5" />;
      default: return <Apple className="h-3.5 w-3.5" />;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full p-0 sm:max-w-full flex flex-col border-0"
        dir="rtl"
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onOpenChange(false)}
                  className="h-10 w-10 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md">
                    <Salad className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <SheetTitle className="text-lg font-bold text-foreground">برنامه غذایی</SheetTitle>
                    <p className="text-sm font-medium text-muted-foreground">{studentName}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "h-9 w-9 border-muted transition-colors",
                          viewMode === "grid" && "bg-primary/10 text-primary"
                        )}
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">نمایش شبکه‌ای</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "h-9 w-9 border-muted transition-colors",
                          viewMode === "list" && "bg-primary/10 text-primary"
                        )}
                        onClick={() => setViewMode("list")}
                      >
                        <ListFilter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">نمایش لیستی</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline" 
                        size="icon"
                        className={cn(
                          "h-9 w-9 border-muted transition-colors",
                          showFilters && "bg-primary/10 text-primary"
                        )}
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">فیلترها</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </SheetHeader>

          {/* Search */}
          <div className="px-6 py-3 border-b bg-muted/20 shrink-0">
            <div className="relative flex-1">
              <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو در برنامه های غذایی..."
                className="pl-3 pr-10 bg-background focus-visible:ring-primary/20 border-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 overflow-hidden bg-muted/10 border-b"
              >
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-foreground">فیلتر بر اساس نوع وعده</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge 
                        variant={currentType === "all" ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:bg-primary/10"
                        onClick={() => setCurrentType("all")}
                      >
                        همه وعده‌ها
                      </Badge>
                      {types.map((type) => (
                        <Badge 
                          key={type}
                          variant={currentType === type ? "default" : "outline"}
                          className={`cursor-pointer transition-all hover:bg-primary/10 flex gap-1 items-center ${
                            currentType === type ? '' : getMealTypeColor(type).split(' ')[0]
                          }`}
                          onClick={() => setCurrentType(type)}
                        >
                          {getMealTypeIcon(type)}
                          <span>{type}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs and Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="flex-1 flex flex-col overflow-hidden"
              dir="rtl"
            >
              <div className="border-b bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm shadow-sm sticky top-0 z-10 shrink-0">
                <ScrollArea className="w-full">
                  <TabsList className="h-14 w-full justify-center bg-transparent p-1 rounded-none">
                    <TabsTrigger 
                      value="all"
                      className="h-12 rounded-lg border border-transparent px-6 py-3 font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border-primary/20 transition-all duration-200"
                    >
                      همه روزها
                    </TabsTrigger>
                    {days.map((day) => (
                      <TabsTrigger 
                        key={day}
                        value={day}
                        className="h-12 rounded-lg border border-transparent px-6 py-3 font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border-primary/20 transition-all duration-200"
                      >
                        {day}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </ScrollArea>
              </div>

              <TabsContent 
                value={activeTab} 
                className="flex-1 overflow-hidden m-0 p-0 outline-none data-[state=active]:h-full"
                forceMount
                dir="rtl"
              >
                <ScrollArea className="h-full w-full">
                  {filteredMeals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <UtensilsCrossed className="h-8 w-8 text-green-500 dark:text-green-400" />
                      </div>
                      <h3 className="font-medium text-lg text-foreground">هیچ وعده غذایی یافت نشد</h3>
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
                      {filteredMeals.map((meal) => (
                        <motion.div
                          key={meal.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          layout
                        >
                          <div
                            className={`p-4 rounded-xl border transition-all cursor-pointer shadow-sm hover:shadow ${
                              selectedMeals.includes(meal.id)
                                ? "border-primary/30 bg-primary/5 dark:bg-primary/10"
                                : "border-border hover:border-primary/20 bg-card hover:bg-muted/50"
                            }`}
                            onClick={() => toggleMeal(meal.id)}
                          >
                            <div className="flex gap-3 items-start">
                              <div
                                className={`w-5 h-5 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${
                                  selectedMeals.includes(meal.id)
                                    ? "bg-primary"
                                    : "border-2 border-muted-foreground/30"
                                }`}
                              >
                                {selectedMeals.includes(meal.id) && (
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                )}
                              </div>
                              <div className="space-y-2">
                                <div>
                                  <h4 className="font-medium text-base text-foreground">{meal.name}</h4>
                                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getMealTypeColor(meal.type)}`}>
                                      {getMealTypeIcon(meal.type)}
                                      <span>{meal.type}</span>
                                    </span>
                                    <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full">
                                      {meal.day}
                                    </span>
                                  </div>
                                </div>
                                {(meal.calories || meal.protein || meal.carbs || meal.fat) && (
                                  <div className="grid grid-cols-4 gap-1 mt-2">
                                    {meal.calories && (
                                      <div className="text-xs bg-muted/50 dark:bg-muted/20 border border-border p-1 rounded text-center">
                                        <span className="block font-medium text-foreground">کالری</span>
                                        <span className="text-muted-foreground">{toPersianNumbers(meal.calories)}</span>
                                      </div>
                                    )}
                                    {meal.protein && (
                                      <div className="text-xs bg-muted/50 dark:bg-muted/20 border border-border p-1 rounded text-center">
                                        <span className="block font-medium text-foreground">پروتئین</span>
                                        <span className="text-muted-foreground">{toPersianNumbers(meal.protein)}</span>
                                      </div>
                                    )}
                                    {meal.carbs && (
                                      <div className="text-xs bg-muted/50 dark:bg-muted/20 border border-border p-1 rounded text-center">
                                        <span className="block font-medium text-foreground">کربوهیدرات</span>
                                        <span className="text-muted-foreground">{toPersianNumbers(meal.carbs)}</span>
                                      </div>
                                    )}
                                    {meal.fat && (
                                      <div className="text-xs bg-muted/50 dark:bg-muted/20 border border-border p-1 rounded text-center">
                                        <span className="block font-medium text-foreground">چربی</span>
                                        <span className="text-muted-foreground">{toPersianNumbers(meal.fat)}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredMeals.map((meal) => (
                        <motion.div
                          key={meal.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div
                            className={`p-4 transition-all cursor-pointer hover:bg-muted/50 ${
                              selectedMeals.includes(meal.id)
                                ? "bg-primary/5 dark:bg-primary/10"
                                : ""
                            }`}
                            onClick={() => toggleMeal(meal.id)}
                          >
                            <div className="flex gap-3">
                              <div
                                className={`w-5 h-5 rounded-full mt-1.5 flex-shrink-0 flex items-center justify-center transition-colors ${
                                  selectedMeals.includes(meal.id)
                                    ? "bg-primary"
                                    : "border-2 border-muted-foreground/30"
                                }`}
                              >
                                {selectedMeals.includes(meal.id) && (
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-medium text-base text-foreground">{meal.name}</h4>
                                  <div className="flex gap-1.5">
                                    <span className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getMealTypeColor(meal.type)}`}>
                                      {getMealTypeIcon(meal.type)}
                                      <span>{meal.type}</span>
                                    </span>
                                    <span className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full">
                                      {meal.day}
                                    </span>
                                  </div>
                                </div>
                                
                                {(meal.calories || meal.protein || meal.carbs || meal.fat) && (
                                  <div className="flex gap-3 mt-2">
                                    {meal.calories && (
                                      <div className="text-xs flex items-center gap-1">
                                        <span className="font-medium text-foreground">کالری:</span>
                                        <span className="text-muted-foreground">{toPersianNumbers(meal.calories)}</span>
                                      </div>
                                    )}
                                    {meal.protein && (
                                      <div className="text-xs flex items-center gap-1">
                                        <span className="font-medium text-foreground">پروتئین:</span>
                                        <span className="text-muted-foreground">{toPersianNumbers(meal.protein)}</span>
                                      </div>
                                    )}
                                    {meal.carbs && (
                                      <div className="text-xs flex items-center gap-1">
                                        <span className="font-medium text-foreground">کربوهیدرات:</span>
                                        <span className="text-muted-foreground">{toPersianNumbers(meal.carbs)}</span>
                                      </div>
                                    )}
                                    {meal.fat && (
                                      <div className="text-xs flex items-center gap-1">
                                        <span className="font-medium text-foreground">چربی:</span>
                                        <span className="text-muted-foreground">{toPersianNumbers(meal.fat)}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <SheetFooter className="border-t p-4 mt-auto bg-muted/20 shrink-0 flex-row gap-2 justify-between">
            <div className="flex items-center gap-2">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: selectedMeals.length > 0 ? 1 : 0.9, 
                  opacity: selectedMeals.length > 0 ? 1 : 0 
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {toPersianNumbers(selectedMeals.length)} وعده غذایی انتخاب شده
              </motion.div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                انصراف
              </Button>
              <Button
                onClick={handleSave}
                className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
                disabled={selectedMeals.length === 0}
              >
                <Save className="h-4 w-4" />
                ذخیره برنامه غذایی
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
