
import { Shield, GraduationCap } from "lucide-react";

export const userTypesConfig = [
  {
    id: 'management' as const,
    title: 'پنل مدیریت',
    subtitle: 'مربی و مدیر باشگاه',
    description: 'دسترسی کامل به سیستم مدیریت باشگاه، شاگردان و برنامه‌های تمرینی',
    icon: Shield,
    gradient: 'from-brand-600 to-info-600',
    features: [
      'مدیریت کامل شاگردان و اعضا',
      'طراحی برنامه‌های تمرینی پیشرفته',
      'برنامه‌ریزی تغذیه اختصاصی',
      'گزارشات تحلیلی و آماری',
      'مدیریت مکمل‌ها و ویتامین‌ها',
      'پشتیبان‌گیری و بازیابی اطلاعات'
    ],
    badge: 'مدیر'
  },
  {
    id: 'student' as const,
    title: 'پنل شاگرد',
    subtitle: 'دسترسی شخصی ورزشکار',
    description: 'مشاهده برنامه‌های شخصی، پیگیری پیشرفت و دریافت راهنمایی‌های تخصصی',
    icon: GraduationCap,
    gradient: 'from-info-600 to-brand-600',
    features: [
      'مشاهده برنامه تمرینی شخصی',
      'برنامه تغذیه اختصاصی',
      'پیگیری پیشرفت و نتایج',
      'لیست مکمل‌های توصیه شده',
      'مدیریت اطلاعات شخصی',
      'دسترسی به تاریخچه فعالیت‌ها'
    ],
    badge: 'شاگرد'
  }
];
