
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface EmptyStateProps {
  onAdd: () => void;
}

export const EmptyState = ({ onAdd }: EmptyStateProps) => {
  const deviceInfo = useDeviceInfo();
  
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

  // Adjust sizes based on device type
  const getIconSize = () => {
    if (deviceInfo.isMobile) return "h-8 w-8";
    if (deviceInfo.isTablet) return "h-9 w-9";
    return "h-10 w-10";
  };

  const getContainerSize = () => {
    if (deviceInfo.isMobile) return "w-16 h-16";
    if (deviceInfo.isTablet) return "w-18 h-18";
    return "w-20 h-20";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center rounded-xl md:rounded-2xl border-2 border-dashed border-muted bg-muted/30 w-full px-4"
    >
      <motion.div 
        variants={itemVariants}
        className="relative mb-3 md:mb-4"
      >
        <div className="absolute inset-0 bg-brand-500/10 rounded-full blur-3xl opacity-30"></div>
        <div className={`${getContainerSize()} rounded-full bg-brand-500/10 flex items-center justify-center relative`}>
          <Users className={`${getIconSize()} text-brand-600`} />
        </div>
      </motion.div>
      
      <motion.h3 variants={itemVariants} className="text-lg md:text-xl font-bold text-foreground mb-1.5 md:mb-2">
        هنوز هیچ شاگردی اضافه نکرده‌اید
      </motion.h3>
      
      <motion.p variants={itemVariants} className="text-sm text-muted-foreground max-w-md mb-4 md:mb-6 px-2">
        برای شروع مدیریت شاگردان باشگاه، اولین شاگرد خود را اضافه کنید.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <Button 
          onClick={onAdd}
          size={deviceInfo.isMobile ? "default" : "lg"}
          className="gap-2 bg-gradient-to-r from-brand-600 to-info-600 hover:from-brand-700 hover:to-info-700 text-white shadow-md shadow-brand-500/20 relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-700 to-info-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <UserPlus className="h-4 w-4 md:h-5 md:w-5 relative z-10" />
          <span className="relative z-10 text-sm md:text-base">افزودن شاگرد جدید</span>
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        </Button>
      </motion.div>
    </motion.div>
  );
};
