
import React from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

interface ProgressHeaderProps {
  selectedType: 'management' | 'student' | null;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({ selectedType }) => {
  const getTypeTitle = () => {
    return selectedType === 'management' ? 'پنل مدیریت' : 'پنل شاگرد';
  };

  const getTypeGradient = () => {
    return selectedType === 'management' 
      ? 'from-emerald-600 to-sky-600' 
      : 'from-sky-600 to-emerald-600';
  };

  return (
    <div className="text-center mb-12">
      <motion.div
        className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${getTypeGradient()} rounded-full flex items-center justify-center shadow-2xl`}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader className="w-10 h-10 text-white" />
      </motion.div>
      
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
        در حال ورود به {getTypeTitle()}
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-300">
        لطفاً کمی صبر کنید تا شما را هدایت کنیم
      </p>
    </div>
  );
};
