
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  VisuallyHidden
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Save } from "lucide-react";

type WeekDay = "شنبه" | "یکشنبه" | "دوشنبه" | "سه شنبه" | "چهارشنبه" | "پنج شنبه" | "جمعه";

interface StudentDietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[], dayNumber?: number) => boolean;
  meals: any[];
  initialMeals?: number[];
  initialMealsDay1?: number[];
  initialMealsDay2?: number[];
  initialMealsDay3?: number[];
  initialMealsDay4?: number[];
  initialMealsDay5?: number[];
  initialMealsDay6?: number[];
  initialMealsDay7?: number[];
}

const StudentDietDialog: React.FC<StudentDietDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  meals,
  initialMeals = [],
  initialMealsDay1 = [],
  initialMealsDay2 = [],
  initialMealsDay3 = [],
  initialMealsDay4 = [],
  initialMealsDay5 = [],
  initialMealsDay6 = [],
  initialMealsDay7 = [],
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("general");
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const weekDays: WeekDay[] = [
    'شنبه', 
    'یکشنبه', 
    'دوشنبه', 
    'سه شنبه', 
    'چهارشنبه', 
    'پنج شنبه', 
    'جمعه'
  ];

  // بارگذاری وعده‌های غذایی اولیه بر اساس تب انتخاب شده
  useEffect(() => {
    if (!open) return; // فقط زمانی که دیالوگ باز است اجرا شود
    
    if (selectedTab === "general") {
      setSelectedMeals([...initialMeals]);
    } else {
      const dayNumber = parseInt(selectedTab.replace("day", ""));
      switch(dayNumber) {
        case 1:
          setSelectedMeals([...initialMealsDay1]);
          break;
        case 2:
          setSelectedMeals([...initialMealsDay2]);
          break;
        case 3:
          setSelectedMeals([...initialMealsDay3]);
          break;
        case 4:
          setSelectedMeals([...initialMealsDay4]);
          break;
        case 5:
          setSelectedMeals([...initialMealsDay5]);
          break;
        case 6:
          setSelectedMeals([...initialMealsDay6]);
          break;
        case 7:
          setSelectedMeals([...initialMealsDay7]);
          break;
        default:
          setSelectedMeals([]);
      }
    }
  }, [
    open,
    selectedTab
    // حذف dependency های array برای جلوگیری از infinite loop
  ]);

  // فیلتر وعده‌های غذایی بر اساس جستجو
  const filteredMeals = meals.filter(meal => {
    const matchesSearch = 
      !searchQuery || 
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (meal.description && meal.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
    return matchesSearch;
  });

  // تغییر وضعیت انتخاب یک وعده غذایی
  const toggleMealSelection = (mealId: number) => {
    setSelectedMeals(prevSelected => {
      if (prevSelected.includes(mealId)) {
        return prevSelected.filter(id => id !== mealId);
      } else {
        return [...prevSelected, mealId];
      }
    });
  };

  // ذخیره برنامه غذایی
  const handleSave = () => {
    setIsSaving(true);
    
    try {
      let dayNumber: number | undefined;
      if (selectedTab !== "general") {
        dayNumber = parseInt(selectedTab.replace("day", ""));
      }
      
      const success = onSave(selectedMeals, dayNumber);
      
      if (success) {
        onOpenChange(false);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0" dir="rtl" aria-describedby="student-diet-dialog-description">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl">
            برنامه غذایی - {studentName}
          </DialogTitle>
          <VisuallyHidden>
            <DialogDescription id="student-diet-dialog-description">
              انتخاب و تنظیم برنامه غذایی برای {studentName}
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        
        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-8 mb-4">
              <TabsTrigger value="general">کلی</TabsTrigger>
              <TabsTrigger value="day1">روز ۱</TabsTrigger>
              <TabsTrigger value="day2">روز ۲</TabsTrigger>
              <TabsTrigger value="day3">روز ۳</TabsTrigger>
              <TabsTrigger value="day4">روز ۴</TabsTrigger>
              <TabsTrigger value="day5">روز ۵</TabsTrigger>
              <TabsTrigger value="day6">روز ۶</TabsTrigger>
              <TabsTrigger value="day7">روز ۷</TabsTrigger>
            </TabsList>
            
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="جستجو در وعده‌های غذایی..."
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <ScrollArea className="h-[400px] border rounded-md p-4">
                {filteredMeals.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    هیچ وعده غذایی یافت نشد
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMeals.map((meal) => (
                      <div
                        key={meal.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedMeals.includes(meal.id)
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => toggleMealSelection(meal.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{meal.name}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              {meal.type} - {meal.day || "همه روزها"}
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              selectedMeals.includes(meal.id)
                                ? "bg-primary border-primary"
                                : "border-muted-foreground"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </Tabs>
        </div>
        
        <DialogFooter className="px-6 py-4 border-t">
          <div className="w-full flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedMeals.length} وعده غذایی انتخاب شده
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                انصراف
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                ذخیره برنامه غذایی
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDietDialog;
