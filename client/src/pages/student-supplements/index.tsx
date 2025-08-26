import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  Pill, 
  Clock, 
  Timer,
  Bell,
  CheckCircle2,
  Target,
  Calendar,
  Zap,
  Shield,
  Heart,
  Dumbbell,
  Apple,
  AlertCircle,
  Award,
  TrendingUp,
  Star,
  AlarmClock,
  Droplets
} from "lucide-react";

// Supplement types with modern styling
const SUPPLEMENT_TYPES = [
  { 
    id: 'protein', 
    name: 'پروتئین', 
    icon: Dumbbell, 
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-700 dark:text-emerald-300'
  },
  { 
    id: 'vitamin', 
    name: 'ویتامین', 
    icon: Apple, 
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-700 dark:text-orange-300'
  },
  { 
    id: 'mineral', 
    name: 'مواد معدنی', 
    icon: Shield, 
    color: 'from-sky-500 to-cyan-600',
    bgColor: 'bg-sky-50 dark:bg-sky-900/20',
    borderColor: 'border-sky-200 dark:border-sky-800',
    textColor: 'text-sky-700 dark:text-sky-300'
  },
  { 
    id: 'energy', 
    name: 'انرژی‌زا', 
    icon: Zap, 
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-700 dark:text-orange-300'
  },
  { 
    id: 'health', 
    name: 'سلامت عمومی', 
    icon: Heart, 
    color: 'from-emerald-500 to-sky-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-700 dark:text-emerald-300'
  }
];

// Time periods for supplements
const TIME_PERIODS = [
  { id: 'morning', name: 'صبح', icon: '🌅', time: '08:00' },
  { id: 'noon', name: 'ظهر', icon: '☀️', time: '12:00' },
  { id: 'evening', name: 'عصر', icon: '🌇', time: '17:00' },
  { id: 'night', name: 'شب', icon: '🌙', time: '21:00' }
];

