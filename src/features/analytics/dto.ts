export interface MetricDTO {
  label: string
  value: string | number
  trend: number
  trendLabel: string
  isPositive: boolean
}

export interface TimeSeriesDTO {
  name: string
  [key: string]: string | number
}

export interface DistributionDTO {
  name: string
  value: number
  color?: string
}

export interface ExecutiveInsightsDTO {
  totalRevenue: MetricDTO
  activeClients: MetricDTO
  activeProperties: MetricDTO
  aiGenerations: MetricDTO
  revenueTrend: TimeSeriesDTO[]
}

export interface DropshippingAnalyticsDTO {
  totalSales: MetricDTO
  averageMargin: MetricDTO
  activeProducts: MetricDTO
  topPerformingProducts: any[]
  salesTrend: TimeSeriesDTO[]
}

export interface CRMAnalyticsDTO {
  networkSize: MetricDTO
  pipelineValue: MetricDTO
  wealthDistribution: DistributionDTO[]
  dealStageDistribution: DistributionDTO[]
}

export interface FinanceAnalyticsDTO {
  cashFlow: MetricDTO
  expenses: MetricDTO
  burnRate: MetricDTO
  cashFlowTrend: TimeSeriesDTO[]
}

export interface RealEstateAnalyticsDTO {
  totalPortfolioValue: MetricDTO
  propertiesListed: MetricDTO
  totalViewings: MetricDTO
  propertyTypeDistribution: DistributionDTO[]
}

export interface AIInsightsDTO {
  totalGenerations: MetricDTO
  tokensConsumed: MetricDTO
  averageLatency: MetricDTO
  taskTypeDistribution: DistributionDTO[]
}
