import { AIAggregator } from "@/features/analytics/services/ai-aggregator"
import { MetricCard } from "@/features/analytics/components/metric-card"
import { DistributionChart } from "@/features/analytics/components/reusable-charts"

export default async function AIAnalyticsPage() {
  const data = await AIAggregator.getIntelligence()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard metric={data.totalGenerations} />
        <MetricCard metric={data.tokensConsumed} />
        <MetricCard metric={data.averageLatency} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DistributionChart 
          title="Task Distribution Engine"
          data={data.taskTypeDistribution}
        />
      </div>
    </div>
  )
}
