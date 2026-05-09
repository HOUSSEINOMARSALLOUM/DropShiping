"use server"

import { revalidatePath } from "next/cache"
import { AIOrchestrator } from "./services/orchestrator"
import { AITaskType } from "./types"

export async function runAIGenerationAction(taskType: AITaskType, contextData: any) {
  try {
    const result = await AIOrchestrator.generate({
      taskType,
      contextData
    })
    revalidatePath("/ai")
    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message || "Failed to run AI generation" }
  }
}
