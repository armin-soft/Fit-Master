
import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useAppName } from "@/contexts/AppNameContext";

interface HeaderProfileProps {
  trainerProfile: {
    name: string;
    image: string;
  };
  totalStudents: number;
  greeting: string;
}

export const HeaderProfile = ({ trainerProfile, totalStudents, greeting }: HeaderProfileProps) => {
  const { appName } = useAppName();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <motion.div 
          className="absolute -inset-1 rounded-full bg-white/30 blur-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <Avatar className="h-20 w-20 border-4 border-white/30 relative shadow-xl">
          <AvatarImage 
            src={trainerProfile.image} 
            alt="تصویر پروفایل"
          />
          <AvatarFallback className="bg-white/20 text-white font-bold text-lg backdrop-blur-sm">
            {getInitials(trainerProfile.name)}
          </AvatarFallback>
        </Avatar>
        
        <motion.div 
          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-yellow-400 shadow-lg"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Crown className="h-4 w-4 text-white" fill="currentColor" />
        </motion.div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">
            {greeting}
          </h1>
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
            {trainerProfile.name}
          </Badge>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex items-center gap-1 text-xs bg-emerald-400/20 text-emerald-100 px-2 py-1 rounded-full"
          >
            <Sparkles className="w-3 h-3" />
            <span>مربی حرفه‌ای</span>
          </motion.div>
        </div>
        
        <p className="text-white/80">
          مدیریت حرفه‌ای برنامه‌های تمرینی و تغذیه - {appName}
        </p>
        
        <div className="mt-2 text-sm text-white/70">
          شاگردان فعال: {toPersianNumbers(totalStudents.toString())}
        </div>
      </div>
    </div>
  );
};
