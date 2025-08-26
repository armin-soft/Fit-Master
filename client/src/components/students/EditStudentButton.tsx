
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

interface EditStudentButtonProps {
  studentId: number;
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onClick?: () => void;
}

export const EditStudentButton = ({
  studentId,
  variant = "ghost",
  size = "icon",
  className = "",
  onClick
}: EditStudentButtonProps) => {
  // Hover animation variants
  const buttonVariants = {
    rest: { 
      scale: 1,
      transition: { duration: 0.2, ease: "easeInOut" } 
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" } 
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeInOut" } 
    }
  };

  if (onClick) {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <Button
          variant={variant}
          size={size}
          className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-400/10 hover:to-info-500/10 hover:text-brand-700 border-brand-500/30 ${className}`}
          onClick={onClick}
        >
          <Edit className="h-4 w-4" />
          {size !== "icon" && (
            <span className="mr-2 text-sm font-medium">ویرایش</span>
          )}
        </Button>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      <Button
        asChild
        variant={variant}
        size={size}
        className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-400/10 hover:to-info-500/10 hover:text-brand-700 border-brand-500/30 ${className}`}
      >
        <Link to={`/students/add-edit/${studentId}`} className="flex items-center">
          <Edit className="h-4 w-4" />
          {size !== "icon" && (
            <span className="mr-2 text-sm font-medium">ویرایش</span>
          )}
        </Link>
      </Button>
    </motion.div>
  );
};
