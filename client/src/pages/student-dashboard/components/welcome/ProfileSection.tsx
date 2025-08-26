
import React from "react";
import { motion } from "framer-motion";
import { Hand, Sparkles } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getGreeting } from "@/components/dashboard/header/utils/timeUtils";
import { getInitials } from "../../utils/timeFormatters";
import { MotivationalQuote } from "../../utils/motivationalQuotes";

interface ProfileSectionProps {
  studentName: string;
  profileImageSrc: string;
  currentTime: Date;
  motivationalQuote: MotivationalQuote;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  studentName,
  profileImageSrc,
  currentTime,
  motivationalQuote
}) => {
  return (
    <div className="flex items-center gap-6">
      {/* عکس پروفایل */}
      <div className="relative">
        <motion.div 
          className="absolute -inset-1 rounded-full bg-white/30 blur-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <Avatar className="h-20 w-20 border-4 border-white/30 relative shadow-xl">
          <AvatarImage 
            src={profileImageSrc} 
            alt="تصویر پروفایل شاگرد"
          />
          <AvatarFallback className="bg-white/20 text-white font-bold text-lg backdrop-blur-sm">
            {getInitials(studentName)}
          </AvatarFallback>
        </Avatar>
        
        <motion.div 
          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-yellow-400 shadow-lg"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="h-4 w-4 text-white" fill="currentColor" />
        </motion.div>
      </div>

      {/* متن سلام و احوال‌پرسی */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black">
            {getGreeting(currentTime)} {studentName}!
          </h1>
          <Hand className="h-8 w-8 text-yellow-300" />
        </div>
        <div className="flex items-center gap-2">
          <motivationalQuote.icon className="h-5 w-5 text-white/90" />
          <p className="text-white/90 text-lg">
            {motivationalQuote.text}
          </p>
        </div>
      </div>
    </div>
  );
};
