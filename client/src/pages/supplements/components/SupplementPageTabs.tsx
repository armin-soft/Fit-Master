import { Pill, Heart } from "lucide-react";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { SupplementsTabContent } from "./tabs/SupplementsTabContent";
import { VitaminsTabContent } from "./tabs/VitaminsTabContent";

interface SupplementPageTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  state: any;
  handlers: any;
}

export const SupplementPageTabs = ({
  activeTab,
  setActiveTab,
  state,
  handlers
}: SupplementPageTabsProps) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full flex flex-col"
    >
      <TabsList className="bg-muted/30 p-1 flex justify-center mb-2">
        <TabsTrigger value="supplements" className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500 data-[state=active]:to-info-500 data-[state=active]:text-white">
          <Pill className="h-4 w-4" />
          <span className="hidden xs:inline">مکمل‌های غذایی</span>
        </TabsTrigger>
        <TabsTrigger value="vitamins" className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-500 data-[state=active]:to-info-500 data-[state=active]:text-white">
          <Heart className="h-4 w-4" />
          <span className="hidden xs:inline">ویتامین‌ها</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="supplements" className="flex flex-col space-y-2 outline-none">
        <SupplementsTabContent
          supplements={state.filteredSupplements.filter((s: any) => s.type === 'supplement')}
          categories={state.relevantCategories.filter((c: any) => !c.type || c.type === 'supplement')}
          onAddSupplement={handlers.handleAddSupplement}
          onEditSupplement={handlers.handleEditSupplement}
          onDeleteSupplement={handlers.handleDeleteSupplement}
          onAddCategory={handlers.handleAddCategory}
          onEditCategory={handlers.handleEditCategory}
          onDeleteCategory={handlers.handleDeleteCategory}
        />
      </TabsContent>

      <TabsContent value="vitamins" className="flex flex-col space-y-2 outline-none">
        <VitaminsTabContent
          vitamins={state.filteredSupplements.filter((s: any) => s.type === 'vitamin')}
          categories={state.relevantCategories.filter((c: any) => !c.type || c.type === 'vitamin')}
          onAddVitamin={handlers.handleAddVitamin}
          onEditVitamin={handlers.handleEditVitamin}
          onDeleteVitamin={handlers.handleDeleteVitamin}
          onAddCategory={handlers.handleAddCategory}
          onEditCategory={handlers.handleEditCategory}
          onDeleteCategory={handlers.handleDeleteCategory}
        />
      </TabsContent>
    </Tabs>
  );
};