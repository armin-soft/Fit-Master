
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProfileWarningProps {
  isProfileComplete: boolean;
  className?: string;
}

export const ProfileWarning: React.FC<ProfileWarningProps> = ({ isProfileComplete, className }) => {
  if (isProfileComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(className)}
    >
      <Alert variant="default" className="backdrop-blur-md bg-amber-50/90 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="font-semibold">تکمیل پروفایل مربی</AlertTitle>
        <AlertDescription className="mt-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span>
              برای استفاده از تمام امکانات برنامه و چاپ با هدر و فوتر اختصاصی، پروفایل خود را تکمیل کنید.
            </span>
            <Button className="flex items-center gap-2" variant="default" size="sm" asChild>
              <Link to="/coach-profile">
                <span>تکمیل پروفایل</span>
                <ArrowRight className="h-4 w-4 mr-1" />
              </Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};
