
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { DashboardContentNew } from "@/components/dashboard/DashboardContent-New";
import { DashboardLayoutNew } from "@/components/dashboard/layout/DashboardLayout-New";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useQuery } from '@tanstack/react-query';

const ManagementPage = () => {
  useDocumentTitle('داشبورد مدیریت');
  
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();

  // استفاده از API برای دریافت اطلاعات شاگردان
  const { data: students = [], isLoading: studentsLoading } = useQuery({
    queryKey: ['/api/students'],
    queryFn: async () => {
      const response = await fetch('/api/students', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      return response.json();
    }
  });

  // استفاده از API برای دریافت پروفایل مربی
  const { data: trainerProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['/api/trainer/profile'],
    queryFn: async () => {
      const response = await fetch('/api/trainer/profile', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch trainer profile');
      }
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    }
  });

  const displayProfile = {
    name: trainerProfile?.name || "مربی حرفه‌ای",
    image: trainerProfile?.image || ""
  };

  if (studentsLoading || profileLoading) {
    return (
      <PageContainer withBackground fullHeight className="w-full">
        <DashboardLayoutNew>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">در حال بارگذاری...</p>
            </div>
          </div>
        </DashboardLayoutNew>
      </PageContainer>
    );
  }

  return (
    <PageContainer withBackground fullHeight className="w-full">
      <DashboardLayoutNew>
        <DashboardContentNew 
          stats={stats}
          currentTime={currentTime}
          students={students}
          trainerProfile={displayProfile}
        />
      </DashboardLayoutNew>
    </PageContainer>
  );
};

export default ManagementPage;
