import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, Send, Clock, 
  CheckCircle, AlertCircle, HelpCircle, User,
  Plus, Zap, Shield, Star,
  MessageSquare, Settings,
  Heart, Smile, ThumbsUp, FileText, Phone
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useAppName } from "@/contexts/AppNameContext";

interface ChatMessage {
  id: string;
  sender: 'student' | 'trainer';
  senderName: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
  reactions?: string[];
  studentId?: number;
}

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: number;
  lastUpdate: number;
  description: string;
  responses: number;
  studentId: number;
  studentName: string;
}

const StudentSupport = () => {
  const [newMessage, setNewMessage] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [activeView, setActiveView] = useState<'chat' | 'tickets' | 'create'>('chat');
  const deviceInfo = useDeviceInfo();
  const { appName } = useAppName();
  const queryClient = useQueryClient();

  const supportCategories = [
    { id: 'general', name: 'سوال عمومی', icon: HelpCircle, color: 'from-sky-500 to-sky-600' },
    { id: 'exercise', name: 'تمرینات', icon: Zap, color: 'from-emerald-500 to-emerald-600' },
    { id: 'diet', name: 'تغذیه', icon: Heart, color: 'from-orange-500 to-orange-600' },
    { id: 'supplements', name: 'مکمل‌ها', icon: Shield, color: 'from-emerald-500 to-sky-600' },
    { id: 'technical', name: 'مشکل فنی', icon: Settings, color: 'from-sky-500 to-emerald-600' }
  ];

  // Get current student data from API
  const { data: currentStudent, isLoading: isLoadingStudent } = useQuery<any>({
    queryKey: ['/api/current-student'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get trainer profile from API
  const { data: trainerProfile, isLoading: isLoadingTrainer } = useQuery<any>({
    queryKey: ['/api/trainer/profile'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get support messages from API
  const { data: messages = [], isLoading: isLoadingMessages } = useQuery<ChatMessage[]>({
    queryKey: [`/api/students/${currentStudent?.id}/support-messages`],
    enabled: !!currentStudent?.id,
    staleTime: 30 * 1000, // 30 seconds for real-time feel
  });

  // Get support tickets from API
  const { data: tickets = [], isLoading: isLoadingTickets } = useQuery<SupportTicket[]>({
    queryKey: [`/api/students/${currentStudent?.id}/support-tickets`],
    enabled: !!currentStudent?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const isLoading = isLoadingStudent || isLoadingTrainer || isLoadingMessages || isLoadingTickets;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <Card className="text-center max-w-md w-full">
          <CardContent className="p-8">
            <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">در حال بارگذاری پشتیبانی...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <Card className="text-center max-w-md w-full">
          <CardContent className="p-8">
            <AlertCircle className="mx-auto mb-4 text-amber-500 w-16 h-16" />
            <h2 className="text-xl font-bold mb-2">خطا در بارگذاری</h2>
            <p className="text-gray-600">اطلاعات شاگرد یافت نشد. لطفاً دوباره وارد شوید.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentStudent) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً پیام خود را وارد کنید"
      });
      return;
    }

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'student',
      senderName: currentStudent.name,
      message: newMessage,
      timestamp: Date.now(),
      isRead: true,
      type: 'text',
      studentId: currentStudent.id
    };

    // Save to all messages
    const allMessages = await getStorageItem('studentSupportMessages', []);
    const updatedAllMessages = [...allMessages, message];
    await setStorageItem('studentSupportMessages', updatedAllMessages);

    // Update local state
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setNewMessage('');

    // Send notification to management panel
    sendNotificationToManagement(message);

    toast({
      variant: "success",
      title: "پیام ارسال شد",
      description: "پیام شما با موفقیت ارسال شد"
    });
  };

  const handleCreateTicket = async () => {
    if (!newTicketSubject.trim() || !newTicketMessage.trim() || !currentStudent) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً تمام فیلدها را تکمیل کنید"
      });
      return;
    }

    const ticket: SupportTicket = {
      id: Date.now().toString(),
      subject: newTicketSubject,
      category: selectedCategory,
      status: 'open',
      priority: selectedPriority,
      createdAt: Date.now(),
      lastUpdate: Date.now(),
      description: newTicketMessage,
      responses: 0,
      studentId: currentStudent.id,
      studentName: currentStudent.name
    };

    // Save to all tickets
    const allTickets = await getStorageItem('studentSupportTickets', []);
    const updatedAllTickets = [...allTickets, ticket];
    await setStorageItem('studentSupportTickets', updatedAllTickets);

    // Update local state
    const updatedTickets = [...tickets, ticket];
    setTickets(updatedTickets);
    
    setNewTicketSubject('');
    setNewTicketMessage('');
    setActiveView('tickets');

    // Send notification to management panel
    sendTicketNotificationToManagement(ticket);

    toast({
      variant: "success",
      title: "تیکت ایجاد شد",
      description: "تیکت پشتیبانی شما با موفقیت ایجاد شد"
    });
  };

  const sendNotificationToManagement = async (message: ChatMessage) => {
    // Save notification for management panel
    const notifications = await getStorageItem('managementNotifications', []);
    const newNotification = {
      id: Date.now().toString(),
      type: 'support_message',
      title: 'پیام جدید از شاگرد',
      description: `${message.senderName}: ${message.message.substring(0, 50)}...`,
      timestamp: Date.now(),
      isRead: false,
      studentId: message.studentId,
      messageId: message.id
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    await setStorageItem('managementNotifications', updatedNotifications);
    
    // Trigger storage event for real-time updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'managementNotifications',
      newValue: JSON.stringify(updatedNotifications)
    }));
  };

  const sendTicketNotificationToManagement = async (ticket: SupportTicket) => {
    // Save notification for management panel
    const notifications = await getStorageItem('managementNotifications', []);
    const newNotification = {
      id: Date.now().toString(),
      type: 'support_ticket',
      title: 'تیکت جدید از شاگرد',
      description: `${ticket.studentName}: ${ticket.subject}`,
      timestamp: Date.now(),
      isRead: false,
      studentId: ticket.studentId,
      ticketId: ticket.id
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    await setStorageItem('managementNotifications', updatedNotifications);
    
    // Trigger storage event for real-time updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'managementNotifications',
      newValue: JSON.stringify(updatedNotifications)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-gradient-to-r from-primary to-primary/90';
      case 'in_progress': return 'bg-gradient-to-r from-sky-500 to-sky-600';
      case 'resolved': return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
      case 'closed': return 'bg-gradient-to-r from-muted-foreground to-muted-foreground/80';
      default: return 'bg-gradient-to-r from-muted-foreground to-muted-foreground/80';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'باز';
      case 'in_progress': return 'در حال بررسی';
      case 'resolved': return 'حل شده';
      case 'closed': return 'بسته شده';
      default: return 'نامشخص';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-gradient-to-r from-destructive to-destructive/80';
      case 'high': return 'bg-gradient-to-r from-primary to-destructive/90';
      case 'medium': return 'bg-gradient-to-r from-sky-500 to-sky-600';
      case 'low': return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
      default: return 'bg-gradient-to-r from-muted-foreground to-muted-foreground/80';
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'همین الان';
    } else if (diffInHours < 24) {
      return `${toPersianNumbers(Math.floor(diffInHours).toString())} ساعت پیش`;
    } else {
      return `${toPersianNumbers(Math.floor(diffInHours / 24).toString())} روز پیش`;
    }
  };

  const containerPadding = deviceInfo.isMobile ? "p-2" : deviceInfo.isTablet ? "p-4" : "p-6";

  if (!currentStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 flex items-center justify-center" dir="rtl">
        <Card className="p-8 text-center">
          <CardContent>
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">خطا در بارگذاری</h2>
            <p className="text-gray-600">اطلاعات شاگرد یافت نشد. لطفاً دوباره وارد شوید.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40", containerPadding)}
      dir="rtl"
    >
      {/* Modern Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-gradient-to-l from-emerald-500/10 via-sky-500/5 to-purple-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-l from-emerald-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">
                  پشتیبانی و ارتباط
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  ارتباط مستقیم با مربی و دریافت راهنمایی
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
      >
        {[
          { icon: MessageCircle, label: 'پیام‌های ارسالی', value: messages.length, gradient: 'from-emerald-500 to-primary' },
          { icon: HelpCircle, label: 'تیکت‌های فعال', value: tickets.filter(t => t.status !== 'closed').length, gradient: 'from-sky-500 to-primary' },
          { icon: CheckCircle, label: 'تیکت‌های حل‌شده', value: tickets.filter(t => t.status === 'resolved').length, gradient: 'from-violet-500 to-purple-500' },
          { icon: Star, label: 'امتیاز رضایت', value: '۰', suffix: '%', gradient: 'from-orange-500 to-amber-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br", stat.gradient, "flex items-center justify-center shadow-lg")}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {toPersianNumbers(stat.value.toString())}{stat.suffix || ''}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {[
          { id: 'chat', label: 'گفتگوی آنلاین', icon: MessageCircle },
          { id: 'tickets', label: 'تیکت‌های پشتیبانی', icon: HelpCircle },
          { id: 'create', label: 'ایجاد تیکت جدید', icon: Plus }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeView === tab.id ? "default" : "outline"}
            onClick={() => setActiveView(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
              activeView === tab.id 
                ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg" 
                : "border-gray-200 hover:bg-emerald-50 hover:border-emerald-200"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </Button>
        ))}
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeView === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-4 gap-6"
          >
            {/* Chat Area */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm h-[600px] flex flex-col">
                <CardHeader className="border-b bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        {trainerProfile?.image && trainerProfile.image !== "/Assets/Image/Place-Holder.svg" ? (
                          <AvatarImage src={trainerProfile.image} alt="مربی" />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-500 text-white font-bold">
                            {trainerProfile?.name ? trainerProfile.name.charAt(0) : 'م'}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {trainerProfile?.name || 'مربی'}
                        </h3>
                        {trainerProfile?.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            <span>{toPersianNumbers(trainerProfile.phone)}</span>
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground">آنلاین نیست</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">هنوز پیامی ارسال نشده است</p>
                        <p className="text-sm text-gray-400 mt-2">اولین پیام خود را ارسال کنید</p>
                      </div>
                    ) : (
                      messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className={cn("flex", message.sender === 'student' ? 'justify-end' : 'justify-start')}
                        >
                          <div className={cn(
                            "max-w-[75%] p-4 rounded-2xl shadow-sm",
                            message.sender === 'student'
                              ? 'bg-gradient-to-l from-emerald-500 to-sky-500 text-white rounded-br-md'
                              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border rounded-bl-md'
                          )}>
                            <p className="text-sm leading-relaxed">{message.message}</p>
                            <div className="flex items-center justify-between mt-2">
                              <p className={cn(
                                "text-xs",
                                message.sender === 'student' ? 'text-white/80' : 'text-muted-foreground'
                              )}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="flex gap-3">
                    <Input
                      placeholder="پیام خود را تایپ کنید..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white px-6"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Chat Sidebar */}
            <div className="space-y-6">
              {/* Trainer Info Card */}
              {trainerProfile && (
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader>
                    <h3 className="font-bold text-gray-900 dark:text-white">اطلاعات مربی</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-16 h-16">
                        {trainerProfile.image && trainerProfile.image !== "/Assets/Image/Place-Holder.svg" ? (
                          <AvatarImage src={trainerProfile.image} alt="مربی" />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-500 text-white font-bold text-lg">
                            {trainerProfile.name ? trainerProfile.name.charAt(0) : 'م'}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {trainerProfile.name || 'نام مربی'}
                        </h4>
                        {trainerProfile.phone && (
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {toPersianNumbers(trainerProfile.phone)}
                            </span>
                          </div>
                        )}
                        <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                          {appName}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Guide Card */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <h3 className="font-bold text-gray-900 dark:text-white">راهنمای سریع</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'برای پاسخ سریع‌تر، سوالات خود را واضح و مشخص بپرسید',
                    'در صورت فوریت، از تیکت با اولویت بالا استفاده کنید',
                    'پیام‌های شما مستقیماً به مربی ارسال می‌شود'
                  ].map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{toPersianNumbers((index + 1).toString())}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeView === 'tickets' && (
          <motion.div
            key="tickets"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tickets.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">هیچ تیکتی یافت نشد</h3>
                <p className="text-gray-500 mb-6">شما هنوز هیچ تیکت پشتیبانی ایجاد نکرده‌اید</p>
                <Button 
                  onClick={() => setActiveView('create')}
                  className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  ایجاد اولین تیکت
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {tickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{ticket.subject}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className={cn("text-white text-xs px-2 py-1", getStatusColor(ticket.status))}>
                                {getStatusText(ticket.status)}
                              </Badge>
                              <Badge className={cn("text-white text-xs px-2 py-1", getPriorityColor(ticket.priority))}>
                                {ticket.priority === 'urgent' ? 'فوری' : 
                                 ticket.priority === 'high' ? 'بالا' :
                                 ticket.priority === 'medium' ? 'متوسط' : 'پایین'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {ticket.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>ایجاد: {formatTime(ticket.createdAt)}</span>
                          <span>{toPersianNumbers(ticket.responses.toString())} پاسخ</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeView === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">ایجاد تیکت جدید</h3>
                  <p className="text-sm text-muted-foreground">سوال یا مشکل خود را با جزئیات کامل شرح دهید</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">دسته‌بندی</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {supportCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category.id)}
                            className={cn(
                              "h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300",
                              selectedCategory === category.id 
                                ? `bg-gradient-to-br ${category.color} text-white shadow-lg` 
                                : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            )}
                          >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs font-medium text-center leading-tight">{category.name}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">اولویت</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { value: 'low', label: 'پایین', color: 'from-emerald-500 to-teal-500' },
                        { value: 'medium', label: 'متوسط', color: 'from-blue-500 to-cyan-500' },
                        { value: 'high', label: 'بالا', color: 'from-primary to-destructive' },
                        { value: 'urgent', label: 'فوری', color: 'from-destructive to-destructive/80' }
                      ].map((priority) => (
                        <Button
                          key={priority.value}
                          variant={selectedPriority === priority.value ? "default" : "outline"}
                          onClick={() => setSelectedPriority(priority.value as any)}
                          className={cn(
                            "transition-all duration-300",
                            selectedPriority === priority.value 
                              ? `bg-gradient-to-r ${priority.color} text-white shadow-lg` 
                              : "border-gray-200 hover:bg-gray-50"
                          )}
                        >
                          {priority.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">موضوع</label>
                    <Input
                      placeholder="موضوع تیکت را به‌طور خلاصه بنویسید..."
                      value={newTicketSubject}
                      onChange={(e) => setNewTicketSubject(e.target.value)}
                      className="border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">توضیحات کامل</label>
                    <Textarea
                      placeholder="مشکل یا سوال خود را با جزئیات کامل شرح دهید..."
                      value={newTicketMessage}
                      onChange={(e) => setNewTicketMessage(e.target.value)}
                      rows={6}
                      className="border-gray-200 focus:border-emerald-300 focus:ring-emerald-200 resize-none"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      onClick={handleCreateTicket}
                      disabled={!newTicketSubject.trim() || !newTicketMessage.trim()}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white py-3"
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      ایجاد تیکت
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setNewTicketSubject('');
                        setNewTicketMessage('');
                        setSelectedCategory('general');
                        setSelectedPriority('medium');
                      }}
                      className="border-gray-200 hover:bg-gray-50"
                    >
                      پاک کردن فرم
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentSupport;
