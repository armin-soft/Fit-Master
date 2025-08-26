import {
  LayoutDashboard,
  User2,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  BarChart3,
  MessageSquare,
  Info
} from "lucide-react";
import { SidebarItem } from "@/components/modern-sidebar/types";

// Function to get real badge counts from API
const getBadgeCounts = async () => {
  try {
    const studentResponse = await fetch('/api/current-student', { credentials: 'include' });
    if (!studentResponse.ok) return {};
    
    const student = await studentResponse.json();
    const studentId = student.id;

    const [exerciseRes, mealRes, supplementRes] = await Promise.all([
      fetch(`/api/students/${studentId}/exercise-programs`, { credentials: 'include' }),
      fetch(`/api/students/${studentId}/meal-plans`, { credentials: 'include' }),
      fetch(`/api/students/${studentId}/supplements`, { credentials: 'include' })
    ]);

    const exercisePrograms = exerciseRes.ok ? await exerciseRes.json() : [];
    const mealPlans = mealRes.ok ? await mealRes.json() : [];
    const supplements = supplementRes.ok ? await supplementRes.json() : [];

    return {
      exercises: exercisePrograms.length.toString(),
      meals: mealPlans.length.toString(),
      supplements: supplements.length.toString()
    };
  } catch (error) {
    console.error('Error loading badge counts:', error);
    return {};
  }
};

export const studentSidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    title: "داشبورد شاگرد",
    subtitle: "نمای کلی پیشرفت و آمار شخصی",
    href: "/Student",
    icon: LayoutDashboard,
    gradient: "from-emerald-500 to-sky-600",
    isNew: false,
  },
  {
    id: "profile",
    title: "پروفایل شاگرد",
    subtitle: "مدیریت اطلاعات شخصی و بدنی",
    href: "/Student/Profile",
    icon: User2,
    gradient: "from-blue-500 to-cyan-600",
    isNew: false,
  },
  {
    id: "exercises",
    title: "حرکات تمرینی",
    subtitle: "برنامه تمرینی و حرکات اختصاصی",
    href: "/Student/Exercise-Movements",
    icon: Dumbbell,
    gradient: "from-orange-500 to-amber-600",
    isNew: false,
  },
  {
    id: "diet",
    title: "برنامه‌های غذایی",
    subtitle: "رژیم غذایی و وعده‌های تخصصی",
    href: "/Student/Diet-Plan",
    icon: UtensilsCrossed,
    gradient: "from-rose-500 to-pink-600",
    isNew: false,
  },
  {
    id: "supplements",
    title: "مکمل و ویتامین",
    subtitle: "مکمل‌های تجویزی و راهنمای مصرف",
    href: "/Student/Supplements-Vitamins",
    icon: Pill,
    gradient: "from-sky-500 to-blue-600",
    isNew: false,
  },
  {
    id: "reports",
    title: "گزارشات و تحلیل‌ها",
    subtitle: "آمار پیشرفت و تحلیل عملکرد",
    href: "/Student/Report",
    icon: BarChart3,
    gradient: "from-teal-500 to-cyan-600",
    isNew: false,
  },
  {
    id: "support",
    title: "پشتیبانی و ارتباط",
    subtitle: "ارتباط با مربی و پشتیبانی",
    href: "/Student/Support",
    icon: MessageSquare,
    gradient: "from-violet-500 to-purple-600",
    isNew: false,
  },
  {
    id: "about",
    title: "درباره پروژه",
    subtitle: "اطلاعات پروژه و توسعه‌دهنده",
    href: "/Student/About",
    icon: Info,
    gradient: "from-indigo-500 to-purple-600",
    isNew: false,
  },
];

// Return sidebar items without badges as requested
export const getStudentSidebarItemsWithBadges = async (): Promise<SidebarItem[]> => {
  // Remove all badges from student sidebar menu items
  return studentSidebarItems.map(item => ({
    ...item,
    badge: undefined  // Remove all numbers/badges from sidebar menu
  }));
};