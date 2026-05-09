import { Card, CardContent } from "@/components/ui/card"
import { Users, Diamond, Briefcase, TrendingUp } from "lucide-react"

export function VIPDashboardWidgets({ totalClients, activeDeals, totalWealthValue }: { totalClients: number, activeDeals: number, totalWealthValue: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-zinc-500">Total VIP Network</h3>
            <Users className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{totalClients}</div>
          <p className="text-xs text-zinc-500 mt-1">High Net Worth connections</p>
        </CardContent>
      </Card>
      
      <Card className="dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-zinc-500">Pipeline Value</h3>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{totalWealthValue}</div>
          <p className="text-xs text-zinc-500 mt-1">Estimated active deals</p>
        </CardContent>
      </Card>

      <Card className="dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-zinc-500">Active Deals</h3>
            <Briefcase className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{activeDeals}</div>
          <p className="text-xs text-zinc-500 mt-1">Currently in negotiation</p>
        </CardContent>
      </Card>

      <Card className="dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-indigo-600 dark:text-indigo-400">Exclusive Offers</h3>
            <Diamond className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">3</div>
          <p className="text-xs text-zinc-500 mt-1">Off-market properties available</p>
        </CardContent>
      </Card>
    </div>
  )
}
