import React from "react";
import { motion } from "framer-motion";
import { 
  User2, 
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  BarChart3, 
  MessageSquare, 
  Info,
  ArrowLeft,
  Zap,
  Link
} from "lucide-react";
import { useLocation } from "wouter";

export const QuickAccessSection = () => {
  const [, setLocation] = useLocation();

  const quickAccessItems = [
    {
      id: "coach-profile",
      title: "پروفایل مربی",
      description: "ویرایش اطلاعات شخصی",
      href: "/Management/Coach-Profile",
      icon: User2,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20"
    },
    {
      id: "students",
      title: "شاگردان",
      description: "مدیریت ورزشکاران",
      href: "/Management/Students",
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "from-emerald-900/20 to-teal-900/20"
    },
    {
      id: "exercises",
      title: "تمرینات",
      description: "کتابخانه حرکات",
      href: "/Management/Exercise-Movements",
      icon: Dumbbell,
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-50 to-amber-50",
      darkBgGradient: "from-orange-900/20 to-amber-900/20"
    },
    {
      id: "diet",
      title: "برنامه غذایی",
      description: "رژیم‌های تغذیه‌ای",
      href: "/Management/Diet-Plan",
      icon: UtensilsCrossed,
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50 to-pink-50",
      darkBgGradient: "from-rose-900/20 to-pink-900/20"
    },
    {
      id: "supplements",
      title: "مکمل‌ها",
      description: "ویتامین و مکمل‌ها",
      href: "/Management/Supplements-Vitamins",
      icon: Pill,
      gradient: "from-sky-500 to-blue-600",
      bgGradient: "from-sky-50 to-blue-50",
      darkBgGradient: "from-sky-900/20 to-blue-900/20"
    },
    {
      id: "reports",
      title: "گزارشات",
      description: "تحلیل و آمار",
      href: "/Management/Report",
      icon: BarChart3,
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-50 to-cyan-50",
      darkBgGradient: "from-teal-900/20 to-cyan-900/20"
    },
    {
      id: "support",
      title: "پشتیبانی",
      description: "پیام‌های شاگردان",
      href: "/Management/Support",
      icon: MessageSquare,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      darkBgGradient: "from-violet-900/20 to-purple-900/20"
    },
    {
      id: "about",
      title: "درباره",
      description: "اطلاعات پروژه",
      href: "/Management/About",
      icon: Info,
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50",
      darkBgGradient: "from-indigo-900/20 to-purple-900/20"
    }
  ];

  // دسترسی سریع جدید مشابه تصویر
  const newQuickAccessItems = [
    {
      id: "charts",
      title: "گزارشات و تحلیل‌ها",
      description: "مشاهده آمار و گزارشات جامع سیستم",
      href: "/Management/Report",
      icon: BarChart3,
      iconBg: "bg-teal-500"
    },
    {
      id: "links",
      title: "مکمل و ویتامین",
      description: "مدیریت مکمل‌ها، ویتامین‌ها و تغذیه",
      href: "/Management/Supplements-Vitamins",
      icon: Link,
      iconBg: "bg-teal-500"
    },
    {
      id: "training",
      title: "برنامه‌های غذایی",
      description: "طراحی و مدیریت رژیم‌های غذایی",
      href: "/Management/Diet-Plan",
      icon: Dumbbell,
      iconBg: "bg-teal-500"
    },
    {
      id: "support-new",
      title: "پشتیبانی و ارتباط",
      description: "مدیریت پیام‌ها و ارتباط با شاگردان",
      href: "/Management/Support",
      icon: MessageSquare,
      iconBg: "bg-teal-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-12 space-y-12"
    >
      {/* دسترسی سریع کامل */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-xl">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            دسترسی سریع
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {quickAccessItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => setLocation(item.href)}
            >
              <div className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} dark:bg-gradient-to-br dark:${item.darkBgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <div className={`p-3 bg-gradient-to-r ${item.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 mb-1">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300 mb-3 flex-1">
                    {item.description}
                  </p>
                  
                  {/* Arrow */}
                  <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1 right-1 w-8 h-8 bg-gradient-to-br from-white/10 to-white/5 rounded-full -translate-y-2 translate-x-2 group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute bottom-1 left-1 w-6 h-6 bg-gradient-to-tl from-white/10 to-white/5 rounded-full translate-y-2 -translate-x-2 group-hover:scale-125 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* دسترسی سریع جدید (مشابه تصویر) */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {newQuickAccessItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => setLocation(item.href)}
            >
              <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-800/20 dark:to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 ${item.iconBg} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 left-2 w-8 h-8 bg-gradient-to-br from-white/10 to-white/5 rounded-full -translate-y-2 -translate-x-2 group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-gradient-to-tl from-white/10 to-white/5 rounded-full translate-y-2 translate-x-2 group-hover:scale-125 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};