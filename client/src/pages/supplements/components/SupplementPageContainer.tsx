import { motion } from "framer-motion";
import { PageContainer } from "@/components/ui/page-container";
import { SupplementPageHeader } from "./SupplementPageHeader";
import { SupplementStatsSection } from "./SupplementStatsSection";
import { SupplementPageTabs } from "./SupplementPageTabs";
import { CategoryDialog } from "./dialogs/CategoryDialog";
import { SupplementDialog } from "./dialogs/SupplementDialog";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useSupplementPageState } from "../hooks/useSupplementPageState";
import { useSupplementPageHandlers } from "../hooks/useSupplementPageHandlers";
import { useDataRefresh } from "@/hooks/useDataRefresh";

export const SupplementPageContainer = () => {
  const deviceInfo = useDeviceInfo();
  const state = useSupplementPageState();
  const handlers = useSupplementPageHandlers(state);

  // Auto-refresh supplement data
  useDataRefresh({
    keys: ['/api/supplements', '/api/supplement-categories']
  });

  // Compact responsive spacing for better scrolling experience
  const getResponsiveClasses = () => {
    if (deviceInfo.isMobile) {
      return "space-y-1 p-2";
    } else if (deviceInfo.isTablet) {
      return "space-y-2 p-3";
    } else if (deviceInfo.isSmallLaptop) {
      return "space-y-2 p-3"; 
    } else {
      return "space-y-3 p-4";
    }
  };

  return (
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      className="w-full h-full min-h-screen overflow-x-hidden"
    >
      <div className={`w-full flex flex-col overflow-x-hidden overflow-y-auto ${getResponsiveClasses()}`}>
        <div className="flex-shrink-0">
          <SupplementPageHeader />
        </div>
        
        <div className="flex-shrink-0">
          <SupplementStatsSection
            supplementsCount={state.supplements.filter((s: any) => s.type === 'supplement').length}
            vitaminsCount={state.supplements.filter((s: any) => s.type === 'vitamin').length}
          />
        </div>

        <div className="flex-shrink-0 w-full">
          <SupplementPageTabs
            activeTab={state.activeTab}
            setActiveTab={state.setActiveTab}
            state={state}
            handlers={handlers}
          />
        </div>

        <CategoryDialog
          isOpen={state.isCategoryDialogOpen}
          onOpenChange={state.setIsCategoryDialogOpen}
          editingCategory={state.editingCategory}
          activeTab={state.activeTab}
          onSubmit={handlers.handleSaveCategory}
        />

        <SupplementDialog
          isOpen={state.isSupplementDialogOpen}
          onOpenChange={state.setIsSupplementDialogOpen}
          editingSupplement={state.editingSupplement}
          categories={state.categories || []}
          type={state.activeTab === 'vitamins' ? 'vitamin' : 'supplement'}
          selectedCategoryId={state.activeTab === 'vitamins' ? state.selectedCategoryIdForVitamin : state.selectedCategoryIdForSupplement}
          onSubmit={handlers.handleSaveSupplementOrVitamin}
        />
      </div>
    </PageContainer>
  );
};