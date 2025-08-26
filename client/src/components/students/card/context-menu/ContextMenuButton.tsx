
import React from "react";

interface ContextMenuButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "blue" | "emerald" | "green" | "orange" | "red" | "slate";
}

export const ContextMenuButton: React.FC<ContextMenuButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = "blue"
}) => {
  const getVariantClasses = () => {
    const baseClasses = "group hover:bg-opacity-90 dark:hover:bg-opacity-30";
    
    switch (variant) {
      case "emerald":
        return `${baseClasses} hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-700 dark:hover:text-brand-300`;
      case "blue":
        return `${baseClasses} hover:bg-info-50 dark:hover:bg-info-900/20 hover:text-info-700 dark:hover:text-info-300`;
      case "green":
        return `${baseClasses} hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-700 dark:hover:text-brand-300`;
      case "orange":
        return `${baseClasses} hover:bg-warning-50 dark:hover:bg-warning-900/20 hover:text-warning-700 dark:hover:text-warning-300`;
      case "red":
        return `${baseClasses} hover:bg-destructive-50 dark:hover:bg-destructive-900/20 hover:text-destructive-700 dark:hover:text-destructive-300`;
      case "slate":
        return `${baseClasses} hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200`;
      default:
        return `${baseClasses} hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200`;
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "emerald": return "text-brand-500 dark:text-brand-400";
      case "blue": return "text-info-500 dark:text-info-400";
      case "green": return "text-brand-500 dark:text-brand-400";
      case "orange": return "text-warning-500 dark:text-warning-400";
      case "red": return "text-destructive-500 dark:text-destructive-400";
      case "slate": return "text-slate-500 dark:text-slate-400";
      default: return "text-slate-500 dark:text-slate-400";
    }
  };

  return (
    <button
      className={`w-full flex items-start gap-3 px-2.5 py-2 rounded-lg text-left text-sm transition-all duration-200 ${getVariantClasses()} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span className={`mt-0.5 ${getIconClasses()}`}>
        {React.Children.toArray(children)[0]}
      </span>
      <div className="flex flex-col">
        {React.Children.toArray(children)[1]}
      </div>
    </button>
  );
};

export default ContextMenuButton;
