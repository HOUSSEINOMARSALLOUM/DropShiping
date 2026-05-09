import { CRMAggregator } from "@/features/analytics/services/crm-aggregator"
import { MetricCard } from "@/features/analytics/components/metric-card"
import { DistributionChart } from "@/features/analytics/components/reusable-charts"

export default async function CRMAnalyticsPage() {
  const data = await CRMAggregator.getIntelligence()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard metric={data.networkSize} />
        <MetricCard metric={data.pipelineValue} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DistributionChart 
          title="Wealth Tier Distribution"
          data={data.wealthDistribution}
        />
        <DistributionChart 
          title="Pipeline Stage Distribution"
          data={data.dealStageDistribution}
        />
      </div>
    </div>
  )
}
