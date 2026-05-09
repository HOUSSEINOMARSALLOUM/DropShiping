import { db } from "@/lib/db"
import { TaskType, TaskPayload } from "../types"

export class QueueService {
  /**
   * Enqueue a new background task
   */
  static async enqueue(type: TaskType, payload: TaskPayload, scheduledFor?: Date) {
    return await db.systemTask.create({
      data: {
        type,
        payload: payload as any,
        scheduledFor: scheduledFor || new Date()
      }
    })
  }

  /**
   * Claim tasks that are pending and ready to run
   * Atomic operation to prevent multiple workers grabbing the same tasks
   */
  static async claimTasks(batchSize = 5) {
    const pendingTasks = await db.systemTask.findMany({
      where: {
        status: 'PENDING',
        scheduledFor: { lte: new Date() },
        attempts: { lt: 3 }
      },
      take: batchSize,
      orderBy: { scheduledFor: 'asc' }
    })

    if (pendingTasks.length === 0) return []

    const taskIds = pendingTasks.map(t => t.id)
    
    // Mark as processing
    await db.systemTask.updateMany({
      where: { id: { in: taskIds } },
      data: { status: 'PROCESSING' }
    })

    return pendingTasks
  }

  static async markCompleted(id: string) {
    return await db.systemTask.update({
      where: { id },
      data: { status: 'COMPLETED', completedAt: new Date() }
    })
  }

  static async markFailed(id: string, errorMsg: string, currentAttempts: number, maxAttempts: number) {
    const nextStatus = currentAttempts + 1 >= maxAttempts ? 'FAILED' : 'PENDING'
    const nextScheduled = new Date(Date.now() + 1000 * 60 * Math.pow(2, currentAttempts)) // Exponential backoff

    return await db.systemTask.update({
      where: { id },
      data: { 
        status: nextStatus,
        attempts: { increment: 1 },
        error: errorMsg,
        scheduledFor: nextStatus === 'PENDING' ? nextScheduled : undefined
      }
    })
  }
}
