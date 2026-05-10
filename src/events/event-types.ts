export type DomainEvent = 
  | "CRM.LEAD_CREATED" | "CRM.CONTACT_UPDATED"
  | "REAL_ESTATE.PROPERTY_CREATED" | "REAL_ESTATE.DEAL_WON" | "REAL_ESTATE.VIEWING_SCHEDULED"
  | "FINANCE.TRANSACTION_CREATED" | "FINANCE.WITHDRAWAL_REQUESTED"
  | "AI.INSIGHT_GENERATED"
  | "INFRA.METRIC_LOGGED" | "INFRA.AUDIT_LOGGED";

export interface EventPayload<T = any> {
  id: string;
  correlationId: string;
  type: DomainEvent;
  data: T;
  userId?: string;
  timestamp: Date;
  source: string;
  version: string;
}
