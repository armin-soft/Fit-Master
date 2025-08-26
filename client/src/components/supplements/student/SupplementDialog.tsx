
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface SupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (data: {supplements: number[], vitamins: number[], day?: number}) => boolean;
  supplements: any[];
  initialSupplements?: number[];
  initialVitamins?: number[];
  initialSupplementsDay1?: number[];
  initialVitaminsDay1?: number[];
}

export const SupplementDialog: React.FC<SupplementDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  supplements,
  initialSupplements = [],
  initialVitamins = [],
  initialSupplementsDay1 = [],
  initialVitaminsDay1 = [],
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("general");
  const [dayTab, setDayTab] = useState<string>("supplements");

  const [selectedSupplements, setSelectedSupplements] = useState<number[]>(initialSupplements);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>(initialVitamins);
  const [selectedSupplementsDay1, setSelectedSupplementsDay1] = useState<number[]>(initialSupplementsDay1);
  const [selectedVitaminsDay1, setSelectedVitaminsDay1] = useState<number[]>(initialVitaminsDay1);
  
  // Filter supplements by type
  const supplementsList = supplements.filter(item => item.type === 'supplement');
  const vitaminsList = supplements.filter(item => item.type === 'vitamin');
  
  const handleToggleSupplement = (id: number, day?: string) => {
    if (day === "day1") {
      if (selectedSupplementsDay1.includes(id)) {
        setSelectedSupplementsDay1(selectedSupplementsDay1.filter(item => item !== id));
      } else {
        setSelectedSupplementsDay1([...selectedSupplementsDay1, id]);
      }
    } else {
      // General day
      if (selectedSupplements.includes(id)) {
        setSelectedSupplements(selectedSupplements.filter(item => item !== id));
      } else {
        setSelectedSupplements([...selectedSupplements, id]);
      }
    }
  };
  
  const handleToggleVitamin = (id: number, day?: string) => {
    if (day === "day1") {
      if (selectedVitaminsDay1.includes(id)) {
        setSelectedVitaminsDay1(selectedVitaminsDay1.filter(item => item !== id));
      } else {
        setSelectedVitaminsDay1([...selectedVitaminsDay1, id]);
      }
    } else {
      // General day
      if (selectedVitamins.includes(id)) {
        setSelectedVitamins(selectedVitamins.filter(item => item !== id));
      } else {
        setSelectedVitamins([...selectedVitamins, id]);
      }
    }
  };
  
  const handleSave = () => {
    let success = false;
    
    if (activeTab === "general") {
      success = onSave({
        supplements: selectedSupplements,
        vitamins: selectedVitamins
      });
    } else if (activeTab === "day1") {
      success = onSave({
        supplements: selectedSupplementsDay1,
        vitamins: selectedVitaminsDay1,
        day: 1
      });
    }
    
    if (success) {
      toast({
        title: "برنامه مکمل و ویتامین ذخیره شد",
        description: `برنامه مکمل و ویتامین برای ${studentName} با موفقیت ذخیره شد.`,
      });
      onOpenChange(false);
    } else {
      toast({
        variant: "destructive",
        title: "خطا در ذخیره برنامه",
        description: "متأسفانه ذخیره برنامه مکمل و ویتامین با خطا مواجه شد.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogTitle>مکمل و ویتامین - {studentName}</DialogTitle>
        <DialogDescription>
          برنامه مکمل و ویتامین برای {studentName} را تنظیم کنید.
        </DialogDescription>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="general">عمومی</TabsTrigger>
            <TabsTrigger value="day1">روز اول</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Tabs defaultValue="supplements" value={dayTab} onValueChange={setDayTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="supplements">مکمل‌ها</TabsTrigger>
                <TabsTrigger value="vitamins">ویتامین‌ها</TabsTrigger>
              </TabsList>
              
              <TabsContent value="supplements">
                <ScrollArea className="h-[320px] pr-4">
                  <div className="space-y-4">
                    {supplementsList.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2 p-4 border rounded-md">
                        <Checkbox 
                          id={`supplement-${item.id}`} 
                          checked={selectedSupplements.includes(item.id)}
                          onCheckedChange={() => handleToggleSupplement(item.id)}
                        />
                        <label htmlFor={`supplement-${item.id}`} className="mr-2 font-medium">
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="vitamins">
                <ScrollArea className="h-[320px] pr-4">
                  <div className="space-y-4">
                    {vitaminsList.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2 p-4 border rounded-md">
                        <Checkbox 
                          id={`vitamin-${item.id}`} 
                          checked={selectedVitamins.includes(item.id)}
                          onCheckedChange={() => handleToggleVitamin(item.id)}
                        />
                        <label htmlFor={`vitamin-${item.id}`} className="mr-2 font-medium">
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="day1">
            <Tabs defaultValue="supplements" value={dayTab} onValueChange={setDayTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="supplements">مکمل‌ها</TabsTrigger>
                <TabsTrigger value="vitamins">ویتامین‌ها</TabsTrigger>
              </TabsList>
              
              <TabsContent value="supplements">
                <ScrollArea className="h-[320px] pr-4">
                  <div className="space-y-4">
                    {supplementsList.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2 p-4 border rounded-md">
                        <Checkbox 
                          id={`supplement-day1-${item.id}`} 
                          checked={selectedSupplementsDay1.includes(item.id)}
                          onCheckedChange={() => handleToggleSupplement(item.id, "day1")}
                        />
                        <label htmlFor={`supplement-day1-${item.id}`} className="mr-2 font-medium">
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="vitamins">
                <ScrollArea className="h-[320px] pr-4">
                  <div className="space-y-4">
                    {vitaminsList.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2 p-4 border rounded-md">
                        <Checkbox 
                          id={`vitamin-day1-${item.id}`} 
                          checked={selectedVitaminsDay1.includes(item.id)}
                          onCheckedChange={() => handleToggleVitamin(item.id, "day1")}
                        />
                        <label htmlFor={`vitamin-day1-${item.id}`} className="mr-2 font-medium">
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>انصراف</Button>
          <Button onClick={handleSave}>ذخیره برنامه</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
