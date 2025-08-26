import React from "react";
import { motion } from "framer-motion";
import { 
  Info, 
  Smartphone, 
  Youtube, 
  Github, 
  Sparkles,
  Users,
  TrendingUp,
  Target,
  Activity,
  Dumbbell,
  UtensilsCrossed,
  Pill,
  BarChart3,
  MessageSquare,
  Shield,
  Zap,
  Globe,
  Star,
  Code,
  ExternalLink
} from "lucide-react";
import { 
  SiTelegram, 
  SiInstagram, 
  SiWhatsapp, 
  SiFacebook, 
  SiX, 
  SiYoutube, 
  SiAparat 
} from "react-icons/si";
import { PageContainer } from "@/components/ui/page-container";
import { DashboardLayoutNew } from "@/components/dashboard/layout/DashboardLayout-New";
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAppVersionContext } from '@/contexts/AppVersionContext';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const AboutPage = () => {
  useDocumentTitle('درباره پروژه');
  const { version } = useAppVersionContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: Users,
      title: "مدیریت شاگردان",
      description: "ثبت، ویرایش و پیگیری کامل اطلاعات ورزشکاران",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: Dumbbell,
      title: "حرکات تمرینی",
      description: "کتابخانه جامع تمرینات ورزشی با دسته‌بندی کامل",
      gradient: "from-orange-500 to-amber-600"
    },
    {
      icon: UtensilsCrossed,
      title: "برنامه‌های غذایی",
      description: "طراحی و مدیریت رژیم‌های تغذیه‌ای شخصی‌سازی شده",
      gradient: "from-rose-500 to-pink-600"
    },
    {
      icon: Pill,
      title: "مکمل‌ها و ویتامین‌ها",
      description: "مدیریت هوشمند مکمل‌های ورزشی و تغذیه‌ای",
      gradient: "from-sky-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "گزارشات و تحلیل",
      description: "آمار و گزارشات جامع عملکرد با نمودارهای پیشرفته",
      gradient: "from-teal-500 to-cyan-600"
    },
    {
      icon: MessageSquare,
      title: "پشتیبانی هوشمند",
      description: "سیستم مدیریت پیام‌های شاگردان و ارتباط مؤثر",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: Activity,
      title: "پیگیری پیشرفت",
      description: "ردیابی دقیق پیشرفت و تحلیل روند بهبود",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Target,
      title: "هدف‌گذاری هوشمند",
      description: "تنظیم اهداف قابل اندازه‌گیری و پیگیری آن‌ها",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Shield,
      title: "امنیت بالا",
      description: "حفاظت کامل از اطلاعات شخصی و حریم خصوصی",
      gradient: "from-red-500 to-rose-600"
    },
    {
      icon: Zap,
      title: "عملکرد بهینه",
      description: "رابط کاربری سریع و پاسخگو با تکنولوژی‌های مدرن",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Globe,
      title: "پشتیبانی فارسی",
      description: "طراحی کامل برای زبان فارسی با تاریخ شمسی",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Star,
      title: "تجربه کاربری عالی",
      description: "طراحی مدرن و حرفه‌ای با انیمیشن‌های پیشرفته",
      gradient: "from-indigo-500 to-purple-600"
    }
  ];

  const socialLinks = [
    {
      name: "تلگرام کانال",
      url: "https://t.me/Channel_ARMINSOFT",
      icon: SiTelegram,
      color: "from-sky-500 to-blue-600",
      description: "آخرین اخبار و به‌روزرسانی‌ها"
    },
    {
      name: "تلگرام پشتیبانی",
      url: "https://t.me/ARMIN_SOFT",
      icon: SiTelegram,
      color: "from-emerald-500 to-teal-600",
      description: "پشتیبانی فنی و راهنمایی"
    },
    {
      name: "اینستاگرام",
      url: "https://instagram.com/ARMIN_SOFT",
      icon: SiInstagram,
      color: "from-pink-500 to-rose-600",
      description: "محتوای بصری و آموزشی"
    },
    {
      name: "واتساپ",
      url: "https://wa.me/989358983854",
      icon: SiWhatsapp,
      color: "from-green-500 to-emerald-600",
      description: "ارتباط مستقیم و سریع"
    },
    {
      name: "فیسبوک",
      url: "https://www.facebook.com/@ARMINSOFT0",
      icon: SiFacebook,
      color: "from-blue-500 to-indigo-600",
      description: "شبکه اجتماعی رسمی"
    },
    {
      name: "توییتر",
      url: "https://x.com/@ARMIN_SOFT",
      icon: SiX,
      color: "from-gray-600 to-gray-800",
      description: "اخبار کوتاه و به‌روزرسانی"
    },
    {
      name: "گیت‌هاب",
      url: "https://github.com/ARMIN-SOFT",
      icon: Github,
      color: "from-gray-700 to-gray-900",
      description: "کدهای منبع باز و پروژه‌ها"
    },
    {
      name: "یوتیوب",
      url: "https://www.youtube.com/@ARMIN_SOFT",
      icon: SiYoutube,
      color: "from-red-500 to-red-600",
      description: "ویدیوهای آموزشی و معرفی"
    },
    {
      name: "آپارات",
      url: "https://www.aparat.com/ARMIN_SOFT",
      icon: SiAparat,
      color: "from-orange-500 to-amber-600",
      description: "محتوای ویدیویی فارسی"
    },
    {
      name: "وبسایت رسمی",
      url: "https://armin-soft.ir/",
      icon: Globe,
      color: "from-violet-500 to-purple-600",
      description: "پورتفولیو و خدمات کامل"
    }
  ];

  return (
    <PageContainer withBackground fullHeight className="w-full">
      <DashboardLayoutNew>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="relative inline-block">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500 rounded-2xl opacity-20 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl p-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="relative">
                    <Info className="w-12 h-12 text-emerald-600" />
                    <Sparkles className="w-6 h-6 text-sky-500 absolute -top-1 -right-1" />
                  </div>
                  <div className="text-right">
                    <h1 className="text-4xl font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                      درباره پروژه
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      سیستم جامع مدیریت باشگاه و تناسب اندام
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Info Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-white/50 dark:border-gray-700/50 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                      <Code className="w-6 h-6 text-emerald-600" />
                      اطلاعات پروژه
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20 rounded-xl">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">نام پروژه:</span>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                          فیت مستر
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-l from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">نسخه فعلی:</span>
                        <Badge variant="secondary" className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400">
                          {version}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-l from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">وضعیت:</span>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                          آماده استفاده
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">توضیحات</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      فیت مستر یک برنامه جامع و هوشمند برای بدنسازان و علاقه‌مندان تناسب اندام است که 
                      ترکیبی از برنامه تمرینی تخصصی، رژیم غذایی علمی، مکمل‌ها و ویتامین‌ها را زیر نظر 
                      مربی حرفه‌ای ارائه می‌دهد. این سیستم با استفاده از جدیدترین تکنولوژی‌های وب 
                      و طراحی مدرن، تجربه‌ای بی‌نظیر از مدیریت باشگاه و پیگیری پیشرفت شاگردان فراهم می‌کند.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Features Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-white/50 dark:border-gray-700/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-emerald-600" />
                امکانات و قابلیت‌های پروژه
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl p-6 h-full hover:shadow-xl transition-all duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-4`}>
                          <feature.icon className="w-6 h-6" />
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Developer Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-white/50 dark:border-gray-700/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <Users className="w-6 h-6 text-emerald-600" />
                درباره توسعه‌دهنده
              </h2>
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-sky-600 text-white text-2xl font-bold mb-4">
                  آ
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">آرمین سافت</h3>
                <p className="text-gray-600 dark:text-gray-400">توسعه‌دهنده نرم‌افزار و طراح رابط کاربری</p>
              </div>

              <Separator className="my-8" />

              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  راه‌های ارتباط
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="group block"
                    >
                      <div className="relative overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl p-4 text-center hover:shadow-xl transition-all duration-500">
                        <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        
                        <div className="relative z-10">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${link.color} text-white mb-3 mx-auto`}>
                            <link.icon className="w-6 h-6" />
                          </div>
                          
                          <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                            {link.name}
                          </h5>
                          
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                            {link.description}
                          </p>
                          
                          <ExternalLink className="w-3 h-3 text-gray-400 mx-auto mt-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </DashboardLayoutNew>
    </PageContainer>
  );
};

export default AboutPage;