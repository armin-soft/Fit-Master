
import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { UserTypeSelectionNew } from "@/components/auth/UserTypeSelection-New";
import AppRoutes from "./AppRoutes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/hooks/use-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppNameProvider } from "@/contexts/AppNameContext";
import "./App.css";

function AppContent() {
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  useEffect(() => {
    const checkUserType = async () => {
      console.log('AppContent: Current path:', currentPath);
      
      try {
        // اگر در مسیر خاص هستیم (غیر از root)، بررسی سازگاری
        if (currentPath.startsWith('/Management')) {
          console.log('AppContent: In management path');
          // نمایش پنل مدیریت
          setShowUserTypeSelection(false);
          setIsLoading(false);
          return;
        }
        
        if (currentPath.startsWith('/Student')) {
          console.log('AppContent: In student path');
          // نمایش پنل شاگرد
          setShowUserTypeSelection(false);
          setIsLoading(false);
          return;
        }
        
        // اگر در root هستیم، همیشه صفحه انتخاب نوع کاربر را نمایش بده
        if (currentPath === '/') {
          console.log('AppContent: At root, showing user type selection screen');
          setShowUserTypeSelection(true);
          setIsLoading(false);
          return;
        }
        
        // در سایر مسیرها صفحه انتخاب نوع کاربر نمایش داده می‌شود
        setShowUserTypeSelection(true);
        setIsLoading(false);
      } catch (error) {
        console.error('خطا در بررسی نوع کاربر:', error);
        setShowUserTypeSelection(true);
        setIsLoading(false);
      }
    };

    checkUserType();
  }, [currentPath, navigate]);

  // نمایش loading در حین بررسی
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-info-100 dark:from-brand-950 dark:to-info-950">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-600 dark:text-brand-400 font-medium">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // نمایش صفحه انتخاب نوع کاربر
  if (showUserTypeSelection) {
    return <UserTypeSelectionNew />;
  }

  // بررسی نوع کاربر انتخاب شده (از حافظه موقت - checkUserType آن را قبلاً بررسی کرده)
  const selectedUserType = null; // این مقدار در checkUserType بررسی شده و در صورت لزوم هدایت انجام می‌شود
  
  console.log('AppContent: Rendering for user type:', selectedUserType);
  console.log('AppContent: Current path:', currentPath);

  // اگر در مسیر مدیریت هستیم، نمایش پنل مدیریت با احراز هویت
  if (currentPath.startsWith('/Management')) {
    console.log('AppContent: Rendering management panel with authentication');
    return (
      <AuthWrapper>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthWrapper>
    );
  }

  // اگر در مسیر شاگرد هستیم، نمایش پنل شاگرد
  if (currentPath.startsWith('/Student')) {
    console.log('AppContent: Rendering student panel');
    return <AppRoutes />;
  }

  // اگر در root هستیم و user type selection نمایش داده نشده، fallback
  if (currentPath === '/' && !showUserTypeSelection) {
    console.log('AppContent: Root path without user type selection, showing selection');
    return <UserTypeSelectionNew />;
  }

  // fallback - نمایش انتخاب نوع کاربر
  console.log('AppContent: Fallback to user type selection');
  return <UserTypeSelectionNew />;
}

function App() {
  console.log('App component initializing...');

  useEffect(() => {
    console.log('App component mounted successfully');
    
    const handleGlobalError = (e: ErrorEvent) => {
      console.error('Global error:', e.error);
    };
    
    const handleUnhandledRejection = (e: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', e.reason);
    };
    
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppNameProvider>
        <ThemeProvider>
          <TooltipProvider>
            <BrowserRouter>
              <AppContent />
              <Toaster />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AppNameProvider>
    </QueryClientProvider>
  );
}

export default App;
