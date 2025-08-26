
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Settings, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const ProfileCompletionAlert = () => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Alert variant="default" className="bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800">
        <Settings className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-300 font-medium">تکمیل پروفایل ضروری است</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400">
          برای دسترسی به تمام امکانات، لطفا پروفایل خود را تکمیل کنید.
          <Button 
            variant="link" 
            className="px-0 text-amber-900 dark:text-amber-300 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all duration-300 ms-2"
            onClick={navigateToProfile}
          >
            <span>تکمیل پروفایل</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};
