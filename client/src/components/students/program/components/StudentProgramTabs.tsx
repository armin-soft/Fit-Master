
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dumbbell, Utensils, Pill } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgramTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  children: React.ReactNode;
}

const StudentProgramTabs: React.FC<StudentProgramTabsProps> = ({
  activeTab,
  setActiveTab,
  currentDay,
  setCurrentDay,
  children
}) => {
  return (
    <Tabs defaultValue="exercise" value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
      <Card className="flex flex-col flex-1">
        <CardHeader className="pb-0">
          <TabsList className="grid grid-cols-3 mb-0">
            <TabsTrigger value="exercise" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              <span>برنامه تمرینی</span>
            </TabsTrigger>
            <TabsTrigger value="diet" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span>برنامه غذایی</span>
            </TabsTrigger>
            <TabsTrigger value="supplement" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              <span>مکمل و ویتامین</span>
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="pt-6 flex-1 overflow-auto">
          {children}
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default StudentProgramTabs;