// Reminder component
const SupplementReminder: React.FC<{ supplement: any; onTake: () => void; onSkip: () => void }> = ({ 
  supplement, 
  onTake, 
  onSkip 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
  >
    <Card className="w-full max-w-md">
      <CardContent className="text-center p-8">
        <Bell className="w-16 h-16 text-blue-600 mx-auto mb-6 animate-pulse" />
        <h3 className="text-xl font-bold mb-2">یادآوری مکمل</h3>
        <p className="text-muted-foreground mb-6">
          زمان مصرف {supplement.supplementName || supplement.name} فرا رسیده
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onSkip} className="flex-1">
            بعداً
          </Button>
          <Button onClick={onTake} className="flex-1">
            <CheckCircle2 className="w-4 h-4 ml-2" />
            مصرف شد
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const StudentSupplements = () => {
  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(null);
  const [takenSupplements, setTakenSupplements] = useState<Record<number, boolean>>({});
  const [showReminder, setShowReminder] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const deviceInfo = useDeviceInfo();

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Get current student data
  const { data: currentStudent, isLoading: isLoadingStudent } = useQuery<any>({
    queryKey: ['/api/current-student'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch student supplements
  const { data: studentSupplements = [], isLoading: isLoadingSupplements } = useQuery<any[]>({
    queryKey: [`/api/students/${currentStudent?.id}/supplements`],
    enabled: !!currentStudent?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Group supplements by type
  const supplementsByType = SUPPLEMENT_TYPES.map(type => {
    const supplements = studentSupplements.filter((supp: any) => 
      supp.type === type.id || 
      supp.category === type.id ||
      (supp.supplementName && supp.supplementName.includes(type.name))
    );
    
    return {
      ...type,
      supplements,
      takenCount: supplements.filter((supp: any) => takenSupplements[supp.id]).length,
      totalCount: supplements.length
    };
  }).filter(type => type.supplements.length > 0);

  // Calculate progress
  const totalSupplements = studentSupplements.length;
  const takenCount = Object.values(takenSupplements).filter(Boolean).length;
  const progressPercentage = totalSupplements > 0 ? (takenCount / totalSupplements) * 100 : 0;

  // Get today's schedule
  const todaySchedule = studentSupplements.map((supp: any) => ({
    ...supp,
    isTaken: takenSupplements[supp.id] || false,
    scheduledTime: supp.timing || supp.time || '08:00'
  })).sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

  // Handle supplement taken
  const handleSupplementTaken = (supplementId: number) => {
    setTakenSupplements(prev => ({
      ...prev,
      [supplementId]: true
    }));
    setShowReminder(null);
  };

  // Handle skip supplement
  const handleSkipSupplement = () => {
    setShowReminder(null);
  };

  // Get supplement type styling
  const getSupplementTypeStyle = (supplement: any) => {
    const type = SUPPLEMENT_TYPES.find(t => 
      t.id === supplement.type || 
      t.id === supplement.category ||
      (supplement.supplementName && supplement.supplementName.includes(t.name))
    ) || SUPPLEMENT_TYPES[0];
    return type;
  };

  // Responsive classes
  const containerPadding = deviceInfo.isMobile ? "p-4" : deviceInfo.isTablet ? "p-6" : "p-8";
  const cardPadding = deviceInfo.isMobile ? "p-4" : deviceInfo.isTablet ? "p-5" : "p-6";
  const gridCols = deviceInfo.isMobile ? "grid-cols-1" : deviceInfo.isTablet ? "grid-cols-2" : "grid-cols-3";

  if (isLoadingStudent || isLoadingSupplements) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", containerPadding)} dir="rtl">
        <Card className={cn("text-center max-w-md w-full", cardPadding)}>
          <CardContent>
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">در حال بارگذاری مکمل‌ها...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className={cn("min-h-screen flex items-center justify-center", containerPadding)} dir="rtl">
        <Card className={cn("text-center max-w-md w-full", cardPadding)}>
          <CardContent>
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">خطا در دریافت اطلاعات</h3>
            <p className="text-gray-600">اطلاعات شاگرد یافت نشد.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800", containerPadding)} dir="rtl">
      {/* Reminder Modal */}
      {showReminder && (
        <SupplementReminder
          supplement={showReminder}
          onTake={() => handleSupplementTaken(showReminder.id)}
          onSkip={handleSkipSupplement}
        />
      )}

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              مکمل‌ها و ویتامین‌ها
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              امروز - {toPersianNumbers(totalSupplements)} مکمل برنامه‌ریزی شده
            </p>
          </div>
          <div className="text-left">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              {toPersianNumbers(Math.round(progressPercentage))}%
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">پیشرفت امروز</p>
          </div>
        </div>

        {/* Progress Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Progress Card */}
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0">
            <CardContent className={cardPadding}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-semibold">پیشرفت مصرف</h3>
                    <p className="text-purple-100">
                      {toPersianNumbers(takenCount)} از {toPersianNumbers(totalSupplements)} مکمل مصرف شده
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{toPersianNumbers(takenCount)}</div>
                  <div className="text-sm text-purple-100">مصرف شده</div>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-white/20" />
            </CardContent>
          </Card>

          {/* Time Status Card */}
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0">
            <CardContent className={cardPadding}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <AlarmClock className="w-8 h-8" />
                  <div>
                    <h3 className="text-lg font-semibold">زمان فعلی</h3>
                    <p className="text-blue-100">
                      وقت مصرف مکمل‌ها را به یاد داشته باشید
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {toPersianNumbers(currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }))}
                  </div>
                  <div className="text-sm text-blue-100">زمان فعلی</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Today's Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              برنامه امروز
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySchedule.length === 0 ? (
              <div className="text-center py-8">
                <Pill className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">مکملی برای امروز برنامه‌ریزی نشده</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todaySchedule.map((supplement: any, index: number) => {
                  const typeStyle = getSupplementTypeStyle(supplement);
                  const IconComponent = typeStyle.icon;
                  
                  return (
                    <div
                      key={supplement.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200",
                        supplement.isTaken 
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700"
                      )}
                      data-testid={`schedule-item-${supplement.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
                          `bg-gradient-to-br ${typeStyle.color}`
                        )}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-lg">
                            {supplement.supplementName || supplement.name || `مکمل ${index + 1}`}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{toPersianNumbers(supplement.scheduledTime)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Droplets className="w-4 h-4" />
                              <span>{toPersianNumbers(supplement.dosage || supplement.amount || 1)} {supplement.unit || 'عدد'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {supplement.isTaken ? (
                          <>
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                              مصرف شده
                            </Badge>
                          </>
                        ) : (
                          <Button
                            onClick={() => handleSupplementTaken(supplement.id)}
                            data-testid={`button-take-supplement-${supplement.id}`}
                          >
                            <CheckCircle2 className="w-4 h-4 ml-2" />
                            مصرف کردم
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Supplements by Category */}
      {supplementsByType.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={cn("grid gap-6", gridCols)}
        >
          {supplementsByType.map((type, typeIndex) => {
            const IconComponent = type.icon;
            
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: typeIndex * 0.1 }}
              >
                <Card className={cn(
                  "transition-all duration-300 hover:shadow-lg border-2",
                  type.borderColor
                )}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
                          `bg-gradient-to-br ${type.color}`
                        )}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold">
                            {type.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {toPersianNumbers(type.takenCount)} از {toPersianNumbers(type.totalCount)} مصرف شده
                          </p>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className={cn("text-2xl font-bold", type.textColor)}>
                          {toPersianNumbers(type.totalCount)}
                        </div>
                        <div className="text-sm text-muted-foreground">مکمل</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <Progress 
                      value={type.totalCount > 0 ? (type.takenCount / type.totalCount) * 100 : 0} 
                      className="h-2"
                    />
                    
                    <div className="space-y-2">
                      {type.supplements.slice(0, 3).map((supplement: any) => (
                        <div
                          key={supplement.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-slate-700 dark:text-slate-300">
                            {supplement.supplementName || supplement.name}
                          </span>
                          {takenSupplements[supplement.id] && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      ))}
                      {type.supplements.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center pt-2">
                          و {toPersianNumbers(type.supplements.length - 3)} مکمل دیگر...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Daily Summary */}
      {studentSupplements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                خلاصه مصرف امروز
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {toPersianNumbers(takenCount)}
                  </div>
                  <div className="text-sm text-muted-foreground">مصرف شده</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {toPersianNumbers(totalSupplements - takenCount)}
                  </div>
                  <div className="text-sm text-muted-foreground">باقی‌مانده</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {toPersianNumbers(Math.round(progressPercentage))}%
                  </div>
                  <div className="text-sm text-muted-foreground">پیشرفت</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {toPersianNumbers(supplementsByType.length)}
                  </div>
                  <div className="text-sm text-muted-foreground">دسته‌بندی</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default StudentSupplements;