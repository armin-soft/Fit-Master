
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { CardBadge } from "./card/CardBadge";
import { CardIcon } from "./card/CardIcon";
import { CardContent } from "./card/CardContent";
import { CardFeatures } from "./card/CardFeatures";
import { CardButton } from "./card/CardButton";
import { CardFooter } from "./card/CardFooter";

interface UserType {
  id: 'management' | 'student';
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  badge: string;
}

interface ModernUserTypeCardProps {
  userType: UserType;
  index: number;
  onSelect: (type: 'management' | 'student') => void;
  isSelected: boolean;
  isProcessing: boolean;
}

export const ModernUserTypeCard: React.FC<ModernUserTypeCardProps> = ({
  userType,
  index,
  onSelect,
  isSelected,
  isProcessing
}) => {
  const isDisabled = isProcessing;

  const handleClick = () => {
    if (isDisabled) return;
    onSelect(userType.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }}
      whileHover={!isDisabled ? { y: -4, scale: 1.01 } : {}}
      className={`relative group ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={handleClick}
      dir="rtl"
    >
      {/* تأثیر درخشش پس‌زمینه */}
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-br ${userType.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
        animate={isSelected ? { opacity: 0.3 } : {}}
      />
      
      {/* کارت اصلی */}
      <div className={`relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 ${
        isSelected ? 'border-blue-500 shadow-2xl' : 'border-slate-200/50 dark:border-slate-700/50 shadow-xl'
      } rounded-3xl overflow-hidden transition-all duration-300 ${
        !isDisabled ? 'hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-2xl' : 'opacity-75'
      }`}>
        
        <CardBadge 
          badge={userType.badge} 
          gradient={userType.gradient} 
          isSelected={isSelected} 
        />
        
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
          <CardIcon 
            Icon={userType.icon} 
            gradient={userType.gradient} 
            isSelected={isSelected} 
          />
          
          <CardContent 
            title={userType.title}
            subtitle={userType.subtitle}
            description={userType.description}
          />
          
          <CardFeatures features={userType.features} />
          
          <CardButton 
            gradient={userType.gradient}
            isSelected={isSelected}
            isDisabled={isDisabled}
            onClick={handleClick}
          />
        </div>

        <CardFooter />
      </div>
    </motion.div>
  );
};
