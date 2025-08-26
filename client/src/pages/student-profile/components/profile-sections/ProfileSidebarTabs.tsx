
import React from "react";
import { motion } from "framer-motion";
import { User, Activity } from "lucide-react";

interface ProfileSidebarTabsProps {
  activeSection: string;
  onTabChange: (section: string) => void;
}

export const ProfileSidebarTabs: React.FC<ProfileSidebarTabsProps> = ({
  activeSection,
  onTabChange
}) => {
  const tabs = [
    {
      id: "personal",
      label: "اطلاعات شخصی",
      icon: User,
      description: "مشاهده اطلاعات پایه"
    },
    {
      id: "bmi",
      label: "شاخص توده بدنی",
      icon: Activity,
      description: "مشاهده BMI و تجزیه و تحلیل"
    }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
        بخش‌های پروفایل
      </h3>
      
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = activeSection === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              w-full p-4 rounded-xl text-right transition-all duration-300 group
              ${isActive 
                ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg' 
                : 'bg-white/50 hover:bg-white/70 text-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800/70 dark:text-slate-300'
              }
            `}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className={`
                p-2 rounded-lg transition-all duration-300
                ${isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200'
                }
              `}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 text-right">
                <h4 className="font-medium text-sm">{tab.label}</h4>
                <p className={`
                  text-xs mt-1 
                  ${isActive 
                    ? 'text-white/80' 
                    : 'text-slate-500 dark:text-slate-400'
                  }
                `}>
                  {tab.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
