import { db } from "@/infrastructure/db/db";

export interface AuditPayload {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: any;
}

export class AuditService {
  /**
   * Central Audit Logging enforced by the Event Bus for every system event.
   */
  static async record(payload: AuditPayload) {
    return await db.auditLog.create({
      data: {
        userId: payload.userId,
        action: payload.action,
        entityType: payload.entityType,
        entityId: payload.entityId,
        metadata: payload.metadata,
      }
    });
  }
}
