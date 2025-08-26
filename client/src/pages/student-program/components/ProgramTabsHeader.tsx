
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Dumbbell, Utensils, Pill, Calendar } from "lucide-react";

interface ProgramTabsHeaderProps {
  // No props needed since this component manages its own state
}

const ProgramTabsHeader: React.FC<ProgramTabsHeaderProps> = () => {
  // Use context or pass activeTab as prop from parent component
  const activeTab = "exercise"; // Default tab
  const tabs = [
    {
      value: "exercise",
      label: "تمرینات",
      icon: Dumbbell,
      gradient: "from-sky-500 to-primary",
      bgGradient: "from-sky-50 to-primary/10",
      darkBgGradient: "from-sky-900/20 to-primary/20"
    },
    {
      value: "diet", 
      label: "رژیم غذایی",
      icon: Utensils,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-50",
      darkBgGradient: "from-emerald-900/20 to-emerald-900/20"
    },
    {
      value: "supplement",
      label: "مکمل و ویتامین",
      icon: Pill,
      gradient: "from-primary to-sky-600",
      bgGradient: "from-primary/10 to-sky-50",
      darkBgGradient: "from-primary/20 to-sky-900/20"
    }
  ];

  return (
    <div className="p-6" dir="rtl">
      <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-gray-100/80 to-gray-50/80 dark:from-gray-700/50 dark:to-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 h-auto p-2 rounded-2xl shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;
          
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative h-16 rounded-xl border-0 bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-current transition-all duration-300 group"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tab.bgGradient} dark:bg-gradient-to-r dark:${tab.darkBgGradient} shadow-lg border border-white/50 dark:border-gray-600/50`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-2 px-4">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-md` 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 group-hover:bg-gray-300 dark:group-hover:bg-gray-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <span className={`text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-gray-800 dark:text-gray-100' 
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                }`}>
                  {tab.label}
                </span>
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
};

export default ProgramTabsHeader;
