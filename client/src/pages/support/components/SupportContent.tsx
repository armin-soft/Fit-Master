
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, User, HelpCircle, BookOpen, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function SupportContent() {
  const helpTopics = [
    {
      title: "راهنمای استفاده از سیستم",
      description: "نحوه کار با قسمت‌های مختلف سیستم مدیریت باشگاه",
      icon: BookOpen,
      articles: 5
    },
    {
      title: "مدیریت شاگردان",
      description: "ثبت، ویرایش و پیگیری وضعیت شاگردان",
      icon: User,
      articles: 8
    },
    {
      title: "برنامه‌های تمرینی",
      description: "ایجاد و مدیریت برنامه‌های ورزشی",
      icon: HelpCircle,
      articles: 12
    }
  ];

  const supportChannels = [
    {
      title: "تماس تلفنی",
      description: "۰۹۱۲-۳۴۵۶۷۸۹",
      icon: Phone,
      available: "۹ صبح تا ۱۸ عصر",
      status: "available"
    },
    {
      title: "چت آنلاین", 
      description: "پاسخگویی فوری",
      icon: MessageCircle,
      available: "۲۴ ساعته",
      status: "available"
    },
    {
      title: "ایمیل پشتیبانی",
      description: "support@fitmaster.ir",
      icon: HelpCircle,
      available: "پاسخ تا ۲۴ ساعت",
      status: "available"
    }
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* راهنمای سریع */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-500" />
            راهنمای سریع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {helpTopics.map((topic, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <topic.icon className="h-5 w-5 text-emerald-500" />
                  <h4 className="font-medium">{topic.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                <Badge variant="secondary" className="text-xs">
                  {topic.articles} مقاله
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* کانال‌های پشتیبانی */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-sky-500" />
            ارتباط با پشتیبانی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-gray-200 rounded-lg text-center"
              >
                <channel.icon className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                <h4 className="font-medium mb-2">{channel.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{channel.available}</span>
                </div>
                <Badge 
                  variant={channel.status === 'available' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {channel.status === 'available' ? 'در دسترس' : 'غیرفعال'}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* سوالات متداول */}
      <Card>
        <CardHeader>
          <CardTitle>سوالات متداول</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">چگونه شاگرد جدید اضافه کنم؟</h4>
              <p className="text-sm text-gray-600">
                از منوی کناری روی "شاگردان" کلیک کنید و سپس دکمه "افزودن شاگرد" را انتخاب کنید.
              </p>
            </div>
            
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">نحوه ایجاد برنامه تمرینی چیست؟</h4>
              <p className="text-sm text-gray-600">
                پس از انتخاب شاگرد، از بخش "برنامه تمرینی" می‌توانید برنامه جدید تعریف کنید.
              </p>
            </div>
            
            <div className="pb-4">
              <h4 className="font-medium mb-2">چگونه گزارش عملکرد ببینم؟</h4>
              <p className="text-sm text-gray-600">
                از منوی اصلی، بخش "گزارش‌ها" را انتخاب کنید تا آمار و نمودارهای مختلف را ببینید.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
