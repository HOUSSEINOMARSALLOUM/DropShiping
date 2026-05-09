import { Card, CardContent } from "@/components/ui/card"
import { MetricDTO } from "../dto"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function MetricCard({ metric }: { metric: MetricDTO }) {
  return (
    <Card className="dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <h3 className="tracking-tight text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
          {metric.label}
        </h3>
        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          {metric.value}
        </div>
        <div className={`text-xs mt-2 flex items-center gap-1 font-medium ${
          metric.trend === 0 ? 'text-zinc-500' : metric.isPositive ? 'text-emerald-500' : 'text-red-500'
        }`}>
          {metric.trend === 0 ? <Minus className="h-3 w-3" /> : metric.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {metric.trend !== 0 && `${metric.trend}%`} {metric.trendLabel}
        </div>
      </CardContent>
    </Card>
  )
}
