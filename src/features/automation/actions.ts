"use server"

import { revalidatePath } from "next/cache"
import { BackgroundWorker } from "./services/worker"
import { QueueService } from "./services/queue-service"
import { TaskType, TaskPayload } from "./types"

// This would typically be triggered by a CRON job or separate Node process.
// We expose it as a Server Action for UI triggering/testing purposes.
export async function runBackgroundWorkerAction() {
  try {
    await BackgroundWorker.processNextBatch()
    revalidatePath("/", "layout")
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function enqueueTaskAction(type: TaskType, payload: TaskPayload) {
  try {
    await QueueService.enqueue(type, payload)
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
