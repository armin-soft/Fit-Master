import { useState, useEffect, useCallback } from "react";
import { StudentSidebar } from "./StudentSidebar";
import { Menu, Bell } from "lucide-react";
import { AppIcon } from "../ui/app-icon";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export const StudentLayout = ({ children }: StudentLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gymName, setGymName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const deviceInfo = useDeviceInfo();
  
  // بارگذاری اطلاعات باشگاه از API
  useEffect(() => {
    const loadGymData = async () => {
      try {
        const response = await fetch('/api/trainer/profile', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const text = await response.text();
          if (text) {
            const profileData = JSON.parse(text);
            setGymName(profileData.gymName || "");
          }
        }
      } catch (error) {
        console.error('خطا در بارگذاری پروفایل:', error);
      }
    };
    loadGymData();
  }, []);

  // بارگذاری تعداد پیام‌های خوانده نشده از API
  useEffect(() => {
    const loadUnreadMessages = async () => {
      try {
        // TODO: باید endpoint مناسب برای پیام‌های پشتیبانی اضافه شود
        // فعلاً از preferences استفاده می‌کنیم
        const { getStorageItem } = await import('@/utils/databaseStorage');
        const savedMessages = await getStorageItem('supportMessages', []);
        if (savedMessages && Array.isArray(savedMessages)) {
          const unreadCount = savedMessages.filter((msg: any) => msg.status === 'unread').length;
          setUnreadMessages(unreadCount);
        }
      } catch (error) {
        console.error('خطا در بارگذاری پیام‌ها:', error);
      }
    };

    loadUnreadMessages();

    // گوش دادن به تغییرات پیام‌ها
    const handleStorageChange = () => {
      loadUnreadMessages();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('supportMessagesUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('supportMessagesUpdated', handleStorageChange);
    };
  }, []);

  // مدیریت اسکرول
  const scrollHandler = useCallback(() => {
    const offset = window.scrollY;
    setScrolled(offset > 10);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  const convertToFarsiNumbers = (num: number): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  };
  
  // محاسبه استایل‌های فول ریسپانسیو
  const headerHeight = deviceInfo.isMobile ? "h-12" : deviceInfo.isTablet ? "h-14" : deviceInfo.isSmallLaptop ? "h-16" : "h-18";
  const headerPadding = deviceInfo.isMobile ? "px-2 py-1" : deviceInfo.isTablet ? "px-3 py-1.5" : deviceInfo.isSmallLaptop ? "px-4 py-2" : "px-6 py-2";
  const buttonSize = deviceInfo.isMobile ? "p-1.5" : deviceInfo.isTablet ? "p-2" : "p-2.5";
  const iconSize = deviceInfo.isMobile ? "h-4 w-4" : deviceInfo.isTablet ? "h-5 w-5" : "h-6 w-6";
  const logoGap = deviceInfo.isMobile ? "gap-1.5" : deviceInfo.isTablet ? "gap-2" : "gap-3";
  const titleSize = deviceInfo.isMobile ? "text-sm" : deviceInfo.isTablet ? "text-base" : deviceInfo.isSmallLaptop ? "text-lg" : "text-xl";

  const handleSidebarClose = useCallback(() => {
    console.log('Closing sidebar');
    setSidebarOpen(false);
  }, []);

  const handleSidebarOpen = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Opening sidebar - current state:', sidebarOpen);
    if (!sidebarOpen) {
      setSidebarOpen(true);
    }
  }, [sidebarOpen]);

  console.log('Layout rendering with sidebarOpen:', sidebarOpen);

  return (
    <div className="full-screen bg-gradient-to-br from-emerald-50 via-sky-50/30 to-emerald-50/40 persian-numbers flex flex-col overflow-hidden" dir="rtl">
      <StudentSidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      <header 
        className={cn(
          "sticky top-0 z-50 w-full border-b border-emerald-200/30 transition-all duration-200 flex-shrink-0",
          scrolled ? "bg-gradient-to-r from-emerald-50/95 to-sky-50/95 backdrop-blur-lg shadow-lg shadow-emerald-100/20" : "bg-gradient-to-r from-emerald-50/90 to-sky-50/90 backdrop-blur-sm",
          headerHeight,
          headerPadding
        )}
      >
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Menu button clicked, current sidebar state:', sidebarOpen);
                setSidebarOpen(!sidebarOpen);
              }}
              className={cn("rounded-md hover:bg-emerald-100/50 dark:hover:bg-emerald-800/20", buttonSize)}
              aria-label="Toggle menu"
            >
              <Menu className={cn(iconSize, "text-emerald-700 dark:text-emerald-300")} />
            </Button>
            <div className={cn("flex items-center", logoGap)}>
              <AppIcon size="sm" animated />
              <h1 className={cn(
                "font-semibold hidden xs:block bg-gradient-to-r from-emerald-700 to-sky-700 bg-clip-text text-transparent",
                titleSize
              )}>
                {gymName ? gymName : 'پنل شاگرد'}
              </h1>
            </div>
          </div>
          
          {/* اعلان پیام‌ها */}
          {unreadMessages > 0 && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full shadow-lg">
              <Bell className="w-4 h-4" />
              <span className={cn(
                "font-medium",
                deviceInfo.isMobile ? "text-xs" : "text-sm"
              )}>
                {convertToFarsiNumbers(unreadMessages)} پیام جدید
              </span>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

StudentLayout.displayName = "StudentLayout";

export default StudentLayout;