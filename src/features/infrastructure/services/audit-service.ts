import { db } from "@/lib/db";
import { Logger } from "@/lib/logger";

export interface AuditPayload {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: any;
}

export class AuditService {
  /**
   * Record critical system mutations for compliance and security auditing.
   */
  static async record(payload: AuditPayload) {
    try {
      const log = await db.auditLog.create({
        data: {
          userId: payload.userId,
          action: payload.action,
          entityType: payload.entityType,
          entityId: payload.entityId,
          metadata: payload.metadata,
        }
      });

      Logger.info(`Audit log recorded: ${payload.action}`, "AuditService", { logId: log.id });
      return log;
    } catch (e) {
      Logger.error("Failed to record audit log", "AuditService", { error: e });
    }
  }

  static async getHistory(entityType: string, entityId: string) {
    return await db.auditLog.findMany({
      where: { entityType, entityId },
      orderBy: { createdAt: "desc" },
      take: 50
    });
  }
}
