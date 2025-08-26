
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, History } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";

const StudentTabControls: React.FC = () => {
  const deviceInfo = useDeviceInfo();

  return (
    <TabsList className={`h-10 sm:h-12 p-1 ${deviceInfo.isMobile ? 'w-full' : ''}`}>
      <TabsTrigger value="all" className="gap-2 h-8 sm:h-10 px-3 sm:px-6">
        <UserRound className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="text-sm sm:text-base">همه شاگردان</span>
      </TabsTrigger>
      <TabsTrigger value="history" className="gap-2 h-8 sm:h-10 px-3 sm:px-6">
        <History className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="text-sm sm:text-base">تاریخچه</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default StudentTabControls;
