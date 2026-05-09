import { db } from "@/lib/db"

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'EXPORT'
export type AuditEntity = 'PRODUCT' | 'CLIENT' | 'PROPERTY' | 'TRANSACTION' | 'SYSTEM'

export class AuditLogger {
  /**
   * Log administrative and destructive actions to the database securely
   */
  static async log(action: AuditAction, entity: AuditEntity, entityId?: string, payload?: any, actor: string = "SYSTEM_ADMIN") {
    
    // Asynchronous non-blocking log
    Promise.resolve().then(async () => {
      try {
        await db.auditLog.create({
          data: {
            action,
            entity,
            entityId,
            actor,
            payload: payload || {}
          }
        })
        
        // Output structured logging for external log aggregators (Datadog/Logtail)
        console.log(JSON.stringify({
          level: 'info',
          timestamp: new Date().toISOString(),
          context: 'audit',
          action,
          entity,
          entityId,
          actor
        }))
      } catch (e) {
        // Prevent audit logging failures from crashing the app
        console.error("Failed to write audit log:", e)
      }
    })
  }
}
