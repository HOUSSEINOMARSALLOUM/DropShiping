export type AnalyticsReport = {
  id: string
  name: string
  type: 'REVENUE' | 'TRAFFIC' | 'CONVERSION'
  data: any // JSON type
  createdAt: Date
  updatedAt: Date
}
