
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, History } from "lucide-react";

export const StudentsTabs: React.FC = () => {
  return (
    <TabsList className="mx-auto">
      <TabsTrigger value="all" className="flex gap-1.5">
        <UserRound className="h-4 w-4" />
        <span>شاگردان</span>
      </TabsTrigger>
      <TabsTrigger value="history" className="flex gap-1.5">
        <History className="h-4 w-4" />
        <span>تاریخچه</span>
      </TabsTrigger>
    </TabsList>
  );
};
