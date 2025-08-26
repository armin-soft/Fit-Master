
import React from "react";

interface CardContentProps {
  title: string;
  subtitle: string;
  description: string;
}

export const CardContent: React.FC<CardContentProps> = ({ title, subtitle, description }) => {
  return (
    <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      <p className="text-base sm:text-lg text-blue-600 dark:text-blue-400 font-semibold">
        {subtitle}
      </p>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
