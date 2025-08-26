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

interface TrainingLevelFieldProps {
  form: UseFormReturn<StudentFormValues>;
  itemVariants: any;
}

export const TrainingLevelField = ({ form, itemVariants }: TrainingLevelFieldProps) => {
  const trainingLevels = [
    { value: "beginner", label: "مبتدی" },
    { value: "intermediate", label: "متوسط" },
    { value: "advanced", label: "پیشرفته" },
  ];

  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <FormField
        control={form.control}
        name="grade"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
              سطح تمرینی
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger 
                  className="w-full border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                  data-testid="select-training-level"
                >
                  <SelectValue placeholder="سطح تمرینی را انتخاب کنید" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {trainingLevels.map((level) => (
                  <SelectItem 
                    key={level.value} 
                    value={level.value}
                    data-testid={`option-training-level-${level.value}`}
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