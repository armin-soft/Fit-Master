
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Grid, List, ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ExerciseViewControlsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

const ExerciseViewControls: React.FC<ExerciseViewControlsProps> = ({
  viewMode,
  setViewMode,
  toggleSortOrder,
  sortOrder,
}) => {
  // Animated variants for the controls
  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  return (
    <TooltipProvider>
      <motion.div 
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl p-1.5 border border-white/10 dark:border-slate-700/30 shadow-lg"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        <div className="flex items-center gap-2">
          <motion.div variants={itemVariants} className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-9 w-9 rounded-lg transition-all duration-300",
                      sortOrder === "asc" 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted/80"
                    )}
                    onClick={toggleSortOrder}
                  >
                    <ArrowUp 
                      className={cn(
                        "h-4 w-4 transition-all duration-300",
                        sortOrder === "asc" ? "opacity-100" : "opacity-0 absolute"
                      )} 
                    />
                    <ArrowDown 
                      className={cn(
                        "h-4 w-4 transition-all duration-300",
                        sortOrder === "desc" ? "opacity-100" : "opacity-0 absolute"
                      )} 
                    />
                  </Button>
                  
                  {sortOrder === "asc" && (
                    <motion.div 
                      layoutId="sortIndicator"
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>مرتب‌سازی {sortOrder === "asc" ? "صعودی" : "نزولی"}</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
          
          <span className="w-px h-6 bg-muted/50 mx-1"></span>
          
          <motion.div variants={itemVariants} className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-lg transition-all duration-300",
                    viewMode === "grid" 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted/80"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>نمایش شبکه‌ای</p>
              </TooltipContent>
            </Tooltip>
            
            {viewMode === "grid" && (
              <motion.div 
                layoutId="viewModeIndicator"
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              />
            )}
          </motion.div>
          
          <motion.div variants={itemVariants} className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-lg transition-all duration-300",
                    viewMode === "list" 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted/80"
                  )}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>نمایش لیستی</p>
              </TooltipContent>
            </Tooltip>
            
            {viewMode === "list" && (
              <motion.div 
                layoutId="viewModeIndicator"
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export default ExerciseViewControls;
