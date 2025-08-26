
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface AddStudentButtonProps {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onClick?: () => void;
}

export const AddStudentButton = ({
  variant = "default",
  size = "default",
  className = "",
  onClick
}: AddStudentButtonProps) => {
  // If onClick is provided, use a regular button; otherwise, use Link
  if (onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button
          variant={variant}
          size={size}
          className={`gap-2 bg-gradient-to-r from-brand-500 to-info-500 hover:from-brand-600 hover:to-info-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-0 ${className}`}
          onClick={onClick}
        >
          <UserPlus className={size === "icon" ? "h-4 w-4" : "h-5 w-5 -mr-1"} />
          {size !== "icon" && "افزودن شاگرد جدید"}
        </Button>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Button
        asChild
        variant={variant}
        size={size}
        className={`gap-2 bg-gradient-to-r from-brand-500 to-info-500 hover:from-brand-600 hover:to-info-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-0 ${className}`}
      >
        <Link to="/students/add-edit">
          <UserPlus className={size === "icon" ? "h-4 w-4" : "h-5 w-5 -mr-1"} />
          {size !== "icon" && "افزودن شاگرد جدید"}
        </Link>
      </Button>
    </motion.div>
  );
};
