import { RealEstateAggregator } from "@/features/analytics/services/real-estate-aggregator"
import { MetricCard } from "@/features/analytics/components/metric-card"
import { DistributionChart } from "@/features/analytics/components/reusable-charts"

export default async function RealEstateAnalyticsPage() {
  const data = await RealEstateAggregator.getIntelligence()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard metric={data.totalPortfolioValue} />
        <MetricCard metric={data.propertiesListed} />
        <MetricCard metric={data.totalViewings} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DistributionChart 
          title="Property Type Distribution"
          data={data.propertyTypeDistribution}
        />
      </div>
    </div>
  )
}
