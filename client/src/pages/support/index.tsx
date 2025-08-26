import React, { useState, useMemo, useEffect } from "react";
import { SupportHeader } from "./components/SupportHeader";
import { TicketStats } from "./components/TicketStats";
import { TicketFilters } from "./components/TicketFilters";
import { TicketCard } from "./components/TicketCard";
import { EmptyState } from "./components/EmptyState";
import { TicketFilter, TicketSort } from "./types";
import { useTicketData } from "./hooks/useTicketData";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
// Removed localStorage dependency - now using database APIs directly
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, MessageCircle, User, Clock, RefreshCw } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { toast } from "@/hooks/use-toast";

interface StudentMessage {
  id: string;
  sender: 'student' | 'trainer';
  senderName: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
  studentId?: number;
}

interface Notification {
  id: string;
  type: 'support_message' | 'support_ticket';
  title: string;
  description: string;
  timestamp: number;
  isRead: boolean;
  studentId: number;
  messageId?: string;
  ticketId?: string;
}

export default function SupportPage() {
  const [filter, setFilter] = useState<TicketFilter>("all");
  const [sortBy, setSortBy] = useState<TicketSort>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [studentMessages, setStudentMessages] = useState<StudentMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'tickets' | 'messages' | 'notifications'>('tickets');
  const deviceInfo = useDeviceInfo();
  
  const { 
    tickets, 
    loading, 
    updateTicketStatus, 
    addTicketResponse,
    deleteTicket,
    getTicketStats,
    getStudentInfo,
    refreshTickets
  } = useTicketData();

  const getStudentName = (studentId: number) => {
    const student = getStudentInfo(studentId);
    return student?.name || `شاگرد ${studentId}`;
  };

  useEffect(() => {
    console.log('Support page loaded, loading data from database...');
    loadNotifications();
    loadStudentMessages();
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await fetch('/api/support/messages');
      if (response.ok) {
        const messages = await response.json();
        const notifications: Notification[] = messages
          .filter((msg: any) => !msg.isRead)
          .map((msg: any) => ({
            id: `notif-${msg.id}`,
            type: 'support_message' as const,
            title: 'پیام جدید از شاگرد',
            description: msg.message.substring(0, 50) + '...',
            timestamp: new Date(msg.createdAt).getTime(),
            isRead: false,
            studentId: msg.studentId,
            messageId: msg.id
          }));
        console.log('Loaded notifications from database:', notifications);
        setNotifications(notifications);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
      setNotifications([]);
    }
  };

  const loadStudentMessages = async () => {
    try {
      const response = await fetch('/api/support/messages');
      if (response.ok) {
        const messages = await response.json();
        const studentMessages: StudentMessage[] = messages
          .filter((msg: any) => msg.sender === 'student')
          .map((msg: any) => ({
            id: msg.id.toString(),
            sender: msg.sender,
            senderName: getStudentName(msg.studentId),
            message: msg.message,
            timestamp: new Date(msg.createdAt).getTime(),
            isRead: msg.isRead,
            type: 'text' as const,
            studentId: msg.studentId
          }));
        console.log('Loaded student messages from database:', studentMessages);
        setStudentMessages(studentMessages);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
      setStudentMessages([]);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification?.messageId) {
      try {
        await fetch('/api/support/messages/mark-read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId: notification.studentId })
        });
      } catch (error) {
        console.error('Failed to mark message as read:', error);
      }
    }
    
    const updatedNotifications = notifications.map(notif =>
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    );
    setNotifications(updatedNotifications);
  };

  const markAllNotificationsAsRead = async () => {
    // Mark all messages as read for each student
    const studentIds = Array.from(new Set(notifications.map(n => n.studentId)));
    for (const studentId of studentIds) {
      try {
        await fetch('/api/support/messages/mark-read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId })
        });
      } catch (error) {
        console.error('Failed to mark messages as read for student', studentId, error);
      }
    }
    
    const updatedNotifications = notifications.map(notif => ({ ...notif, isRead: true }));
    setNotifications(updatedNotifications);
  };

  const handleRefresh = async () => {
    console.log('Manual refresh triggered');
    refreshTickets();
    await loadNotifications();
    loadStudentMessages();
    toast({
      variant: "default",
      title: "به‌روزرسانی شد",
      description: "اطلاعات پشتیبانی به‌روزرسانی شد"
    });
  };

  // getStudentName moved above for earlier access

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

  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter(ticket => {
      const matchesFilter = filter === "all" || ticket.status === filter;
      const matchesSearch = searchQuery === "" || 
        ticket.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });

    // مرتب‌سازی
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt - a.createdAt;
        case "oldest":
          return a.createdAt - b.createdAt;
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "status":
          const statusOrder = { open: 4, in_progress: 3, resolved: 2, closed: 1 };
          return statusOrder[b.status] - statusOrder[a.status];
        default:
          return b.createdAt - a.createdAt;
      }
    });

    return filtered;
  }, [tickets, filter, searchQuery, sortBy]);

  const handleAddResponse = (ticketId: string, message: string) => {
    addTicketResponse(ticketId, {
      ticketId,
      authorType: "trainer",
      authorName: "مربی",
      message,
      timestamp: Date.now()
    });
  };

  const handleDeleteTicket = async (ticketId: string) => {
    try {
      await deleteTicket(ticketId);
      toast({
        variant: "default",
        title: "تیکت حذف شد",
        description: "تیکت با موفقیت حذف شد"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "حذف تیکت با مشکل مواجه شد"
      });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const response = await fetch(`/api/support/messages/${messageId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setStudentMessages(prev => prev.filter(msg => msg.id !== messageId));
        await loadNotifications(); // Refresh notifications since they're based on messages
        toast({
          variant: "default",
          title: "پیام حذف شد",
          description: "پیام با موفقیت حذف شد"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "حذف پیام با مشکل مواجه شد"
      });
    }
  };

  const handleDeleteAllTickets = async () => {
    try {
      const deletePromises = tickets.map(ticket => 
        fetch(`/api/support/tickets/${ticket.id}`, { method: 'DELETE' })
      );
      await Promise.all(deletePromises);
      refreshTickets();
      toast({
        variant: "default",
        title: "همه تیکت‌ها حذف شدند",
        description: "تمام تیکت‌های پشتیبانی حذف شدند"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "حذف تیکت‌ها با مشکل مواجه شد"
      });
    }
  };

  const handleDeleteAllMessages = async () => {
    try {
      const response = await fetch('/api/support/messages', {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setStudentMessages([]);
        await loadNotifications(); // Refresh notifications
        toast({
          variant: "default",
          title: "همه پیام‌ها حذف شدند",
          description: "تمام پیام‌های شاگردان حذف شدند"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "حذف پیام‌ها با مشکل مواجه شد"
      });
    }
  };

  const handleDeleteAllNotifications = async () => {
    try {
      // Mark all messages as read (which removes notifications)
      await markAllNotificationsAsRead();
      toast({
        variant: "default",
        title: "همه اعلان‌ها حذف شدند",
        description: "تمام اعلان‌ها به عنوان خوانده شده علامت‌گذاری شدند"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "حذف اعلان‌ها با مشکل مواجه شد"
      });
    }
  };

  const getContainerClasses = () => {
    if (deviceInfo.isMobile) return "p-2 space-y-2";
    if (deviceInfo.isTablet) return "p-4 space-y-3";
    return "p-6 space-y-4";
  };

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  console.log('Current state:', {
    tickets: tickets.length,
    notifications: notifications.length,
    messages: studentMessages.length,
    loading
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50/30 to-info-50/40 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری تیکت‌ها...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50/30 to-info-50/40" dir="rtl">
      <div className={cn("w-full", getContainerClasses())}>
        <SupportHeader />
        <TicketStats stats={getTicketStats()} />

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeTab === 'tickets' ? "default" : "outline"}
            onClick={() => setActiveTab('tickets')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
              activeTab === 'tickets'
                ? "bg-gradient-to-r from-brand-500 to-info-500 text-white shadow-lg"
                : "border-gray-200 hover:bg-brand-50 hover:border-brand-200"
            )}
          >
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">تیکت‌های پشتیبانی</span>
            {tickets.length > 0 && (
              <Badge className="bg-white/20 text-white text-xs px-1.5 py-0.5">
                {toPersianNumbers(tickets.length.toString())}
              </Badge>
            )}
          </Button>
          
          <Button
            variant={activeTab === 'messages' ? "default" : "outline"}
            onClick={() => setActiveTab('messages')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
              activeTab === 'messages'
                ? "bg-gradient-to-r from-brand-500 to-info-500 text-white shadow-lg"
                : "border-gray-200 hover:bg-brand-50 hover:border-brand-200"
            )}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">پیام‌های شاگردان</span>
            {studentMessages.length > 0 && (
              <Badge className="bg-white/20 text-white text-xs px-1.5 py-0.5">
                {toPersianNumbers(studentMessages.length.toString())}
              </Badge>
            )}
          </Button>
          
          <Button
            variant={activeTab === 'notifications' ? "default" : "outline"}
            onClick={() => setActiveTab('notifications')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 relative",
              activeTab === 'notifications'
                ? "bg-gradient-to-r from-brand-500 to-info-500 text-white shadow-lg"
                : "border-gray-200 hover:bg-brand-50 hover:border-brand-200"
            )}
          >
            <Bell className="w-4 h-4" />
            <span className="text-sm font-medium">اعلان‌ها</span>
            {unreadNotifications > 0 && (
              <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 absolute -top-2 -left-2">
                {toPersianNumbers(unreadNotifications.toString())}
              </Badge>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 border-gray-200 hover:bg-brand-50 hover:border-brand-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">به‌روزرسانی</span>
          </Button>
        </div>
        
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            {tickets.length > 0 && (
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">تیکت‌های پشتیبانی</h3>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteAllTickets}
                  className="text-sm"
                >
                  حذف همه تیکت‌ها
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <TicketFilters 
                  filter={filter}
                  onFilterChange={setFilter}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  tickets={tickets}
                />
              </div>
              
              <div className="lg:col-span-3">
                {filteredAndSortedTickets.length > 0 ? (
                  <div className={cn("space-y-4", deviceInfo.isMobile && "space-y-2")}>
                    {filteredAndSortedTickets.map((ticket) => (
                      <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        onStatusChange={updateTicketStatus}
                        onAddResponse={handleAddResponse}
                        onDeleteTicket={handleDeleteTicket}
                        studentInfo={getStudentInfo(ticket.studentId)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState filter={filter} searchQuery={searchQuery} />
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">پیام‌های دریافتی از شاگردان</h3>
              {studentMessages.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteAllMessages}
                  className="text-sm"
                >
                  حذف همه پیام‌ها
                </Button>
              )}
            </div>
            
            {studentMessages.length === 0 ? (
              <Card className="p-8 text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">پیامی وجود ندارد</h3>
                <p className="text-gray-500">هنوز هیچ پیامی از شاگردان دریافت نشده است</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {studentMessages
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((message) => (
                    <Card key={message.id} className="border-gray-200 hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold">
                            {message.senderName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{message.senderName}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteMessage(message.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                                >
                                  ×
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{message.message}</p>
                            {message.studentId && (
                              <div className="mt-2">
                                <Badge variant="outline" className="text-xs">
                                  شناسه شاگرد: {toPersianNumbers(message.studentId.toString())}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">اعلان‌های جدید</h3>
              <div className="flex gap-2">
                {unreadNotifications > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllNotificationsAsRead}
                    className="text-sm"
                  >
                    علامت‌گذاری همه به‌عنوان خوانده‌شده
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteAllNotifications}
                    className="text-sm"
                  >
                    حذف همه اعلان‌ها
                  </Button>
                )}
              </div>
            </div>
            
            {notifications.length === 0 ? (
              <Card className="p-8 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">اعلانی وجود ندارد</h3>
                <p className="text-gray-500">هنوز هیچ اعلان جدیدی دریافت نشده است</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={cn(
                      "border transition-all duration-200 cursor-pointer hover:shadow-md",
                      !notification.isRead ? "border-emerald-200 bg-emerald-50/50" : "border-gray-200"
                    )}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          notification.type === 'support_message' 
                            ? "bg-sky-100 text-sky-600" 
                            : "bg-orange-100 text-orange-600"
                        )}>
                          {notification.type === 'support_message' ? (
                            <MessageCircle className="w-5 h-5" />
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(notification.timestamp)}</span>
                            <span>•</span>
                            <span>{getStudentName(notification.studentId)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
