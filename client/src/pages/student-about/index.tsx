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
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useAppVersionContext } from '@/contexts/AppVersionContext';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const StudentAboutPage = () => {
  useDocumentTitle('درباره پروژه');
  const { version } = useAppVersionContext();
  const deviceInfo = useDeviceInfo();

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
      icon: Dumbbell,
      title: "برنامه تمرینی شخصی",
      description: "دسترسی به برنامه تمرینی اختصاصی طراحی‌شده توسط مربی",
      gradient: "from-orange-500 to-amber-600"
    },
    {
      icon: UtensilsCrossed,
      title: "رژیم غذایی علمی",
      description: "برنامه تغذیه کاملاً شخصی‌سازی شده بر اساس نیاز بدن",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Pill,
      title: "مکمل‌های تجویزی",
      description: "لیست کامل مکمل‌ها و ویتامین‌های پیشنهادی",
      gradient: "from-sky-500 to-sky-600"
    },
    {
      icon: BarChart3,
      title: "پیگیری پیشرفت",
      description: "نمودارها و آمار دقیق از روند پیشرفت شما",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: MessageSquare,
      title: "ارتباط با مربی",
      description: "امکان ارسال پیام و دریافت مشاوره از مربی",
      gradient: "from-emerald-500 to-sky-600"
    },
    {
      icon: Target,
      title: "هدف‌گذاری هوشمند",
      description: "تعریف اهداف و پیگیری میزان دستیابی به آن‌ها",
      gradient: "from-sky-500 to-sky-600"
    },
    {
      icon: Activity,
      title: "رصد فعالیت روزانه",
      description: "ثبت و بررسی فعالیت‌های ورزشی و تغذیه‌ای",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "امنیت اطلاعات",
      description: "حفاظت کامل از اطلاعات شخصی و حریم خصوصی",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Zap,
      title: "عملکرد سریع",
      description: "دسترسی آنی و سریع به تمام بخش‌های برنامه",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Globe,
      title: "پشتیبانی کامل فارسی",
      description: "طراحی ویژه برای کاربران فارسی‌زبان",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Star,
      title: "تجربه کاربری عالی",
      description: "رابط کاربری زیبا، مدرن و آسان",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: Sparkles,
      title: "بروزرسانی مداوم",
      description: "اضافه شدن امکانات جدید و بهبود مستمر",
      gradient: "from-emerald-500 to-teal-600"
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

  // Responsive padding classes
  const containerPadding = deviceInfo.isMobile ? "p-4" : deviceInfo.isTablet ? "p-6" : "p-8";
  const cardPadding = deviceInfo.isMobile ? "p-4" : deviceInfo.isTablet ? "p-6" : "p-8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40", containerPadding)}
      dir="rtl"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-6 lg:space-y-8"
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
            <div className={cn("relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl", cardPadding)}>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="relative">
                  <Info className={cn("text-emerald-600", deviceInfo.isMobile ? "w-8 h-8" : "w-12 h-12")} />
                  <Sparkles className={cn("text-sky-500 absolute -top-1 -right-1", deviceInfo.isMobile ? "w-4 h-4" : "w-6 h-6")} />
                </div>
                <div className="text-right">
                  <h1 className={cn("font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent", 
                    deviceInfo.isMobile ? "text-2xl" : deviceInfo.isTablet ? "text-3xl" : "text-4xl")}>
                    درباره فیت مستر
                  </h1>
                  <p className={cn("text-gray-600 dark:text-gray-400", deviceInfo.isMobile ? "text-base" : "text-lg")}>
                    دستیار هوشمند تناسب اندام شما
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Info Section */}
        <motion.div variants={itemVariants}>
          <Card className={cn("bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-white/50 dark:border-gray-700/50", cardPadding)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <h2 className={cn("font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3", 
                    deviceInfo.isMobile ? "text-xl" : "text-2xl")}>
                    <Code className={cn("text-emerald-600", deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6")} />
                    اطلاعات برنامه
                  </h2>
                  <div className="space-y-3 lg:space-y-4">
                    <div className={cn("flex items-center justify-between bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20 rounded-xl", 
                      deviceInfo.isMobile ? "p-3" : "p-4")}>
                      <span className={cn("text-gray-700 dark:text-gray-300 font-medium", deviceInfo.isMobile ? "text-sm" : "text-base")}>نام برنامه:</span>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                        فیت مستر
                      </Badge>
                    </div>
                    <div className={cn("flex items-center justify-between bg-gradient-to-l from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-xl", 
                      deviceInfo.isMobile ? "p-3" : "p-4")}>
                      <span className={cn("text-gray-700 dark:text-gray-300 font-medium", deviceInfo.isMobile ? "text-sm" : "text-base")}>نسخه فعلی:</span>
                      <Badge variant="secondary" className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400">
                        {version}
                      </Badge>
                    </div>
                    <div className={cn("flex items-center justify-between bg-gradient-to-l from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl", 
                      deviceInfo.isMobile ? "p-3" : "p-4")}>
                      <span className={cn("text-gray-700 dark:text-gray-300 font-medium", deviceInfo.isMobile ? "text-sm" : "text-base")}>وضعیت:</span>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                        آماده استفاده
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <h3 className={cn("font-bold text-gray-900 dark:text-white mb-4", deviceInfo.isMobile ? "text-lg" : "text-xl")}>توضیحات</h3>
                  <p className={cn("text-gray-600 dark:text-gray-400 leading-relaxed", deviceInfo.isMobile ? "text-sm" : "text-base")}>
                    فیت مستر دستیار هوشمند شما در مسیر دستیابی به تناسب اندام ایده‌آل است. 
                    با این برنامه می‌توانید برنامه تمرینی شخصی، رژیم غذایی علمی و مکمل‌های مورد نیاز 
                    خود را مشاهده و پیگیری کنید. تمام این امکانات تحت نظارت مربی حرفه‌ای شما قرار دارد.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Features Section */}
        <motion.div variants={itemVariants}>
          <Card className={cn("bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-white/50 dark:border-gray-700/50", cardPadding)}>
            <h2 className={cn("font-bold text-gray-900 dark:text-white mb-6 lg:mb-8 flex items-center gap-3", 
              deviceInfo.isMobile ? "text-xl" : "text-2xl")}>
              <Sparkles className={cn("text-emerald-600", deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6")} />
              امکانات پنل شاگرد
            </h2>
            <div className={cn("grid gap-4 lg:gap-6", 
              deviceInfo.isMobile ? "grid-cols-1" : deviceInfo.isTablet ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className={cn("relative overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl h-full hover:shadow-xl transition-all duration-500", 
                    deviceInfo.isMobile ? "p-4" : "p-6")}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className={cn(`inline-flex items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-3 lg:mb-4`, 
                        deviceInfo.isMobile ? "w-10 h-10" : "w-12 h-12")}>
                        <feature.icon className={cn(deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6")} />
                      </div>
                      
                      <h3 className={cn("font-bold text-gray-900 dark:text-white mb-2", deviceInfo.isMobile ? "text-base" : "text-lg")}>
                        {feature.title}
                      </h3>
                      
                      <p className={cn("text-gray-600 dark:text-gray-400 leading-relaxed flex-1", deviceInfo.isMobile ? "text-xs" : "text-sm")}>
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
          <Card className={cn("bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-white/50 dark:border-gray-700/50", cardPadding)}>
            <h2 className={cn("font-bold text-gray-900 dark:text-white mb-6 lg:mb-8 flex items-center gap-3", 
              deviceInfo.isMobile ? "text-xl" : "text-2xl")}>
              <Users className={cn("text-emerald-600", deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6")} />
              درباره توسعه‌دهنده
            </h2>
            
            <div className="text-center mb-6 lg:mb-8">
              <div className={cn("inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-sky-600 text-white font-bold mb-4", 
                deviceInfo.isMobile ? "w-16 h-16 text-xl" : "w-20 h-20 text-2xl")}>
                آ
              </div>
              <h3 className={cn("font-bold text-gray-900 dark:text-white mb-2", deviceInfo.isMobile ? "text-xl" : "text-2xl")}>آرمین سافت</h3>
              <p className={cn("text-gray-600 dark:text-gray-400", deviceInfo.isMobile ? "text-sm" : "text-base")}>توسعه‌دهنده نرم‌افزار و طراح رابط کاربری</p>
            </div>

            <Separator className="my-6 lg:my-8" />

            <div>
              <h4 className={cn("font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 text-center", 
                deviceInfo.isMobile ? "text-lg" : "text-xl")}>
                راه‌های ارتباط
              </h4>
              <div className={cn("grid gap-3 lg:gap-4", 
                deviceInfo.isMobile ? "grid-cols-1 sm:grid-cols-2" : deviceInfo.isTablet ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-5")}>
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
                    <div className={cn("relative overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl text-center hover:shadow-xl transition-all duration-500", 
                      deviceInfo.isMobile ? "p-3" : "p-4")}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      <div className="relative z-10">
                        <div className={cn(`inline-flex items-center justify-center rounded-xl bg-gradient-to-r ${link.color} text-white mb-2 lg:mb-3 mx-auto`, 
                          deviceInfo.isMobile ? "w-10 h-10" : "w-12 h-12")}>
                          <link.icon className={cn(deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6")} />
                        </div>
                        
                        <h5 className={cn("font-bold text-gray-900 dark:text-white mb-1", deviceInfo.isMobile ? "text-xs" : "text-sm")}>
                          {link.name}
                        </h5>
                        
                        <p className={cn("text-gray-600 dark:text-gray-400 leading-relaxed", deviceInfo.isMobile ? "text-xs" : "text-xs")}>
                          {link.description}
                        </p>
                        
                        <ExternalLink className={cn("text-gray-400 mx-auto mt-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors", 
                          deviceInfo.isMobile ? "w-3 h-3" : "w-3 h-3")} />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StudentAboutPage;