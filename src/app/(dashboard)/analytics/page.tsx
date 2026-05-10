import { AnalyticsService } from "@/features/analytics/services/analytics-service";
import { IntelligenceCard } from "@/features/analytics/components/intelligence-card";
import { RevenueChart } from "@/features/analytics/components/revenue-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Zap, 
  BarChart3, 
  Target, 
  PieChart,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AnalyticsPage() {
  const intel = await AnalyticsService.getExecutiveIntelligence();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            Executive Intelligence
          </h1>
          <p className="text-muted-foreground">
            Aggregated cross-domain signals and predictive business intelligence.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-card/50">
            Export Intelligence PDF
          </Button>
          <Button size="sm" className="shadow-lg shadow-primary/20">
            Refresh Signals
          </Button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <IntelligenceCard 
          title="Revenue (Current Month)"
          value={`$${intel.finance.monthlyRevenue.toLocaleString()}`}
          description="Total cash inflow recorded"
          icon={TrendingUp}
          trend="up"
          trendValue="14.2%"
        />
        <IntelligenceCard 
          title="Portfolio Valuation"
          value={`$${(intel.realEstate.portfolioValue / 1000000).toFixed(1)}M`}
          description="Total asset worth under management"
          icon={Building2}
        />
        <IntelligenceCard 
          title="CRM Lead Velocity"
          value={`${intel.crm.leadVelocity}%`}
          description="Relative increase in lead acquisition"
          icon={Users}
          trend="up"
          trendValue="5.4%"
        />
        <IntelligenceCard 
          title="Profit Margin"
          value={`${intel.finance.profitMargin.toFixed(1)}%`}
          description="Net efficiency of operations"
          icon={Zap}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cash Flow Analysis Chart */}
        <Card className="lg:col-span-2 bg-card/40 border-primary/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Financial Momentum</CardTitle>
              <p className="text-xs text-muted-foreground">Monthly cash flow: Revenue vs Operational Expenses</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Revenue
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                Expenses
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <RevenueChart data={intel.finance.cashFlow} />
          </CardContent>
        </Card>

        {/* Domain Intelligence Widgets */}
        <div className="space-y-6">
          <Card className="bg-card/40 border-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Deal Efficiency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Conversion Rate</span>
                <span className="font-bold text-primary">{intel.crm.conversionRate.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${intel.crm.conversionRate}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-background/50 border border-primary/5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Avg Deal</p>
                  <p className="text-sm font-bold">${(intel.realEstate.averageDealSize / 1000).toFixed(1)}k</p>
                </div>
                <div className="p-3 rounded-xl bg-background/50 border border-primary/5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Won Deals</p>
                  <p className="text-sm font-bold">{intel.realEstate.closedDeals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                Lead Intelligence
                <Target className="h-4 w-4 text-primary opacity-50" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center">
                  <span className="text-xs font-bold">{intel.crm.vipCount}</span>
                </div>
                <div>
                  <p className="text-sm font-bold">VIP Density</p>
                  <p className="text-xs text-muted-foreground">{((intel.crm.vipCount / intel.crm.totalContacts) * 100).toFixed(1)}% of total contacts</p>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-[10px] uppercase font-bold tracking-widest text-primary hover:bg-primary/5 transition-all">
                View Acquisition Map
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
