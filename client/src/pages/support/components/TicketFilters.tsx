
import React from "react";
import { Search, Filter, Ticket, AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";
import { TicketFilter, SupportTicket, TicketSort } from "../types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TicketFiltersProps {
  filter: TicketFilter;
  onFilterChange: (filter: TicketFilter) => void;
  sortBy: TicketSort;
  onSortChange: (sort: TicketSort) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  tickets: SupportTicket[];
}

export function TicketFilters({ 
  filter, 
  onFilterChange,
  sortBy,
  onSortChange,
  searchQuery, 
  onSearchChange,
  tickets 
}: TicketFiltersProps) {
  const deviceInfo = useDeviceInfo();
  
  const convertToFarsiNumbers = (num: number): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  };

  const filters = [
    {
      key: "all" as TicketFilter,
      label: "همه تیکت‌ها",
      icon: Ticket,
      count: tickets.length,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      activeColor: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      key: "open" as TicketFilter,
      label: "باز",
      icon: AlertTriangle,
      count: tickets.filter(t => t.status === "open").length,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      activeColor: "bg-destructive/10 text-destructive border-destructive/20"
    },
    {
      key: "in_progress" as TicketFilter,
      label: "در حال بررسی",
      icon: Clock,
      count: tickets.filter(t => t.status === "in_progress").length,
      color: "text-primary",
      bgColor: "bg-primary/10",
      activeColor: "bg-primary/10 text-primary border-primary/20"
    },
    {
      key: "resolved" as TicketFilter,
      label: "حل شده",
      icon: CheckCircle,
      count: tickets.filter(t => t.status === "resolved").length,
      color: "text-green-600",
      bgColor: "bg-green-50",
      activeColor: "bg-green-50 text-green-600 border-green-200"
    },
    {
      key: "closed" as TicketFilter,
      label: "بسته شده",
      icon: XCircle,
      count: tickets.filter(t => t.status === "closed").length,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      activeColor: "bg-gray-50 text-gray-600 border-gray-200"
    }
  ];

  return (
    <div className="space-y-4">
      {/* جستجو */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="relative" dir="rtl">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="جستجو در تیکت‌ها..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-right"
            dir="rtl"
          />
        </div>
      </div>

      {/* مرتب‌سازی */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
          مرتب‌سازی براساس:
        </label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
            <SelectItem value="priority">اولویت</SelectItem>
            <SelectItem value="status">وضعیت</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* فیلترها */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4" dir="rtl">
          <Filter className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-800">فیلتر تیکت‌ها</h3>
        </div>
        
        <div className="space-y-2">
          {filters.map((filterOption) => {
            const Icon = filterOption.icon;
            const isActive = filter === filterOption.key;
            
            return (
              <button
                key={filterOption.key}
                onClick={() => onFilterChange(filterOption.key)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:scale-105",
                  isActive 
                    ? filterOption.activeColor + " border-current shadow-sm"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600"
                )}
                dir="rtl"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span className={cn(
                    "font-medium",
                    deviceInfo.isMobile ? "text-sm" : "text-base"
                  )}>
                    {filterOption.label}
                  </span>
                </div>
                
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-bold",
                  isActive 
                    ? "bg-current bg-opacity-20"
                    : "bg-gray-200 text-gray-600"
                )}>
                  {convertToFarsiNumbers(filterOption.count)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
