import { QueueService } from "./queue-service"
import { WhatsAppIntegration } from "../integrations/whatsapp"
import { EmailIntegration } from "../integrations/email"
import { NotificationService } from "@/features/notifications/services/notification-service"

export class BackgroundWorker {
  static async processNextBatch() {
    console.log("[Worker] Claiming tasks...")
    const tasks = await QueueService.claimTasks()
    
    if (tasks.length === 0) {
      console.log("[Worker] No pending tasks.")
      return
    }

    console.log(`[Worker] Processing ${tasks.length} tasks`)

    for (const task of tasks) {
      try {
        const payload = task.payload as any

        switch (task.type) {
          case 'WHATSAPP_SEND':
            await WhatsAppIntegration.sendMessage(payload.to, payload.body)
            break
          case 'EMAIL_SEND':
            await EmailIntegration.sendEmail(payload.to, payload.subject, payload.body)
            break
          case 'AI_BACKGROUND_ENRICHMENT':
            // Call AI Module silently
            await new Promise(r => setTimeout(r, 1500))
            break
          default:
            console.log(`[Worker] Unknown task type: ${task.type}`)
        }

        await QueueService.markCompleted(task.id)
        
        // Notify admin via System Notifications
        if (task.type === 'WHATSAPP_SEND' || task.type === 'EMAIL_SEND') {
          await NotificationService.create({
            title: `Automation Success`,
            message: `Successfully delivered ${task.type} to ${payload.to}`,
            type: 'SUCCESS'
          })
        }

      } catch (error: any) {
        console.error(`[Worker] Task ${task.id} failed:`, error.message)
        await QueueService.markFailed(task.id, error.message, task.attempts, task.maxAttempts)
        
        if (task.attempts + 1 >= task.maxAttempts) {
           await NotificationService.create({
            title: `Automation Failed`,
            message: `Task ${task.type} failed permanently. Reason: ${error.message}`,
            type: 'ERROR'
          })
        }
      }
    }
  }
}
