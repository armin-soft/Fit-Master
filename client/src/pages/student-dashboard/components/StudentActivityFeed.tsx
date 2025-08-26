
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Apple, Pill, TrendingUp, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { useStudentData } from "../hooks/useStudentData";

const ActivityIcon = React.memo(({ type }: { type: string }) => {
  const icons = {
    workout: Dumbbell,
    meal: Apple,
    supplement: Pill,
    progress: TrendingUp
  };
  
  const Icon = icons[type as keyof typeof icons] || Clock;
  return <Icon className="w-5 h-5 text-white" />;
});

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed':
      return {
        icon: CheckCircle,
        label: 'تکمیل شده',
        color: 'bg-green-500',
        badgeVariant: 'default' as const
      };
    case 'pending':
      return {
        icon: AlertCircle,
        label: 'در انتظار',
        color: 'bg-yellow-500',
        badgeVariant: 'secondary' as const
      };
    case 'missed':
      return {
        icon: XCircle,
        label: 'از دست رفته',
        color: 'bg-destructive',
        badgeVariant: 'destructive' as const
      };
    default:
      return {
        icon: Clock,
        label: 'نامشخص',
        color: 'bg-gray-500',
        badgeVariant: 'secondary' as const
      };
  }
};

export const StudentActivityFeed: React.FC = () => {
  const { studentData, loading } = useStudentData();

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse flex items-start gap-4 p-4 rounded-xl bg-gray-100">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-lg h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <motion.div 
              className="p-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 shadow-lg"
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Clock className="w-6 h-6 text-white" />
            </motion.div>
            فعالیت‌های اخیر
          </CardTitle>
        </CardHeader>
        <CardContent>
          {studentData.recentActivities.length > 0 ? (
            <div className="space-y-4">
              {studentData.recentActivities.map((activity, index) => {
                const statusConfig = getStatusConfig(activity.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-white/50 to-white/30 dark:from-slate-800/50 dark:to-slate-800/30 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300"
                  >
                    {/* آیکون فعالیت */}
                    <motion.div 
                      className={`p-3 rounded-xl flex-shrink-0 shadow-lg ${
                        activity.type === 'workout' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                        activity.type === 'meal' ? 'bg-gradient-to-r from-sky-500 to-sky-600' :
                        activity.type === 'supplement' ? 'bg-gradient-to-r from-emerald-600 to-sky-600' : 
                        'bg-gradient-to-r from-sky-600 to-emerald-600'
                      }`}
                      whileHover={{ rotate: 8, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ActivityIcon type={activity.type} />
                    </motion.div>
                    
                    {/* محتوای فعالیت */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                          {activity.title}
                        </h4>
                        <Badge 
                          variant={statusConfig.badgeVariant}
                          className="text-xs flex-shrink-0 flex items-center gap-1"
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div 
              className="text-center py-12 text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">هنوز فعالیتی ثبت نشده</h3>
              <p className="text-sm">
                وقتی برنامه‌های خود را شروع کنید، فعالیت‌هایتان اینجا نمایش داده می‌شود
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
