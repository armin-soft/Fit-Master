
import React from "react";
import { motion } from "framer-motion";
import { User, Phone, Calendar, Ruler, Weight, Users, Target, Activity, Heart } from "lucide-react";
import { StudentProfile } from "../../types/studentProfile";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PersonalInfoFormProps {
  profile: StudentProfile;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ profile }) => {
  const getGenderDisplay = (gender: string) => {
    return gender === 'male' ? 'مرد' : 'زن';
  };

  const getGoalTypeDisplay = (goalType?: string) => {
    return goalType || 'تناسب اندام';
  };

  const getActivityLevelDisplay = (activityLevel?: string) => {
    return activityLevel || 'متوسط';
  };

  const formFields = [
    {
      label: "نام و نام خانوادگی",
      value: profile.name,
      icon: User,
      placeholder: "نام کامل"
    },
    {
      label: "شماره موبایل",
      value: toPersianNumbers(profile.phone),
      icon: Phone,
      placeholder: "شماره موبایل"
    },
    {
      label: "سن",
      value: toPersianNumbers(profile.age),
      icon: Calendar,
      placeholder: "سن"
    },
    {
      label: "جنسیت",
      value: getGenderDisplay(profile.gender),
      icon: Users,
      placeholder: "جنسیت"
    },
    {
      label: "قد (سانتی‌متر)",
      value: toPersianNumbers(profile.height),
      icon: Ruler,
      placeholder: "قد"
    },
    {
      label: "وزن (کیلوگرم)",
      value: toPersianNumbers(profile.weight),
      icon: Weight,
      placeholder: "وزن"
    },
    {
      label: "هدف تمرینی",
      value: getGoalTypeDisplay(profile.goalType),
      icon: Target,
      placeholder: "هدف تمرینی"
    },
    {
      label: "سطح فعالیت",
      value: getActivityLevelDisplay(profile.activityLevel),
      icon: Activity,
      placeholder: "سطح فعالیت"
    },
    {
      label: "شرایط پزشکی",
      value: profile.medicalConditions || 'ندارد',
      icon: Heart,
      placeholder: "شرایط پزشکی"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          اطلاعات شخصی
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          اطلاعات شخصی شما (فقط قابل مشاهده)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formFields.map((field, index) => {
          const Icon = field.icon;
          
          return (
            <motion.div
              key={field.label}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Icon className="h-4 w-4 text-emerald-500" />
                {field.label}
              </label>
              
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Icon className="h-4 w-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                </div>
                
                <motion.input
                  type="text"
                  value={field.value}
                  readOnly
                  placeholder={field.placeholder}
                  className="w-full pr-10 pl-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-right cursor-not-allowed transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-emerald-500/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Card */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            راهنمای پروفایل
          </h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          اطلاعات نمایش داده شده در این بخش فقط قابل مشاهده است و امکان ویرایش آن وجود ندارد. 
          تنها تصویر پروفایل شما قابل تغییر می‌باشد. برای هرگونه تغییر در اطلاعات شخصی، 
          لطفاً با مربی خود تماس بگیرید.
        </p>
      </motion.div>
    </motion.div>
  );
};
