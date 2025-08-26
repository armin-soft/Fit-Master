import React, { useEffect, useState } from "react";
import { ModernSidebar } from "../modern-sidebar/ModernSidebar";
import { studentSidebarItems, getStudentSidebarItemsWithBadges } from "./data/studentSidebarItems";
import { useStudentProfileData } from "./hooks/useStudentProfileData";
import { useStudentStatsData } from "./hooks/useStudentStatsData";
import { handleStudentLogout } from "./utils/studentAuthUtils";
import { SidebarItem } from "../modern-sidebar/types";

interface StudentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StudentSidebar({ isOpen, onClose }: StudentSidebarProps) {
  const { studentProfile, loadProfile } = useStudentProfileData();
  const { stats, loadStats } = useStudentStatsData();
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>(studentSidebarItems);
  
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([loadProfile(), loadStats()]);
      
      // بارگذاری آیتم‌های منو با badge های واقعی
      try {
        const itemsWithBadges = await getStudentSidebarItemsWithBadges();
        setSidebarItems(itemsWithBadges);
      } catch (error) {
        console.error('Error loading sidebar items with badges:', error);
        setSidebarItems(studentSidebarItems); // fallback به آیتم‌های پیش‌فرض
      }
    };
    
    loadData();
    
    const handleStorageChange = () => {
      loadData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleStorageChange);
    window.addEventListener('profileUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleStorageChange);
      window.removeEventListener('profileUpdated', handleStorageChange);
    };
  }, [loadProfile, loadStats]);
  
  return (
    <ModernSidebar
      isOpen={isOpen}
      onClose={onClose}
      items={sidebarItems}
      profile={studentProfile}
      stats={stats}
      onLogout={handleStudentLogout}
    />
  );
}