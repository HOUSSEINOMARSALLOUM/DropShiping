import { db } from "@/lib/db"
import { CacheLayer } from "./cache-layer"
import { FinanceAnalyticsDTO } from "../dto"

export class FinanceAggregator {
  static async getIntelligence(): Promise<FinanceAnalyticsDTO> {
    return await CacheLayer.fetch('finance-intelligence', async () => {
      const transactions = await db.transaction.findMany({ where: { status: 'COMPLETED' } })

      let totalRevenue = 0
      let totalExpenses = 0
      
      transactions.forEach(t => {
        if (t.type === 'REVENUE') totalRevenue += t.amount
        if (t.type === 'EXPENSE') totalExpenses += t.amount
      })

      return {
        cashFlow: {
          label: "Gross Cash Flow",
          value: `$${(totalRevenue / 1000).toFixed(1)}k`,
          trend: 8.4,
          trendLabel: "vs last month",
          isPositive: true
        },
        expenses: {
          label: "Total Expenses",
          value: `$${(totalExpenses / 1000).toFixed(1)}k`,
          trend: 2.1,
          trendLabel: "vs last month",
          isPositive: false
        },
        burnRate: {
          label: "Monthly Burn Rate",
          value: `$${(totalExpenses / 30).toFixed(0)} / day`,
          trend: 0,
          trendLabel: "stable",
          isPositive: true
        },
        cashFlowTrend: [
          { name: "Week 1", revenue: 4000, expenses: 2400 },
          { name: "Week 2", revenue: 3000, expenses: 1398 },
          { name: "Week 3", revenue: 2000, expenses: 9800 },
          { name: "Week 4", revenue: 2780, expenses: 3908 },
        ]
      }
    }, 300)
  }
}
