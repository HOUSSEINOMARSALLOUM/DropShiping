import { db } from "@/lib/db"
import { CacheLayer } from "./cache-layer"
import { CRMAnalyticsDTO } from "../dto"

export class CRMAggregator {
  static async getIntelligence(): Promise<CRMAnalyticsDTO> {
    return await CacheLayer.fetch('crm-intelligence', async () => {
      const clients = await db.client.findMany()

      let pipelineValue = 0 // Mock calculation logic
      
      const wealthDist = {
        HIGH_NET_WORTH: 0,
        ULTRA_HIGH_NET_WORTH: 0,
        BILLIONAIRE: 0
      }

      const stageDist = {
        PROSPECT: 0,
        QUALIFIED: 0,
        NEGOTIATION: 0,
        CLOSED_WON: 0,
        CLOSED_LOST: 0
      }

      clients.forEach(c => {
        wealthDist[c.wealthTier]++
        stageDist[c.dealStage]++
        
        if (c.dealStage === 'NEGOTIATION') pipelineValue += 1500000 // Mock assignment
        if (c.dealStage === 'QUALIFIED') pipelineValue += 500000
      })

      return {
        networkSize: {
          label: "Total Connections",
          value: clients.length,
          trend: 8,
          trendLabel: "added this quarter",
          isPositive: true
        },
        pipelineValue: {
          label: "Estimated Pipeline",
          value: `$${(pipelineValue / 1000000).toFixed(1)}M`,
          trend: 2.1,
          trendLabel: "M increase vs Q1",
          isPositive: true
        },
        wealthDistribution: [
          { name: "HNW", value: wealthDist.HIGH_NET_WORTH, color: "#3b82f6" },
          { name: "UHNW", value: wealthDist.ULTRA_HIGH_NET_WORTH, color: "#a855f7" },
          { name: "Billionaire", value: wealthDist.BILLIONAIRE, color: "#f59e0b" }
        ],
        dealStageDistribution: [
          { name: "Prospect", value: stageDist.PROSPECT, color: "#64748b" },
          { name: "Qualified", value: stageDist.QUALIFIED, color: "#3b82f6" },
          { name: "Negotiation", value: stageDist.NEGOTIATION, color: "#f59e0b" },
          { name: "Won", value: stageDist.CLOSED_WON, color: "#10b981" },
        ]
      }
    }, 300) // 5 min cache
  }
}
