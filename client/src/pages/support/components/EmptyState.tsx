
import React from "react";
import { Ticket, Search } from "lucide-react";
import { TicketFilter } from "../types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  filter: TicketFilter;
  searchQuery: string;
}

export function EmptyState({ filter, searchQuery }: EmptyStateProps) {
  const deviceInfo = useDeviceInfo();
  
  const getFilterLabel = (filter: TicketFilter): string => {
    switch (filter) {
      case "open": return "باز";
      case "in_progress": return "در حال بررسی";
      case "resolved": return "حل شده";
      case "closed": return "بسته شده";
      default: return "";
    }
  };

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-6";
    if (deviceInfo.isTablet) return "p-8";
    return "p-12";
  };

  const getIconSize = () => {
    if (deviceInfo.isMobile) return "w-16 h-16";
    if (deviceInfo.isTablet) return "w-20 h-20";
    return "w-24 h-24";
  };

  const isSearching = searchQuery.length > 0;
  const hasFilter = filter !== "all";

  return (
    <div className={cn(
      "bg-white rounded-xl border border-gray-200 shadow-sm text-center",
      getCardPadding()
    )} dir="rtl">
      <div className="flex flex-col items-center">
        <div className={cn(
          "rounded-full bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center mb-6",
          getIconSize()
        )}>
          {isSearching ? (
            <Search className={cn(
              "text-emerald-600",
              deviceInfo.isMobile ? "w-8 h-8" : deviceInfo.isTablet ? "w-10 h-10" : "w-12 h-12"
            )} />
          ) : (
            <Ticket className={cn(
              "text-emerald-600",
              deviceInfo.isMobile ? "w-8 h-8" : deviceInfo.isTablet ? "w-10 h-10" : "w-12 h-12"
            )} />
          )}
        </div>
        
        <h3 className={cn(
          "font-bold text-gray-800 mb-2",
          deviceInfo.isMobile ? "text-lg" : deviceInfo.isTablet ? "text-xl" : "text-2xl"
        )}>
          {isSearching ? "نتیجه‌ای یافت نشد" : 
           hasFilter ? `هیچ تیکت ${getFilterLabel(filter)}ی وجود ندارد` : 
           "هیچ تیکتی وجود ندارد"}
        </h3>
        
        <p className={cn(
          "text-gray-600 leading-relaxed max-w-md",
          deviceInfo.isMobile ? "text-sm" : "text-base"
        )}>
          {isSearching ? 
            `برای جستجوی "${searchQuery}" هیچ نتیجه‌ای پیدا نشد. لطفاً کلمات کلیدی دیگری امتحان کنید.` :
           hasFilter ? 
            `در حال حاضر هیچ تیکت ${getFilterLabel(filter)}ی در سیستم موجود نیست.` :
            "هنوز هیچ تیکتی از شاگردان دریافت نکرده‌اید. به محض ارسال تیکت توسط شاگردان، در اینجا نمایش داده خواهد شد."
          }
        </p>
        
        {!isSearching && !hasFilter && (
          <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-emerald-700 text-sm font-medium">
              💡 شاگردان می‌توانند از پنل شخصی خود تیکت پشتیبانی ارسال کنند
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
