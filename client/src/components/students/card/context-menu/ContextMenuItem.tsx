
import React from 'react';
import { ContextMenuItem } from '@/components/ui/context-menu';
import { motion } from 'framer-motion';

interface ContextMenuItemWithAnimationProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  index: number;
  variant?: 'emerald' | 'blue' | 'green' | 'red' | 'orange' | 'sky';
}

export const ContextMenuItemWithAnimation: React.FC<ContextMenuItemWithAnimationProps> = ({
  icon,
  title,
  subtitle,
  onClick,
  index,
  variant = 'blue'
}) => {
  // Define variant colors
  const getVariantClasses = () => {
    switch (variant) {
      case 'emerald':
        return {
          icon: 'bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400',
          hover: 'hover:bg-brand-500/5 dark:hover:bg-brand-500/10',
          text: 'group-hover:text-brand-600 dark:group-hover:text-brand-400'
        };
      case 'blue':
        return {
          icon: 'bg-info-500/10 dark:bg-info-500/20 text-info-600 dark:text-info-400',
          hover: 'hover:bg-info-500/5 dark:hover:bg-info-500/10',
          text: 'group-hover:text-info-600 dark:group-hover:text-info-400'
        };
      case 'green':
        return {
          icon: 'bg-success-500/10 dark:bg-success-500/20 text-success-600 dark:text-success-400',
          hover: 'hover:bg-success-500/5 dark:hover:bg-success-500/10',
          text: 'group-hover:text-success-600 dark:group-hover:text-success-400'
        };
      case 'red':
        return {
          icon: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
          hover: 'hover:bg-red-50 dark:hover:bg-red-900/20',
          text: 'group-hover:text-red-600 dark:group-hover:text-red-400'
        };
      case 'orange':
        return {
          icon: 'bg-warning-500/10 dark:bg-warning-500/20 text-warning-600 dark:text-warning-400',
          hover: 'hover:bg-warning-500/5 dark:hover:bg-warning-500/10',
          text: 'group-hover:text-warning-600 dark:group-hover:text-warning-400'
        };
      case 'sky':
        return {
          icon: 'bg-info-500/10 dark:bg-info-500/20 text-info-600 dark:text-info-400',
          hover: 'hover:bg-info-500/5 dark:hover:bg-info-500/10',
          text: 'group-hover:text-info-600 dark:group-hover:text-info-400'
        };
      default:
        return {
          icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
          hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
          text: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
        };
    }
  };
  
  const { icon: iconClass, hover: hoverClass, text: textClass } = getVariantClasses();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { delay: index * 0.05, duration: 0.2 } 
      }}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
    >
      <ContextMenuItem 
        onClick={onClick}
        className={`flex items-center gap-3 p-2 cursor-pointer rounded-lg transition-all duration-200 group ${hoverClass}`}
      >
        <span className={`flex-shrink-0 p-1.5 rounded-md shadow-sm ${iconClass}`}>
          {icon}
        </span>
        <div>
          <div className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textClass}`}>
            {title}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </div>
        </div>
      </ContextMenuItem>
    </motion.div>
  );
};
