
import React from "react";
import { motion } from "framer-motion";
import { TrainerProfile } from "@/types/trainer";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProfileProgressProps {
  profile: TrainerProfile;
}

export const ProfileProgress: React.FC<ProfileProgressProps> = ({ profile }) => {
  const calculateCompletionPercentage = () => {
    const requiredFields: (keyof TrainerProfile)[] = ['name', 'phone', 'gymName', 'gymAddress', 'bio', 'gymDescription'];
    const optionalFields: (keyof TrainerProfile)[] = ['instagram', 'website'];
    
    const completedRequired = requiredFields.filter(field => profile[field] && profile[field].trim() !== '').length;
    const completedOptional = optionalFields.filter(field => profile[field] && profile[field].trim() !== '').length;
    
    const requiredScore = (completedRequired / requiredFields.length) * 80; // 80% for required fields
    const optionalScore = (completedOptional / optionalFields.length) * 20; // 20% for optional fields
    
    return Math.round(requiredScore + optionalScore);
  };

  const percentage = calculateCompletionPercentage();
  
  const getProgressColor = () => {
    if (percentage >= 80) return "from-emerald-500 to-emerald-600";
    if (percentage >= 60) return "from-sky-500 to-sky-600";
    if (percentage >= 40) return "from-primary to-primary/90";
    return "from-destructive to-destructive/90";
  };

  const getProgressMessage = () => {
    if (percentage >= 90) return "پروفایل شما کامل است!";
    if (percentage >= 70) return "پروفایل شما تقریباً کامل است";
    if (percentage >= 50) return "در حال تکمیل پروفایل...";
    return "لطفاً اطلاعات اساسی را تکمیل کنید";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-800 dark:to-emerald-900/30 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            تکمیل پروفایل
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {getProgressMessage()}
          </p>
        </div>
        <div className={`text-2xl font-bold bg-gradient-to-r ${getProgressColor()} bg-clip-text text-transparent`}>
          {toPersianNumbers(percentage)}%
        </div>
      </div>

      {/* نوار پیشرفت */}
      <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* تأثیر درخشش */}
        <motion.div
          className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: [-32, percentage * 3] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      </div>

      {/* توضیحات */}
      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        اطلاعات اجباری: نام، تلفن، نام باشگاه، آدرس باشگاه
      </div>
    </motion.div>
  );
};
