
import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, Ruler, Weight, Calendar, Trophy, Users, Target, Activity, Heart, UserCheck, MessageSquare, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { StudentFormValues } from "@/lib/validations/student";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { usePhoneValidation } from "@/hooks/students/usePhoneValidation";
import { cn } from "@/lib/utils";

interface StudentPersonalInfoProps {
  form: UseFormReturn<StudentFormValues>;
  student?: { id: number; phone: string; [key: string]: any };
}

export const StudentPersonalInfo: React.FC<StudentPersonalInfoProps> = ({ form, student }) => {
  const { validatePhone, checkPhoneAvailability, isChecking } = usePhoneValidation();
  const [phoneValidationMessage, setPhoneValidationMessage] = useState<string>('');
  const [phoneValidationState, setPhoneValidationState] = useState<'neutral' | 'valid' | 'invalid' | 'checking'>('neutral');

  // Update validation state when checking completes
  useEffect(() => {
    if (!isChecking && phoneValidationState === 'checking') {
      const currentPhone = form.getValues('phone');
      const validation = validatePhone(currentPhone, student?.id);
      setPhoneValidationMessage(validation.message || '');
      setPhoneValidationState(validation.isValid ? 'valid' : 'invalid');
    }
  }, [isChecking, phoneValidationState, form, validatePhone, student?.id]);
  return (
    <div className="w-full space-y-4 sm:space-y-5">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-500" />
              نام و نام خانوادگی
            </FormLabel>
            <FormControl>
              <Input 
                className="bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-emerald-500" 
                placeholder="نام و نام خانوادگی شاگرد" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-500" />
              شماره تماس
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  dir="ltr" 
                  className={cn(
                    "text-left bg-slate-50 dark:bg-slate-800/70 pl-10",
                    phoneValidationState === 'valid' && "focus-visible:ring-green-500 border-green-500",
                    phoneValidationState === 'invalid' && "focus-visible:ring-red-500 border-red-500",
                    phoneValidationState === 'checking' && "focus-visible:ring-blue-500 border-blue-500",
                    phoneValidationState === 'neutral' && "focus-visible:ring-emerald-500"
                  )}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                  value={toPersianNumbers(field.value)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    field.onChange(value);
                    
                    // Real-time validation
                    if (value.length >= 11) {
                      const validation = validatePhone(value, student?.id);
                      if (validation.isValid && !validation.isDuplicate) {
                        setPhoneValidationState('checking');
                        checkPhoneAvailability(value);
                      } else {
                        setPhoneValidationMessage(validation.message || '');
                        setPhoneValidationState('invalid');
                      }
                    } else if (value.length > 0) {
                      const validation = validatePhone(value, student?.id);
                      setPhoneValidationMessage(validation.message || '');
                      setPhoneValidationState(validation.isValid ? 'valid' : 'invalid');
                    } else {
                      setPhoneValidationState('neutral');
                      setPhoneValidationMessage('');
                    }
                  }}
                />
                
                {/* Validation Icon */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  {phoneValidationState === 'checking' && (
                    <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                  )}
                  {phoneValidationState === 'valid' && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {phoneValidationState === 'invalid' && (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </FormControl>
            
            {/* Custom validation message */}
            {phoneValidationMessage && (
              <p className={cn(
                "text-sm mt-1",
                phoneValidationState === 'valid' && "text-green-600 dark:text-green-400",
                phoneValidationState === 'invalid' && "text-red-600 dark:text-red-400",
                phoneValidationState === 'checking' && "text-blue-600 dark:text-blue-400"
              )}>
                {phoneValidationMessage}
              </p>
            )}
            
            <FormMessage />
          </FormItem>
        )}
      />
      

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-emerald-500" />
                قد (سانتی‌متر)
              </FormLabel>
              <FormControl>
                <Input 
                  dir="ltr" 
                  className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-emerald-500" 
                  placeholder="۱۷۵" 
                  value={toPersianNumbers(field.value?.toString() || '')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    const numValue = parseInt(value) || 0;
                    field.onChange(numValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Weight className="h-4 w-4 text-emerald-500" />
                وزن (کیلوگرم)
              </FormLabel>
              <FormControl>
                <Input 
                  dir="ltr" 
                  className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-emerald-500" 
                  placeholder="۸۰" 
                  value={toPersianNumbers(field.value?.toString() || '')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    const numValue = parseInt(value) || 0;
                    field.onChange(numValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-500" />
                سن
              </FormLabel>
              <FormControl>
                <Input 
                  dir="ltr" 
                  className="text-left bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-emerald-500" 
                  placeholder="۲۵" 
                  value={toPersianNumbers(field.value?.toString() || '')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
                    const numValue = parseInt(value) || undefined;
                    field.onChange(numValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="activityLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" />
                سطح فعالیت
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-emerald-500">
                    <SelectValue placeholder="سطح فعالیت را انتخاب کنید" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="کم">کم</SelectItem>
                  <SelectItem value="متوسط">متوسط</SelectItem>
                  <SelectItem value="زیاد">زیاد</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>



      {/* Goal Type */}
      <FormField
        control={form.control}
        name="goalType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-500" />
              هدف تمرینی
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-emerald-500">
                  <SelectValue placeholder="هدف تمرینی را انتخاب کنید" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="کاهش وزن">کاهش وزن</SelectItem>
                <SelectItem value="افزایش حجم عضلات">افزایش حجم عضلات</SelectItem>
                <SelectItem value="تناسب اندام">تناسب اندام</SelectItem>
                <SelectItem value="افزایش قدرت">افزایش قدرت</SelectItem>
                <SelectItem value="افزایش استقامت">افزایش استقامت</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Medical Conditions */}
      <FormField
        control={form.control}
        name="medicalConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-emerald-500" />
              شرایط پزشکی
            </FormLabel>
            <FormControl>
              <Textarea 
                className="bg-slate-50 dark:bg-slate-800/70 focus-visible:ring-emerald-500 min-h-[80px]" 
                placeholder="بیماری‌ها، آلرژی‌ها، محدودیت‌ها و ... (در صورت نداشتن 'ندارد' بنویسید)" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  );
};
