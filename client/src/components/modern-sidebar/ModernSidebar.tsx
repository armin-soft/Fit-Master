
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarNavigation } from "./components/SidebarNavigation";
import { SidebarFooter } from "./components/SidebarFooter";
import { SidebarBackground } from "./components/SidebarBackground";
import { useSidebarDimensions } from "./utils/deviceUtils";
import { cn } from "@/lib/utils";
import { SidebarItem, TrainerProfile, SidebarStats } from "./types";

interface ModernSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: SidebarItem[];
  profile: TrainerProfile;
  stats: SidebarStats;
  onLogout?: () => void;
}

export const ModernSidebar: React.FC<ModernSidebarProps> = ({
  isOpen,
  onClose,
  items,
  profile,
  stats,
  onLogout
}) => {
  const { getSidebarWidth } = useSidebarDimensions();

  const handleOpenChange = (open: boolean) => {
    console.log('Sheet handleOpenChange called with:', open, 'current isOpen:', isOpen);
    // فقط وقتی Sheet بسته می‌شود، onClose را صدا کن
    if (!open) {
      console.log('Sheet closing, calling onClose');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
          <SheetContent 
            side="right" 
            className={cn(
              getSidebarWidth(),
              "p-0 border-0 bg-gradient-to-br from-slate-50/95 via-emerald-50/90 to-sky-50/85 dark:from-slate-950/95 dark:via-emerald-950/90 dark:to-sky-950/85 backdrop-blur-xl shadow-2xl overflow-hidden"
            )}
            dir="rtl"
          >
            <div className="flex h-full flex-col relative" dir="rtl">
              <SidebarBackground />
              
              <div className="relative z-20 flex-shrink-0">
                <SidebarHeader 
                  profile={profile}
                  stats={stats}
                  onClose={onClose}
                />
              </div>
              
              <div className="relative z-20 flex-1 overflow-hidden">
                <SidebarNavigation 
                  items={items}
                  onClose={onClose}
                />
              </div>
              
              <div className="relative z-20 flex-shrink-0">
                <SidebarFooter 
                  onLogout={onLogout}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </AnimatePresence>
  );
};
