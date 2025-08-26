
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { UtensilsCrossed } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Meal, MealType, WeekDay } from "@/types/meal";
import StudentMealListWrapper from "./StudentMealListWrapper";
import StudentMealHeader from "./StudentMealHeader";
import StudentMealSearch from "./StudentMealSearch";
import StudentMealFilters from "./StudentMealFilters";
import StudentMealFooter from "./StudentMealFooter";
import StudentMealGroupedList from "./StudentMealGroupedList";
import { useMealSorting, mealTypeOrder, dayOrder } from "./useMealSorting";

interface StudentMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[]) => boolean;
  initialMeals: number[];
}

const StudentMealDialog: React.FC<StudentMealDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialMeals = [],
}) => {
  const [selectedMeals, setSelectedMeals] = useState<number[]>(initialMeals);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDay, setActiveDay] = useState<WeekDay | "all">("all");
  const [activeMealType, setActiveMealType] = useState<MealType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedType, setSelectedType] = useState<MealType | null>(null);

  // Get meals data from localStorage if not provided as a prop
  const [mealsData, setMealsData] = useState<Meal[]>([]);
  
  // Load meals from database on component mount
  React.useEffect(() => {
    const loadMeals = async () => {
      try {
        // Use API endpoint directly
        const response = await fetch('/api/preferences/meals');
        const result = await response.json();
        const savedMeals = result && result.value ? JSON.parse(result.value) : [];
        if (Array.isArray(savedMeals)) {
          setMealsData(savedMeals);
        }
      } catch (error) {
        console.error("Error loading meals:", error);
      }
    };
    loadMeals();
  }, []);

  // Reset selectedMeals when dialog is opened to ensure it has the latest initialMeals
  React.useEffect(() => {
    if (open) {
      setSelectedMeals(initialMeals);
      console.log("Dialog opened with initial meals:", initialMeals);
    }
  }, [open, initialMeals]);

  const days = Array.from(new Set(mealsData.map(meal => meal.day))) as WeekDay[];
  const mealTypes = Array.from(new Set(mealsData.map(meal => meal.type))) as MealType[];

  const sortedMealTypes = [...mealTypes].sort((a, b) => 
    (mealTypeOrder[a] || 99) - (mealTypeOrder[b] || 99)
  );
  
  // Sort days in Persian order (Saturday to Friday)
  const sortedDays = [...days].sort((a, b) => 
    (dayOrder[a] || 99) - (dayOrder[b] || 99)
  );

  // Update activeMealType when selectedType changes
  React.useEffect(() => {
    if (selectedType) {
      setActiveMealType(selectedType);
    } else {
      setActiveMealType("all");
    }
  }, [selectedType]);

  const filteredMeals = useMealSorting({
    meals: mealsData,
    searchQuery,
    activeDay,
    activeMealType,
    sortOrder
  });

  const toggleMeal = (id: number) => {
    setSelectedMeals(prev => 
      prev.includes(id) 
        ? prev.filter(mealId => mealId !== id) 
        : [...prev, id]
    );
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleSave = () => {
    console.log("Attempting to save meals:", selectedMeals);
    const success = onSave(selectedMeals);
    console.log("Save result:", success);
    if (success) {
      onOpenChange(false);
    }
    return success;
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col m-0 rounded-none">
        <DialogTitle className="sr-only">برنامه غذایی {studentName}</DialogTitle>
        <DialogDescription className="sr-only">
          انتخاب وعده‌های غذایی برای برنامه تغذیه {studentName}
        </DialogDescription>
        
        <StudentMealHeader studentName={studentName} />
        <StudentMealSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Collapsible open={showFilters} onOpenChange={setShowFilters} className="w-full">
          <CollapsibleContent className="flex-shrink-0 bg-muted/10 border-b">
            <StudentMealFilters 
              selectedType={selectedType}
              onSelectType={setSelectedType}
            />
          </CollapsibleContent>
        </Collapsible>

        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs 
            value={activeDay === "all" ? "all" : activeDay} 
            onValueChange={value => setActiveDay(value as WeekDay | "all")} 
            className="flex-1 flex flex-col overflow-hidden" 
            dir="rtl"
          >
            <div className="border-b bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm sticky top-0 z-10 shrink-0">
              <ScrollArea className="w-full">
                <TabsList className="h-14 w-full justify-center bg-transparent p-1 rounded-none shadow-sm">
                  <TabsTrigger 
                    value="all" 
                    className="h-12 rounded-lg border border-transparent px-6 py-3 font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:border-primary/20 transition-all duration-200"
                  >
                    همه روزها
                  </TabsTrigger>
                  {sortedDays.map(day => (
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
              value={activeDay === "all" ? "all" : activeDay.toString()} 
              className="flex-1 overflow-hidden m-0 p-0 outline-none data-[state=active]:h-full" 
              dir="rtl"
            >
              <StudentMealListWrapper 
                maxHeight="calc(100vh - 220px)" 
                toggleSortOrder={toggleSortOrder} 
                sortOrder={sortOrder} 
                showControls={true}
              >
                <StudentMealGroupedList 
                  filteredMeals={filteredMeals}
                  selectedMeals={selectedMeals}
                  toggleMeal={toggleMeal}
                  activeDay={activeDay}
                  activeMealType={activeMealType}
                  sortedDays={sortedDays}
                  sortedMealTypes={sortedMealTypes}
                  dayOrder={dayOrder}
                />
              </StudentMealListWrapper>
            </TabsContent>
          </Tabs>
        </div>

        <StudentMealFooter 
          selectedMeals={selectedMeals} 
          onSave={handleSave} 
          onClose={() => onOpenChange(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentMealDialog;
