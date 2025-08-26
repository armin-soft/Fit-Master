
import React, { useState, useEffect } from "react";
import { CheckCircle, RotateCw } from "lucide-react";
import { formatDistance } from 'date-fns-jalali';
import { toast } from "@/hooks/use-toast";

interface DataStatusIndicatorProps {
  lastRefreshTime: Date;
  onRefresh?: () => void;
}

export const DataStatusIndicator: React.FC<DataStatusIndicatorProps> = ({
  lastRefreshTime,
  onRefresh
}) => {
  const [timeAgo, setTimeAgo] = useState<string>("");
  const [isOutdated, setIsOutdated] = useState<boolean>(false);
  
  // Update the time ago display
  useEffect(() => {
    const updateTimeAgo = () => {
      try {
        const now = new Date();
        const distance = formatDistance(lastRefreshTime, now, { addSuffix: true });
        setTimeAgo(distance);
        
        // Check if data is outdated (more than 5 minutes old)
        const fiveMinutes = 5 * 60 * 1000;
        const isDataOutdated = now.getTime() - lastRefreshTime.getTime() > fiveMinutes;
        
        // Show toast only when status changes from fresh to outdated
        if (isDataOutdated && !isOutdated) {
          toast({
            title: "داده‌ها قدیمی شده‌اند",
            description: "لطفاً اطلاعات را به‌روزرسانی کنید",
            variant: "warning",
            duration: 5000
          });
        }
        
        setIsOutdated(isDataOutdated);
      } catch (error) {
        console.error('Error formatting time ago:', error);
      }
    };
    
    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000);
    
    return () => clearInterval(interval);
  }, [lastRefreshTime, isOutdated]);
  
  return (
    <div className="flex items-center gap-2 text-xs">
      <CheckCircle 
        className={`h-3 w-3 ${isOutdated ? 'text-amber-500' : 'text-green-500'}`} 
      />
      <span className={`${isOutdated ? 'text-amber-600' : 'text-green-600'}`}>
        {isOutdated ? 'داده‌ها قدیمی هستند' : 'داده‌ها به‌روز هستند'} 
        {timeAgo && ` (${timeAgo})`}
      </span>
      {onRefresh && (
        <button 
          onClick={() => {
            onRefresh();
            toast({
              title: "در حال بروزرسانی",
              description: "اطلاعات در حال بروزرسانی هستند...",
              variant: "default",
              duration: 2000
            });
          }}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <RotateCw className="h-3 w-3 mr-1" />
          بروزرسانی
        </button>
      )}
    </div>
  );
};
