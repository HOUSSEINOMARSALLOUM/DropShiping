import { NotificationPriority } from "@prisma/client";

export type SystemEvent = 
  | "LEAD.CREATED"
  | "DEAL.WON"
  | "DEAL.PIPELINE_STALLED"
  | "FINANCE.LARGE_INCOME"
  | "FINANCE.WITHDRAWAL_REQUESTED"
  | "PROPERTY.VIEWING_REMINDER";

export interface AutomationPayload {
  eventId: string;
  eventType: SystemEvent;
  timestamp: Date;
  metadata: Record<string, any>;
}

export interface NotificationDTO {
  title: string;
  message: string;
  priority: NotificationPriority;
  type: string;
  link?: string;
}
