
import { useState, useEffect } from "react";
import { SupportTicket, TicketStats } from "../types";
import { useStudents } from "@/hooks/useStudents";
import { getStorageItem, setStorageItem } from "@/utils/databaseStorage";

export const useTicketData = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const { students } = useStudents();

  const getStudentName = (studentId: number): string => {
    const student = students?.find(s => s.id === studentId);
    return student?.name || `شاگرد ${studentId}`;
  };

  useEffect(() => {
    loadTickets();
    
    // Listen for new tickets from students
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'studentSupportTickets' || e.key === 'studentSupportMessages') {
        console.log('Storage changed, reloading tickets...');
        loadTickets();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for direct localStorage changes
    const interval = setInterval(() => {
      loadTickets();
    }, 2000); // Check every 2 seconds for new data
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadTickets = async () => {
    try {
      console.log('Loading tickets from database...');
      
      // Load tickets from real database API
      try {
        const response = await fetch('/api/support/tickets');
        if (response.ok) {
          const tickets = await response.json();
          console.log('Found database tickets:', tickets);
          
          // Convert database tickets to the expected format
          const convertedTickets: SupportTicket[] = tickets.map((dbTicket: any) => ({
            id: dbTicket.id.toString(),
            ticketNumber: dbTicket.ticketNumber,
            studentId: dbTicket.studentId,
            studentName: getStudentName(dbTicket.studentId),
            subject: dbTicket.subject,
            description: dbTicket.description,
            category: dbTicket.category as any,
            priority: dbTicket.priority,
            status: dbTicket.status,
            createdAt: new Date(dbTicket.createdAt).getTime(),
            updatedAt: new Date(dbTicket.updatedAt).getTime(),
            responses: []
          }));

          setTickets(convertedTickets);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Failed to load tickets from database:', error);
      }

      // Fallback: Load messages from database API and convert to tickets
      try {
        const messagesResponse = await fetch('/api/support/messages');
        if (messagesResponse.ok) {
          const messages = await messagesResponse.json();
          console.log('Found database messages:', messages);
          
          // Convert messages to tickets for display
          const messageTickets: SupportTicket[] = messages.map((message: any, index: number) => ({
            id: `msg-${message.id}`,
            ticketNumber: `MSG-${String(message.id).slice(-6).toUpperCase()}`,
            studentId: message.studentId,
            studentName: getStudentName(message.studentId),
            subject: `پیام از ${getStudentName(message.studentId)}`,
            description: message.message,
            category: "general" as any,
            priority: "medium" as any,
            status: message.isRead ? "resolved" : "open" as any,
            createdAt: new Date(message.createdAt).getTime(),
            updatedAt: new Date(message.createdAt).getTime(),
            responses: []
          }));

          console.log('Message tickets from database:', messageTickets);
          setTickets(messageTickets);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Failed to load messages from database:', error);
      }

      // Final fallback - empty state
      console.log('No real data found, showing empty state');
      setTickets([]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading tickets:', error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const saveTickets = async (updatedTickets: SupportTicket[]) => {
    if (Array.isArray(updatedTickets)) {
      setTickets(updatedTickets);
      
      // Update real tickets in database
      for (const ticket of updatedTickets) {
        if (!ticket.id.startsWith('msg-')) {
          try {
            await fetch(`/api/support/tickets/${ticket.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                status: ticket.status,
                priority: ticket.priority,
                subject: ticket.subject,
                description: ticket.description
              })
            });
          } catch (error) {
            console.error('Failed to update ticket:', error);
          }
        }
      }
    }
  };

  const updateTicketStatus = (ticketId: string, newStatus: SupportTicket['status']) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: Date.now() }
        : ticket
    );
    saveTickets(updatedTickets);
  };

  const addTicketResponse = async (ticketId: string, response: Omit<SupportTicket['responses'][0], 'id'>) => {
    try {
      // Add response via API
      await fetch(`/api/support/tickets/${ticketId}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: response.message,
          authorType: response.authorType,
          authorId: 1 // Use trainer ID 1
        })
      });
      
      // Update local state
      const updatedTickets = tickets.map(ticket =>
        ticket.id === ticketId 
          ? {
              ...ticket,
              responses: [...(ticket.responses || []), { ...response, id: `resp_${Date.now()}` }],
              updatedAt: Date.now(),
              status: response.authorType === "trainer" ? "in_progress" : ticket.status
            }
          : ticket
      );
      setTickets(updatedTickets);
    } catch (error) {
      console.error('Failed to add ticket response:', error);
    }
  };

  const deleteTicket = async (ticketId: string) => {
    try {
      // Delete ticket via API if it's a real ticket (not a message-based one)
      if (!ticketId.startsWith('msg-')) {
        const response = await fetch(`/api/support/tickets/${ticketId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete ticket from server');
        }
      }
      
      // Update local state
      const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
      setTickets(updatedTickets);
      
      console.log('Ticket deleted successfully:', ticketId);
    } catch (error) {
      console.error('Failed to delete ticket:', error);
      throw error; // Re-throw to allow caller to handle
    }
  };

  const sendResponseNotificationToStudent = async (ticketId: string, message: string) => {
    try {
      // Send notification via API
      await fetch('/api/support/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: 1, // Default student for demo
          message: `پاسخی برای تیکت ${ticketId} ارسال شد: ${message.substring(0, 50)}...`,
          type: 'notification'
        })
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const getTicketStats = (): TicketStats => {
    const today = new Date().setHours(0, 0, 0, 0);
    const safeTickets = Array.isArray(tickets) ? tickets : [];
    
    return {
      totalTickets: safeTickets.length,
      openTickets: safeTickets.filter(t => t?.status === "open").length,
      inProgressTickets: safeTickets.filter(t => t?.status === "in_progress").length,
      resolvedTickets: safeTickets.filter(t => t?.status === "resolved").length,
      closedTickets: safeTickets.filter(t => t?.status === "closed").length,
      todayTickets: safeTickets.filter(t => t?.createdAt && new Date(t.createdAt).setHours(0, 0, 0, 0) === today).length,
      averageResponseTime: calculateAverageResponseTime()
    };
  };

  const calculateAverageResponseTime = (): number => {
    const safeTickets = Array.isArray(tickets) ? tickets : [];
    const respondedTickets = safeTickets.filter(t => t?.responses && Array.isArray(t.responses) && t.responses.length > 0);
    
    if (respondedTickets.length === 0) return 0;
    
    const totalTime = respondedTickets.reduce((acc, ticket) => {
      const firstResponse = ticket.responses?.find(r => r?.authorType === "trainer");
      if (firstResponse && firstResponse.timestamp && ticket.createdAt) {
        return acc + (firstResponse.timestamp - ticket.createdAt);
      }
      return acc;
    }, 0);
    
    return Math.round(totalTime / respondedTickets.length / (1000 * 60 * 60)); // Hours
  };

  const getStudentInfo = (studentId: number) => {
    return Array.isArray(students) ? students.find(s => s?.id === studentId) : undefined;
  };

  return {
    tickets: Array.isArray(tickets) ? tickets : [],
    loading,
    updateTicketStatus,
    addTicketResponse,
    deleteTicket,
    getTicketStats,
    getStudentInfo,
    saveTickets,
    refreshTickets: loadTickets
  };
};
