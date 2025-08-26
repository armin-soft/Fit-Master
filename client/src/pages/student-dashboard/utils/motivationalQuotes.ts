
import { Target, LucideIcon } from "lucide-react";

export interface MotivationalQuote {
  text: string;
  icon: LucideIcon;
}

// Simple generic motivational message instead of random quotes
export const getMotivationalQuote = (): MotivationalQuote => {
  return {
    text: "برای رسیدن به اهدافتان تلاش کنید!",
    icon: Target
  };
};
