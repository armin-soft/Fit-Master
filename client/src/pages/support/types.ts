
export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory = "exercise" | "diet" | "supplement" | "consultation" | "technical" | "payment" | "other";

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  studentId: number;
  studentName: string;
  studentImage?: string;
  studentPhone?: string;

  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: number;
  updatedAt: number;
  assignedTo?: string;
  responses: TicketResponse[];
  attachments?: TicketAttachment[];
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  authorType: "trainer" | "student";
  authorName: string;
  message: string;
  timestamp: number;
  isInternal?: boolean;
}

export interface TicketAttachment {
  id: string;
  ticketId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: number;
  uploadedBy: string;
}

export interface TicketStats {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  closedTickets: number;
  todayTickets: number;
  averageResponseTime: number;
}

export type TicketFilter = "all" | TicketStatus;
export type TicketSort = "newest" | "oldest" | "priority" | "status";
