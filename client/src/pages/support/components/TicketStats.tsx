
import React from "react";
import { Ticket, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import type { TicketStats as TicketStatsType } from "../types";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface TicketStatsProps {
  stats: TicketStatsType;
}

export function TicketStats({ stats }: TicketStatsProps) {
  const deviceInfo = useDeviceInfo();
  
  const convertToFarsiNumbers = (num: number): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  };

  const getGridClasses = () => {
    if (deviceInfo.isMobile) return "grid-cols-2 gap-2";
    if (deviceInfo.isTablet) return "grid-cols-3 gap-3";
    return "grid-cols-6 gap-4";
  };

  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-2";
    if (deviceInfo.isTablet) return "p-3";
    return "p-4";
  };

  // Ensure stats exists and has default values
  const safeStats = {
    totalTickets: stats?.totalTickets || 0,
    openTickets: stats?.openTickets || 0,
    inProgressTickets: stats?.inProgressTickets || 0,
    resolvedTickets: stats?.resolvedTickets || 0,
    closedTickets: stats?.closedTickets || 0,
    todayTickets: stats?.todayTickets || 0,
    averageResponseTime: stats?.averageResponseTime || 0
  };

  const statsData = [
    {
      title: "کل تیکت‌ها",
      value: safeStats.totalTickets,
      icon: Ticket,
      color: "from-emerald-500 to-sky-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      title: "تیکت‌های باز",
      value: safeStats.openTickets,
      icon: AlertTriangle,
      color: "from-destructive to-orange-600",
      bgColor: "bg-destructive/10",
      textColor: "text-destructive"
    },
    {
      title: "در حال بررسی",
      value: safeStats.inProgressTickets,
      icon: Clock,
      color: "from-primary to-sky-600",
      bgColor: "bg-primary/10",
      textColor: "text-primary"
    },
    {
      title: "حل شده",
      value: safeStats.resolvedTickets,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "تیکت‌های امروز",
      value: safeStats.todayTickets,
      icon: TrendingUp,
      color: "from-sky-500 to-emerald-600",
      bgColor: "bg-sky-50",
      textColor: "text-sky-600"
    },
    {
      title: "میانگین پاسخ (ساعت)",
      value: safeStats.averageResponseTime,
      icon: Clock,
      color: "from-emerald-500 to-sky-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    }
  ];

  return (
    <div className={cn("grid", getGridClasses())}>
      {statsData.filter(stat => stat && stat.bgColor).map((stat, index) => {
        if (!stat || !stat.icon) return null;
        
        const Icon = stat.icon;
        return (
          <div
            key={`stat-${index}`}
            className={cn(
              "relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105",
              getCardPadding()
            )}
            dir="rtl"
          >
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className={cn(
                  "text-gray-600 font-medium mb-1",
                  deviceInfo.isMobile ? "text-xs" : "text-sm"
                )}>
                  {stat.title}
                </p>
                <p className={cn(
                  "font-black",
                  stat.textColor,
                  deviceInfo.isMobile ? "text-base" : deviceInfo.isTablet ? "text-lg" : "text-xl"
                )}>
                  {convertToFarsiNumbers(stat.value)}
                </p>
              </div>
              
              <div className={cn(
                "rounded-xl flex items-center justify-center",
                stat.bgColor,
                deviceInfo.isMobile ? "w-8 h-8" : deviceInfo.isTablet ? "w-10 h-10" : "w-12 h-12"
              )}>
                <Icon className={cn(
                  stat.textColor,
                  deviceInfo.isMobile ? "w-4 h-4" : deviceInfo.isTablet ? "w-5 h-5" : "w-6 h-6"
                )} />
              </div>
            </div>
            
            <div className={cn(
              "absolute bottom-0 left-0 h-1 bg-gradient-to-r",
              stat.color
            )}></div>
          </div>
        );
      })}
    </div>
  );
}
