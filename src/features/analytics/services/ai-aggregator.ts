import { db } from "@/lib/db"
import { CacheLayer } from "./cache-layer"
import { AIInsightsDTO } from "../dto"

export class AIAggregator {
  static async getIntelligence(): Promise<AIInsightsDTO> {
    return await CacheLayer.fetch('ai-intelligence', async () => {
      const logs = await db.aIGenerationLog.findMany()

      const totalTokens = logs.reduce((sum, l) => sum + l.totalTokens, 0)
      const avgLatency = logs.length > 0 ? logs.reduce((sum, l) => sum + l.latencyMs, 0) / logs.length : 0

      const taskDist: Record<string, number> = {}
      logs.forEach(l => {
        taskDist[l.promptTemplate] = (taskDist[l.promptTemplate] || 0) + 1
      })

      return {
        totalGenerations: {
          label: "Automations Run",
          value: logs.length,
          trend: 45,
          trendLabel: "this week",
          isPositive: true
        },
        tokensConsumed: {
          label: "Tokens Consumed",
          value: totalTokens > 1000 ? `${(totalTokens / 1000).toFixed(1)}k` : totalTokens,
          trend: 12,
          trendLabel: "usage increase",
          isPositive: false
        },
        averageLatency: {
          label: "Average Latency",
          value: `${(avgLatency / 1000).toFixed(2)}s`,
          trend: 0.1,
          trendLabel: "improvement",
          isPositive: true
        },
        taskTypeDistribution: Object.entries(taskDist).map(([key, val]) => ({
          name: key.replace(/_/g, ' '),
          value: val
        }))
      }
    }, 300)
  }
}
