export interface KPIDTO {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
  category: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

export interface DomainIntelligence {
  crm: {
    totalContacts: number;
    vipCount: number;
    conversionRate: number;
    leadVelocity: number;
  };
  realEstate: {
    portfolioValue: number;
    activeDeals: number;
    closedDeals: number;
    averageDealSize: number;
  };
  finance: {
    monthlyRevenue: number;
    monthlyExpenses: number;
    profitMargin: number;
    cashFlow: ChartDataPoint[];
  };
}
