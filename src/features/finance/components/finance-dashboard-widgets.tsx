import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, ArrowRightLeft } from "lucide-react"

interface MetricsProps {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  totalWithdrawals: number
}

export function FinanceDashboardWidgets({ metrics }: { metrics: MetricsProps }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-zinc-500">Gross Revenue</h3>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(metrics.totalRevenue)}</div>
          <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">+14% from last month</p>
        </CardContent>
      </Card>

      <Card className="dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-zinc-500">Total Expenses</h3>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(metrics.totalExpenses)}</div>
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">+5% from last month</p>
        </CardContent>
      </Card>

      <Card className="dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-indigo-600 dark:text-indigo-400">Net Profit</h3>
            <DollarSign className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(metrics.netProfit)}</div>
          <p className="text-xs text-zinc-500 mt-1">
            Margin: {metrics.totalRevenue > 0 ? ((metrics.netProfit / metrics.totalRevenue) * 100).toFixed(1) : 0}%
          </p>
        </CardContent>
      </Card>

      <Card className="dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-zinc-500">Withdrawals</h3>
            <ArrowRightLeft className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{formatCurrency(metrics.totalWithdrawals)}</div>
          <p className="text-xs text-zinc-500 mt-1">Transferred out</p>
        </CardContent>
      </Card>
    </div>
  )
}
