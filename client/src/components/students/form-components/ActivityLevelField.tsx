import React from "react";
import { motion } from "framer-motion";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { StudentFormValues } from "@/lib/validations/student";

interface ActivityLevelFieldProps {
  form: UseFormReturn<StudentFormValues>;
  itemVariants: any;
}

export const ActivityLevelField = ({ form, itemVariants }: ActivityLevelFieldProps) => {
  const activityLevels = [
    { value: "کم", label: "کم" },
    { value: "متوسط", label: "متوسط" },
    { value: "زیاد", label: "زیاد" },
  ];

  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <FormField
        control={form.control}
        name="activityLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              سطح فعالیت
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger 
                  className="w-full border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                  data-testid="select-activity-level"
                >
                  <SelectValue placeholder="سطح فعالیت را انتخاب کنید" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {activityLevels.map((level) => (
                  <SelectItem 
                    key={level.value} 
                    value={level.value}
                    data-testid={`option-activity-level-${level.value}`}
                  >
                    {level.label}
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