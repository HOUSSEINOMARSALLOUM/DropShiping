import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { db } from '@/lib/db'
import { PromptRegistry } from '../prompts/registry'
import { 
  AITaskType, 
  GenerationRequest, 
  DropshippingOutputSchema,
  TikTokHookOutputSchema,
  FacebookAdOutputSchema,
  RealEstateOutputSchema,
  OutreachMessageOutputSchema
} from '../types'

const schemaMap: Record<AITaskType, any> = {
  DROPSHIPPING_DESCRIPTION: DropshippingOutputSchema,
  TIKTOK_HOOK: TikTokHookOutputSchema,
  FACEBOOK_AD: FacebookAdOutputSchema,
  REAL_ESTATE_DESCRIPTION: RealEstateOutputSchema,
  OUTREACH_MESSAGE: OutreachMessageOutputSchema
}

export class AIOrchestrator {
  static async generate(request: GenerationRequest) {
    const startTime = Date.now()
    
    // AI Cost Control Check
    const currentMonthStart = new Date()
    currentMonthStart.setDate(1)
    currentMonthStart.setHours(0,0,0,0)

    const usageLog = await db.aIGenerationLog.aggregate({
      where: { createdAt: { gte: currentMonthStart } },
      _sum: { totalTokens: true }
    })

    const consumedTokens = usageLog._sum.totalTokens || 0
    if (consumedTokens > Number(process.env.MAX_MONTHLY_AI_TOKENS || 1000000)) {
      throw new Error("Monthly AI token limit exceeded. Increase budget to continue.")
    }

    const prompt = PromptRegistry[request.taskType](request.contextData)
    const schema = schemaMap[request.taskType]
    const modelStr = request.model || 'gpt-4o-mini'

    let result
    let status = "SUCCESS"
    let errorMessage = null

    try {
      // Execute structured generation with automatic retries handled by AI SDK
      result = await generateObject({
        model: openai(modelStr),
        schema: schema,
        prompt: prompt,
        temperature: 0.7,
      })

    } catch (error: any) {
      status = "ERROR"
      errorMessage = error.message
      throw new Error(`AI Generation failed: ${errorMessage}`)
    } finally {
      // Log history to database
      const endTime = Date.now()
      
      try {
        await db.aIGenerationLog.create({
          data: {
            provider: "OPENAI",
            model: modelStr,
            promptTemplate: request.taskType,
            inputPayload: request.contextData,
            outputResponse: result?.object || {},
            promptTokens: result?.usage?.promptTokens || 0,
            completionTokens: result?.usage?.completionTokens || 0,
            totalTokens: result?.usage?.totalTokens || 0,
            latencyMs: endTime - startTime,
            status,
            errorMessage
          }
        })
      } catch (dbError) {
        console.error("Failed to log AI generation to database", dbError)
      }
    }

    return result.object
  }

  static async getHistory(limit = 20) {
    return await db.aIGenerationLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit
    })
  }
}
