
import React, { useState, useMemo } from "react";
import { Student } from "../StudentTypes";
import { Card } from "@/components/ui/card";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Edit, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  Trash,
  TrendingUp,
  Activity,
  Sparkles,
  Clock,
  BarChart3
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "./utils/formatDate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface StudentHistoryProps {
  students: Student[];
  historyEntries: HistoryEntry[];
  onClearHistory?: () => void;
}

export const StudentHistory: React.FC<StudentHistoryProps> = ({ 
  students, 
  historyEntries,
  onClearHistory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<number | 'all'>('all');
  const [activeTab, setActiveTab] = useState('all');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Filter entries based on all criteria
  const filteredEntries = useMemo(() => {
    let filtered = [...historyEntries];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(entry => 
        (entry.studentName && entry.studentName.toLowerCase().includes(query)) || 
        (entry.description && entry.description.toLowerCase().includes(query))
      );
    }
    
    if (timeRange !== 'all') {
      const now = Date.now();
      const dayInMs = 24 * 60 * 60 * 1000;
      
      if (timeRange === 'today') {
        filtered = filtered.filter(entry => {
          const entryDate = new Date(entry.timestamp);
          return new Date(now).toDateString() === entryDate.toDateString();
        });
      } else if (timeRange === 'week') {
        filtered = filtered.filter(entry => (now - entry.timestamp) <= 7 * dayInMs);
      } else if (timeRange === 'month') {
        filtered = filtered.filter(entry => (now - entry.timestamp) <= 30 * dayInMs);
      }
    }
    
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(entry => entry.studentId === selectedStudent);
    }
    
    if (activeTab !== 'all') {
      const tabTypeMap: Record<string, 'edit' | 'exercise' | 'diet' | 'supplement'> = {
        'edits': 'edit',
        'exercises': 'exercise',
        'diets': 'diet',
        'supplements': 'supplement'
      };
      filtered = filtered.filter(entry => entry.type === tabTypeMap[activeTab]);
    }
    
    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }, [historyEntries, searchQuery, timeRange, selectedStudent, activeTab]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'edit':
        return <Edit className="h-4 w-4 text-emerald-500" />;
      case 'exercise':
        return <Dumbbell className="h-4 w-4 text-sky-500" />;
      case 'diet':
        return <UtensilsCrossed className="h-4 w-4 text-emerald-500" />;
      case 'supplement':
        return <Pill className="h-4 w-4 text-sky-500" />;
      case 'delete':
        return <Trash className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'edit':
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
            ویرایش اطلاعات
          </Badge>
        );
      case 'exercise':
        return (
          <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800">
            برنامه تمرینی
          </Badge>
        );
      case 'diet':
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
            رژیم غذایی
          </Badge>
        );
      case 'supplement':
        return (
          <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800">
            مکمل و ویتامین
          </Badge>
        );
      case 'delete':
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:text-destructive dark:border-destructive/30">
            حذف شاگرد
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/50 dark:text-gray-300 dark:border-gray-800">
            سایر
          </Badge>
        );
    }
  };

  const handleClearHistory = () => {
    if (onClearHistory) {
      onClearHistory();
    }
    setIsAlertOpen(false);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setTimeRange('all');
    setSelectedStudent('all');
  };

  const renderHistoryCard = (entry: HistoryEntry) => (
    <motion.div
      key={entry.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative mb-4"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/20 dark:from-slate-800/60 dark:via-slate-800/40 dark:to-slate-800/20 backdrop-blur-xl rounded-2xl" />
      
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-transparent to-sky-500/20 p-[1px]">
        <div className="h-full w-full rounded-2xl bg-white/40 dark:bg-slate-900/40" />
      </div>
      
      <div className="relative p-6 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 rounded-xl blur-sm" />
            <div className="relative bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-700/80 dark:to-slate-700/60 p-3 rounded-xl border border-white/20 dark:border-slate-600/20">
              {getActionIcon(entry.type)}
            </div>
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 ring-2 ring-white/50 dark:ring-slate-700/50">
                  <AvatarImage src={entry.studentImage} alt={entry.studentName} />
                  <AvatarFallback className="text-sm bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                    {entry.studentName && entry.studentName.length > 0 ? entry.studentName.charAt(0) : 'ش'}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h4 className="font-bold text-foreground">{entry.studentName || 'نام شاگرد نامشخص'}</h4>
                  {getActionBadge(entry.type)}
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-slate-100/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 rounded-full border border-slate-200/50 dark:border-slate-600/50">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground" style={{ direction: 'rtl' }}>
                  {formatDate(entry.timestamp)}
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-slate-50/80 to-slate-100/40 dark:from-slate-800/40 dark:to-slate-700/20 rounded-xl p-4 border border-slate-200/30 dark:border-slate-600/20">
              <p className="text-sm text-foreground/80 leading-relaxed font-medium" style={{ direction: 'rtl', textAlign: 'right' }}>
                {entry.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-sky-500/20 rounded-full blur-2xl scale-150" />
        <div className="relative w-24 h-24 bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 rounded-full flex items-center justify-center border border-white/20 dark:border-slate-700/20 backdrop-blur-xl">
          <History className="h-12 w-12 text-emerald-500" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-4">
        {historyEntries.length === 0 ? 'تاریخچه‌ای موجود نیست' : 'نتیجه‌ای یافت نشد'}
      </h3>
      
      <p className="text-muted-foreground mb-8 max-w-md">
        {historyEntries.length === 0 
          ? 'هنوز هیچ فعالیتی برای شاگردان ثبت نشده است. با ویرایش اطلاعات شاگردان، تاریخچه آنها در اینجا نمایش داده می‌شود.'
          : 'هیچ فعالیتی با فیلترهای انتخاب شده یافت نشد. لطفاً فیلترهای خود را تغییر دهید.'
        }
      </p>
      
      {historyEntries.length > 0 && (
        <Button onClick={clearFilters} variant="outline">
          پاک کردن فیلترها
        </Button>
      )}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full min-h-full flex flex-col"
    >
      <Card className="w-full flex-1 relative overflow-hidden border-0 shadow-2xl shadow-emerald-500/5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/85 backdrop-blur-xl" />
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-sky-500/10 to-transparent rounded-full blur-3xl translate-y-32 -translate-x-32" />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="p-6 md:p-8 flex-shrink-0">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 rounded-2xl blur-sm" />
                  <div className="relative bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-4 rounded-2xl border border-emerald-500/20">
                    <History className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-700 dark:from-emerald-400 dark:via-sky-400 dark:to-emerald-500 bg-clip-text text-transparent">
                    تاریخچه فعالیت‌ها
                  </h1>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                      <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300" style={{ direction: 'rtl' }}>
                        {toPersianNumbers(filteredEntries.length)} فعالیت
                      </span>
                    </div>
                    
                    {historyEntries.length > 0 && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-100 dark:bg-sky-900/20 rounded-full border border-sky-200 dark:border-sky-800">
                        <TrendingUp className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                        <span className="text-sm font-medium text-sky-700 dark:text-sky-300">
                          فعال
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="lg"
                className={`
                  group relative overflow-hidden border-2 transition-all duration-300
                  ${historyEntries.length === 0 
                    ? 'border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'border-destructive/30 dark:border-destructive/40 text-destructive hover:border-destructive/50 dark:hover:border-destructive/60 hover:bg-destructive/10 dark:hover:bg-destructive/20'
                  }
                `}
                onClick={() => setIsAlertOpen(true)}
                disabled={historyEntries.length === 0}
              >
                <Trash className="h-5 w-5 ml-2" />
                پاک کردن تاریخچه
              </Button>
            </div>
            
            {/* Filters */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/40 dark:from-slate-800/40 dark:via-slate-800/60 dark:to-slate-800/40 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30" />
              
              <div className="relative p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Filter className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">فیلترها و جستجو</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="جستجو در تاریخچه..."
                      className="pr-12 h-12 bg-white/80 dark:bg-slate-900/80 border-2 border-transparent focus:border-emerald-500/30 rounded-xl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="h-12 bg-white/80 dark:bg-slate-900/80 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-sky-500" />
                        <SelectValue placeholder="بازه زمانی" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">تمام زمان‌ها</SelectItem>
                      <SelectItem value="today">امروز</SelectItem>
                      <SelectItem value="week">هفته اخیر</SelectItem>
                      <SelectItem value="month">ماه اخیر</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={selectedStudent === 'all' ? 'all' : selectedStudent.toString()} 
                    onValueChange={(value) => setSelectedStudent(value === 'all' ? 'all' : Number(value))}
                  >
                    <SelectTrigger className="h-12 bg-white/80 dark:bg-slate-900/80 rounded-xl">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-emerald-500" />
                        <SelectValue placeholder="همه شاگردان" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه شاگردان</SelectItem>
                      {students.map(student => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4 w-auto inline-flex bg-emerald-100/80 dark:bg-emerald-800/50 p-1 gap-1">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      <span>همه</span>
                      <Badge variant="outline" className="ml-1.5 bg-emerald-200/80 dark:bg-emerald-700/50 text-xs">
                        {toPersianNumbers(historyEntries.length)}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="edits" className="flex items-center gap-2">
                      <Edit className="h-4 w-4 text-emerald-500" />
                      <span>ویرایش</span>
                      <Badge variant="outline" className="ml-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">
                        {toPersianNumbers(historyEntries.filter(e => e.type === 'edit').length)}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="exercises" className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-sky-500" />
                      <span>تمرین</span>
                      <Badge variant="outline" className="ml-1.5 bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 text-xs">
                        {toPersianNumbers(historyEntries.filter(e => e.type === 'exercise').length)}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="diets" className="flex items-center gap-2">
                      <UtensilsCrossed className="h-4 w-4 text-emerald-500" />
                      <span>رژیم</span>
                      <Badge variant="outline" className="ml-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">
                        {toPersianNumbers(historyEntries.filter(e => e.type === 'diet').length)}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="supplements" className="flex items-center gap-2">
                      <Pill className="h-4 w-4 text-sky-500" />
                      <span>مکمل</span>
                      <Badge variant="outline" className="ml-1.5 bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 text-xs">
                        {toPersianNumbers(historyEntries.filter(e => e.type === 'supplement').length)}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-6">
                    <TabsContent value="all">
                      {filteredEntries.length > 0 ? (
                        <div className="space-y-4">
                          {filteredEntries.map(renderHistoryCard)}
                        </div>
                      ) : (
                        renderEmptyState()
                      )}
                    </TabsContent>

                    <TabsContent value="edits">
                      {filteredEntries.length > 0 ? (
                        <div className="space-y-4">
                          {filteredEntries.map(renderHistoryCard)}
                        </div>
                      ) : (
                        renderEmptyState()
                      )}
                    </TabsContent>
                    
                    <TabsContent value="exercises">
                      {filteredEntries.length > 0 ? (
                        <div className="space-y-4">
                          {filteredEntries.map(renderHistoryCard)}
                        </div>
                      ) : (
                        renderEmptyState()
                      )}
                    </TabsContent>
                    
                    <TabsContent value="diets">
                      {filteredEntries.length > 0 ? (
                        <div className="space-y-4">
                          {filteredEntries.map(renderHistoryCard)}
                        </div>
                      ) : (
                        renderEmptyState()
                      )}
                    </TabsContent>
                    
                    <TabsContent value="supplements">
                      {filteredEntries.length > 0 ? (
                        <div className="space-y-4">
                          {filteredEntries.map(renderHistoryCard)}
                        </div>
                      ) : (
                        renderEmptyState()
                      )}
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </ScrollArea>
          </div>
        </div>
      </Card>

      {/* Clear History Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا از پاک کردن تاریخچه مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              این عمل تمام تاریخچه فعالیت‌ها را پاک می‌کند و غیرقابل بازگشت است.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearHistory} className="bg-red-500 hover:bg-red-600">
              پاک کردن تاریخچه
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};
