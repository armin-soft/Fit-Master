import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  options: { value: string; label: string }[];
  itemVariants?: any;
}

export const SelectField = ({
  control,
  name,
  label,
  placeholder,
  icon: Icon,
  options,
  itemVariants,
}: SelectFieldProps) => {
  return (
    <motion.div variants={itemVariants}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white mb-3">
              <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              {label}
            </FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                data-testid={`select-${name}`}
              >
                <SelectTrigger className="w-full h-14 px-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="text-red-500 dark:text-red-400 mt-2" />
          </FormItem>
        )}
      />
    </motion.div>
  );
};