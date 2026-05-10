import { db } from "@/infrastructure/db/db";
import { Logger } from "@/infrastructure/logger/logger";

export interface WorkerJob {
  type: string;
  payload: any;
  retryCount: number;
}

export class WorkerDispatcher {
  /**
   * Dispatches non-blocking side effects to the background infrastructure.
   * This ensures domain transactions are fast and isolated from external API failures.
   */
  static async enqueue(type: string, payload: any) {
    Logger.info(`[Worker] Enqueueing side effect: ${type}`, "WorkerDispatcher");

    // In production, this pushes to BullMQ/Redis
    // For now, we persist to the systemTask table for reliable execution
    return await db.systemTask.create({
      data: {
        type,
        payload,
        status: "PENDING"
      }
    });
  }

  static async processQueue() {
    const tasks = await db.systemTask.findMany({ 
      where: { status: "PENDING" },
      take: 10 
    });

    for (const task of tasks) {
      try {
        await db.systemTask.update({
          where: { id: task.id },
          data: { status: "PROCESSING" }
        });

        // Handler logic would go here
        Logger.info(`[Worker] Processing task ${task.id}`, "WorkerDispatcher", { type: task.type });

        await db.systemTask.update({
          where: { id: task.id },
          data: { status: "COMPLETED" }
        });
      } catch (e) {
        await db.systemTask.update({
          where: { id: task.id },
          data: { status: "FAILED" }
        });
      }
    }
  }
}
