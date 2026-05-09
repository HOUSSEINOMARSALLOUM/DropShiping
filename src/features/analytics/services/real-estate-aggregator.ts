import { db } from "@/lib/db"
import { CacheLayer } from "./cache-layer"
import { RealEstateAnalyticsDTO } from "../dto"

export class RealEstateAggregator {
  static async getIntelligence(): Promise<RealEstateAnalyticsDTO> {
    return await CacheLayer.fetch('realestate-intelligence', async () => {
      const properties = await db.property.findMany({
        include: { _count: { select: { viewings: true } } }
      })

      const totalValue = properties.reduce((sum, p) => sum + p.price, 0)
      const totalViewings = properties.reduce((sum, p) => sum + p._count.viewings, 0)
      
      const typeDist = {
        VILLA: 0, APARTMENT: 0, PENTHOUSE: 0, COMMERCIAL: 0, TOWNHOUSE: 0, LAND: 0
      }
      properties.forEach(p => typeDist[p.type]++)

      return {
        totalPortfolioValue: {
          label: "Total Portfolio Value",
          value: `$${(totalValue / 1000000).toFixed(1)}M`,
          trend: 5.2,
          trendLabel: "new listings added",
          isPositive: true
        },
        propertiesListed: {
          label: "Active Listings",
          value: properties.length,
          trend: 2,
          trendLabel: "this month",
          isPositive: true
        },
        totalViewings: {
          label: "VIP Viewings",
          value: totalViewings,
          trend: 14,
          trendLabel: "vs last month",
          isPositive: true
        },
        propertyTypeDistribution: [
          { name: "Villa", value: typeDist.VILLA, color: "#10b981" },
          { name: "Apartment", value: typeDist.APARTMENT, color: "#3b82f6" },
          { name: "Penthouse", value: typeDist.PENTHOUSE, color: "#f59e0b" },
          { name: "Commercial", value: typeDist.COMMERCIAL, color: "#64748b" }
        ].filter(d => d.value > 0)
      }
    }, 300)
  }
}
