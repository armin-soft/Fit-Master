
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModernFormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  error?: string;
  isValid?: boolean;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  rows?: number;
}

export const ModernFormField: React.FC<ModernFormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  isValid,
  required,
  type = "text",
  textarea = false,
  rows = 3
}) => {
  const hasValue = value && value.length > 0;
  const showValidation = hasValue && (isValid || error);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      
      <div className="relative">
        {/* آیکون */}
        {Icon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
            <Icon className={cn(
              "w-5 h-5 transition-colors duration-200",
              error ? "text-destructive" : isValid ? "text-brand-500" : "text-slate-400"
            )} />
          </div>
        )}

        {/* فیلد ورودی */}
        {textarea ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            required={required}
            className={cn(
              "w-full rounded-2xl border-2 transition-all duration-300 resize-none",
              Icon ? "pr-12" : "pr-4",
              "pl-12 py-4 text-base bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "focus:outline-none focus:ring-0",
              error 
                ? "border-destructive/30 focus:border-destructive bg-destructive/5 dark:bg-destructive/10" 
                : isValid 
                  ? "border-brand-300 focus:border-brand-500 bg-brand-50/50 dark:bg-brand-900/10"
                  : "border-slate-200 dark:border-slate-600 focus:border-brand-400 hover:border-slate-300 dark:hover:border-slate-500"
            )}
          />
        ) : (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={cn(
              "w-full h-14 rounded-2xl border-2 transition-all duration-300",
              Icon ? "pr-12" : "pr-4",
              "pl-12 text-base bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm",
              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
              "focus:outline-none focus:ring-0",
              error 
                ? "border-destructive/30 focus:border-destructive bg-destructive/5 dark:bg-destructive/10" 
                : isValid 
                  ? "border-brand-300 focus:border-brand-500 bg-brand-50/50 dark:bg-brand-900/10"
                  : "border-slate-200 dark:border-slate-600 focus:border-brand-400 hover:border-slate-300 dark:hover:border-slate-500"
            )}
          />
        )}

        {/* آیکون وضعیت */}
        {showValidation && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
          >
            {error ? (
              <AlertCircle className="w-5 h-5 text-destructive" />
            ) : isValid ? (
              <CheckCircle className="w-5 h-5 text-brand-500" />
            ) : null}
          </motion.div>
        )}
      </div>

      {/* پیام خطا */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive dark:text-destructive flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
