import { ExecutiveAggregator } from "@/features/analytics/services/executive-aggregator"
import { MetricCard } from "@/features/analytics/components/metric-card"
import { TrendChart } from "@/features/analytics/components/reusable-charts"

export default async function ExecutiveDashboardPage() {
  const data = await ExecutiveAggregator.getDashboardInsights()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard metric={data.totalRevenue} />
        <MetricCard metric={data.activeClients} />
        <MetricCard metric={data.activeProperties} />
        <MetricCard metric={data.aiGenerations} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TrendChart 
          title="Revenue Trajectory vs Targets"
          data={data.revenueTrend}
          lines={[
            { key: "revenue", color: "#10b981" },
            { key: "target", color: "#6366f1" }
          ]}
        />
      </div>
    </div>
  )
}
