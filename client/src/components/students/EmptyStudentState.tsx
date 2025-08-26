
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, X, Search } from "lucide-react";

interface EmptyStudentStateProps {
  isSearching: boolean;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

export const EmptyStudentState = ({ 
  isSearching, 
  onAddStudent, 
  onClearSearch 
}: EmptyStudentStateProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  if (isSearching) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="h-96 flex flex-col items-center justify-center text-center p-8 rounded-xl border-2 border-dashed border-muted bg-muted/30"
      >
        <motion.div 
          variants={itemVariants}
          className="relative mb-6 w-20 h-20"
        >
          <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl opacity-70"></div>
          <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center relative">
            <Search className="w-10 h-10 text-amber-500/60" />
          </div>
        </motion.div>
        
        <motion.h3 variants={itemVariants} className="text-xl font-bold text-foreground mb-2">
          نتیجه‌ای یافت نشد
        </motion.h3>
        
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-md mb-8">
          با عبارت جستجو شده هیچ شاگردی یافت نشد. لطفاً عبارت دیگری را امتحان کنید.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Button 
            onClick={onClearSearch}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <X className="h-4 w-4" />
            <span>پاک کردن جستجو</span>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-96 flex flex-col items-center justify-center text-center p-8 rounded-xl border-2 border-dashed border-muted bg-muted/30"
    >
      <motion.div 
        variants={itemVariants}
        className="relative mb-6 w-20 h-20"
      >
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center relative">
          <Users className="w-10 h-10 text-primary/40" />
        </div>
      </motion.div>
      
      <motion.h3 variants={itemVariants} className="text-xl font-bold text-foreground mb-2">
        هنوز هیچ شاگردی اضافه نکرده‌اید
      </motion.h3>
      
      <motion.p variants={itemVariants} className="text-muted-foreground max-w-md mb-8">
        برای شروع مدیریت شاگردان باشگاه، اولین شاگرد خود را اضافه کنید.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <Button 
          onClick={onAddStudent}
          size="lg"
          className="gap-2 bg-gradient-to-r from-brand-600 to-info-600 hover:from-brand-700 hover:to-info-700 text-white shadow-md shadow-primary/20 relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-700 to-info-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <UserPlus className="h-4 w-4 relative z-10" />
          <span className="relative z-10">افزودن شاگرد جدید</span>
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        </Button>
      </motion.div>
    </motion.div>
  );
};
