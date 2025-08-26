import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  direction?: "ltr" | "rtl";
  numberOnly?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  validationMessage?: string;
}

export function StudentFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon: Icon,
  direction = "rtl",
  numberOnly = false,
  className,
  onChange,
  validationMessage
}: StudentFormFieldProps<T>) {
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-3", className)}>
          <FormLabel className="flex items-center gap-3 text-base font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-emerald-100 to-sky-100 dark:from-emerald-900/30 dark:to-sky-900/30">
              <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative group">
              <Input
                {...field}
                placeholder={placeholder}
                dir={direction}
                className={cn(
                  "w-full px-4 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-slate-200/60 dark:border-slate-700/60 rounded-2xl text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-400",
                  direction === "ltr" && "text-left font-mono"
                )}
                onChange={(e) => {
                  let value = e.target.value;
                  if (numberOnly) {
                    // Convert Persian numbers to English and allow only digits
                    value = value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    if (name === "phone") {
                      // For phone numbers, keep only digits
                      value = value.replace(/\D/g, '');
                    } else {
                      // For other number fields (age, height, weight), allow only digits
                      value = value.replace(/\D/g, '');
                    }
                  }
                  field.onChange(value);
                  // Call custom onChange if provided (for phone validation)
                  if (onChange) {
                    onChange(value);
                  }
                }}
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </FormControl>
          <FormMessage className="text-sm" />
          {validationMessage && (
            <div className={cn(
              "text-sm mt-1 px-3 py-2 rounded-lg",
              validationMessage.includes('قابل استفاده') 
                ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/20"
                : validationMessage.includes('در حال بررسی')
                ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                : "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20"
            )}>
              {validationMessage}
            </div>
          )}
        </FormItem>
      )}
    />
  );
}
