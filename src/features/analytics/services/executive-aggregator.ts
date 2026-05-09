import { db } from "@/lib/db"
import { CacheLayer } from "./cache-layer"
import { ExecutiveInsightsDTO } from "../dto"

export class ExecutiveAggregator {
  static async getDashboardInsights(): Promise<ExecutiveInsightsDTO> {
    return await CacheLayer.fetch('executive-insights', async () => {
      // Parallel reads for optimal performance
      const [
        transactions,
        clients,
        properties,
        aiLogs
      ] = await Promise.all([
        db.transaction.findMany({ where: { status: 'COMPLETED' } }),
        db.client.count(),
        db.property.count({ where: { status: 'AVAILABLE' } }),
        db.aIGenerationLog.count()
      ])

      const totalRevenue = transactions
        .filter(t => t.type === 'REVENUE')
        .reduce((sum, t) => sum + t.amount, 0)

      // Mock trend data for executive view
      const revenueTrend = [
        { name: "Jan", revenue: 12000, target: 10000 },
        { name: "Feb", revenue: 15000, target: 12000 },
        { name: "Mar", revenue: 18000, target: 15000 },
        { name: "Apr", revenue: 22000, target: 18000 },
        { name: "May", revenue: 28000, target: 22000 },
      ]

      return {
        totalRevenue: {
          label: "Total Revenue",
          value: `$${(totalRevenue / 1000).toFixed(1)}k`,
          trend: 12.5,
          trendLabel: "vs last month",
          isPositive: true
        },
        activeClients: {
          label: "VIP Network Size",
          value: clients,
          trend: 4,
          trendLabel: "new this month",
          isPositive: true
        },
        activeProperties: {
          label: "Active Real Estate",
          value: properties,
          trend: 1,
          trendLabel: "sold this week",
          isPositive: true
        },
        aiGenerations: {
          label: "AI Actions Automated",
          value: aiLogs,
          trend: 25.4,
          trendLabel: "efficiency gain",
          isPositive: true
        },
        revenueTrend
      }
    }, 120) // Cache for 2 mins
  }
}
