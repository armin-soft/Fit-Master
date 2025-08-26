
import React from "react";
import { Calendar } from "lucide-react";

export const EmptyActivityState = () => {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center">
        <Calendar className="w-10 h-10 text-slate-400" />
      </div>
      <h4 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
        هنوز فعالیتی ثبت نشده
      </h4>
      <p className="text-slate-500 dark:text-slate-500 max-w-md mx-auto">
        پس از شروع کار با سیستم و افزودن شاگردان، فعالیت‌ها در اینجا نمایش داده خواهند شد
      </p>
    </div>
  );
};
