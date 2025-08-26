
import React from "react";
import { motion } from "framer-motion";
import { User, Building, Globe, CheckCircle } from "lucide-react";

interface Tab {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
}

const tabs: Tab[] = [
  {
    id: "personal",
    title: "اطلاعات شخصی",
    icon: User,
    description: "نام، تلفن و بیوگرافی"
  },
  {
    id: "gym",
    title: "اطلاعات تکمیلی",
    icon: Building,
    description: "محل فعالیت و توضیحات اختیاری"
  },
  {
    id: "social",
    title: "شبکه‌های اجتماعی",
    icon: Globe,
    description: "اینستاگرام و وبسایت"
  }
];

interface ProfileSidebarTabsProps {
  activeSection: string;
  onTabChange: (section: string) => void;
}

export const ProfileSidebarTabs: React.FC<ProfileSidebarTabsProps> = ({
  activeSection,
  onTabChange
}) => {
  return (
    <div className="space-y-3">
      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        بخش‌های پروفایل
      </h4>
      
      {tabs.map((tab, index) => {
        const isActive = activeSection === tab.id;
        const Icon = tab.icon;
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full text-right p-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
              isActive 
                ? 'bg-gradient-to-r from-brand-500 to-info-600 text-white shadow-xl' 
                : 'bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/80 hover:shadow-lg'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* تأثیر درخشش پس‌زمینه */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            )}
            
            <div className="relative z-10 flex items-center gap-4">
              <div className={`p-2 rounded-xl ${
                isActive 
                  ? 'bg-white/20' 
                  : 'bg-brand-100 dark:bg-brand-900/30'
              }`}>
                <Icon className={`w-5 h-5 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-brand-600 dark:text-brand-400'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-semibold">{tab.title}</h5>
                  {isActive && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <p className={`text-sm ${
                  isActive 
                    ? 'text-white/80' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
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
