import React from "react";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentFormValues } from "@/lib/validations/student";

interface GoalTypeFieldProps {
  form: UseFormReturn<StudentFormValues>;
  itemVariants: any;
}

export const GoalTypeField = ({ form, itemVariants }: GoalTypeFieldProps) => {
  const goalTypes = [
    { value: "تناسب اندام", label: "تناسب اندام" },
    { value: "کاهش وزن", label: "کاهش وزن" },
    { value: "افزایش حجم عضلات", label: "افزایش حجم عضلات" },
    { value: "افزایش قدرت", label: "افزایش قدرت" },
    { value: "افزایش استقامت", label: "افزایش استقامت" },
  ];

  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <FormField
        control={form.control}
        name="goalType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              هدف تمرینی
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger 
                  className="w-full border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                  data-testid="select-goal-type"
                >
                  <SelectValue placeholder="هدف تمرینی را انتخاب کنید" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {goalTypes.map((goal) => (
                  <SelectItem 
                    key={goal.value} 
                    value={goal.value}
                    data-testid={`option-goal-type-${goal.value}`}
                  >
                    {goal.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};