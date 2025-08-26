import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coffee, Sun, Sunset, Moon, ChefHat, Utensils } from "lucide-react";
import { WEEK_DAYS } from "../utils";
import { MealFormData } from "./MealFormData";

interface MealFormFieldsProps {
  formData: MealFormData;
  onFormDataChange: (data: MealFormData) => void;
}

const MEAL_TYPES = [
  { id: 'صبحانه', name: 'صبحانه', icon: Coffee, gradient: 'from-amber-400 to-orange-500' },
  { id: 'میان وعده صبح', name: 'میان وعده صبح', icon: Sun, gradient: 'from-yellow-400 to-amber-500' },
  { id: 'ناهار', name: 'ناهار', icon: Utensils, gradient: 'from-emerald-400 to-green-500' },
  { id: 'میان وعده عصر', name: 'میان وعده عصر', icon: Sunset, gradient: 'from-pink-400 to-rose-500' },
  { id: 'شام', name: 'شام', icon: ChefHat, gradient: 'from-blue-400 to-indigo-500' },
  { id: 'میان وعده شام', name: 'میان وعده شام', icon: Moon, gradient: 'from-violet-400 to-purple-500' }
];

export const MealFormFields: React.FC<MealFormFieldsProps> = ({
  formData,
  onFormDataChange
}) => {
  const selectedMealType = MEAL_TYPES.find(type => type.id === formData.type);
  const IconComponent = selectedMealType?.icon || Utensils;

  return (
    <div className="max-h-[70vh] overflow-y-auto space-y-4">
      <Card className="border-emerald-200 dark:border-emerald-800 shadow-lg">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-emerald-800 dark:text-emerald-200 mb-3 sm:mb-4 flex items-center gap-2">
            <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
            اطلاعات وعده غذایی
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="name" className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                نام وعده غذایی
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
                placeholder="مثال: املت با نان سبوس‌دار"
                className="mt-1 sm:mt-2 h-8 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base border-emerald-200 dark:border-emerald-800 focus:border-emerald-500"
                dir="rtl"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type" className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                  نوع وعده غذایی
                </Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => onFormDataChange({ ...formData, type: value })}
                  required
                >
                  <SelectTrigger className="mt-1 sm:mt-2 h-8 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base border-emerald-200 dark:border-emerald-800 focus:border-emerald-500" dir="rtl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {MEAL_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="day" className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300">
                  روز هفته
                </Label>
                <Select 
                  value={formData.day} 
                  onValueChange={(value) => onFormDataChange({ ...formData, day: value })}
                  required
                >
                  <SelectTrigger className="mt-1 sm:mt-2 h-8 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base border-emerald-200 dark:border-emerald-800 focus:border-emerald-500" dir="rtl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {WEEK_DAYS.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};