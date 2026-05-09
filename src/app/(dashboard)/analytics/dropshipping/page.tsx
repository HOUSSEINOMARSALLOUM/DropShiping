import { DropshippingAggregator } from "@/features/analytics/services/dropshipping-aggregator"
import { MetricCard } from "@/features/analytics/components/metric-card"
import { TrendChart } from "@/features/analytics/components/reusable-charts"

export default async function DropshippingAnalyticsPage() {
  const data = await DropshippingAggregator.getIntelligence()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard metric={data.totalSales} />
        <MetricCard metric={data.averageMargin} />
        <MetricCard metric={data.activeProducts} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TrendChart 
          title="Sales vs Conversion Trends"
          data={data.salesTrend}
          lines={[
            { key: "sales", color: "#3b82f6" },
            { key: "conversion", color: "#8b5cf6" }
          ]}
        />
      </div>
    </div>
  )
}
