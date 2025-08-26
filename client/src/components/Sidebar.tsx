
import React, { useEffect } from "react";
import { ModernSidebar } from "./modern-sidebar/ModernSidebar";
import { sidebarItems } from "./sidebar/data/sidebarItems";
import { useProfileData } from "./sidebar/hooks/useProfileData";
import { useStatsData } from "./sidebar/hooks/useStatsData";
import { handleLogout } from "./sidebar/utils/authUtils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { trainerProfile, loadProfile } = useProfileData();
  const { stats, loadStats } = useStatsData();
  
  useEffect(() => {
    loadProfile();
    loadStats();
    
    const handleStorageChange = () => {
      loadProfile();
      loadStats();
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
      profile={trainerProfile}
      stats={stats}
      onLogout={handleLogout}
    />
  );
}
