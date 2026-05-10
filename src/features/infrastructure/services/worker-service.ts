import { db } from "@/lib/db";
import { Logger } from "@/lib/logger";

export class WorkerService {
  /**
   * Monitor health of system components and record metrics.
   */
  static async recordMetric(name: string, value: number, unit: string = "count") {
    return await db.systemMetric.create({
      data: { name, value, unit }
    });
  }

  /**
   * Abstracted background task dispatcher with retry-ready architecture.
   */
  static async dispatchTask(type: string, payload: any, priority: "LOW" | "NORMAL" | "HIGH" = "NORMAL") {
    Logger.info(`Dispatching background task: ${type}`, "WorkerService", { priority });
    
    // Simulating Queue insertion (e.g., BullMQ add)
    // In production: await queue.add(type, payload, { priority });
    
    // For now, we use the SystemTask model we created earlier
    return await db.systemTask.create({
      data: {
        type,
        payload,
        status: "PENDING"
      }
    });
  }

  static async getWorkerHealth() {
    const metrics = await db.systemMetric.findMany({
      orderBy: { timestamp: "desc" },
      take: 100
    });

    const pendingTasks = await db.systemTask.count({ where: { status: "PENDING" } });
    const failedTasks = await db.systemTask.count({ where: { status: "FAILED" } });

    return {
      metrics,
      queueDepth: pendingTasks,
      failureRate: failedTasks,
      status: failedTasks > 10 ? "DEGRADED" : "HEALTHY"
    };
  }
}
