import { FinanceService } from "@/features/finance/services/finance-service"
import { FinanceDashboardWidgets } from "@/features/finance/components/finance-dashboard-widgets"
import { FinanceCharts } from "@/features/finance/components/finance-charts"
import { TransactionTable } from "@/features/finance/components/transaction-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Download } from "lucide-react"

export default async function FinancePage() {
  const transactions = await FinanceService.getAllTransactions()
  const metrics = await FinanceService.getDashboardMetrics()

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Financial Overview</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Track cross-platform revenue, business expenses, and Wish Money transfers.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-zinc-200 dark:border-zinc-800 hidden sm:flex">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md border-0">
            <Link href="/finance/new">
              <Plus className="w-4 h-4 mr-2" />
              Record Transaction
            </Link>
          </Button>
        </div>
      </div>

      <FinanceDashboardWidgets metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex">
          <FinanceCharts data={metrics.chartData} />
        </div>
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50 mb-4">Cash Flow Insights</h3>
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Shopify Revenue</span>
                <span className="font-medium">$12,450.00</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Stripe Payments</span>
                <span className="font-medium">$5,230.00</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Wish Money Transfers</span>
                <span className="font-medium">$1,890.00</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500">
            *Insights based on platformSource tracking.
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Recent Transactions</h3>
        </div>
        <TransactionTable transactions={transactions as any} />
      </div>
    </div>
  )
}
