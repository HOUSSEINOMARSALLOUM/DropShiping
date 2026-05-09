import { FinanceAggregator } from "@/features/analytics/services/finance-aggregator"
import { MetricCard } from "@/features/analytics/components/metric-card"
import { TrendChart } from "@/features/analytics/components/reusable-charts"

export default async function FinanceAnalyticsPage() {
  const data = await FinanceAggregator.getIntelligence()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard metric={data.cashFlow} />
        <MetricCard metric={data.expenses} />
        <MetricCard metric={data.burnRate} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TrendChart 
          title="Gross Cash Flow & Burn Rate Trends"
          data={data.cashFlowTrend}
          bars={[
            { key: "revenue", color: "#10b981" },
            { key: "expenses", color: "#ef4444" }
          ]}
        />
      </div>
    </div>
  )
}
