"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";

interface FinanceSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  transactionCount: number;
}

export function FinanceStats({ summary }: { summary: FinanceSummary }) {
  const stats = [
    {
      title: "Gross Revenue",
      value: `$${summary.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Total Expenses",
      value: `$${summary.totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "Net Position",
      value: `$${summary.netProfit.toLocaleString()}`,
      icon: Wallet,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      title: "Volume",
      value: summary.transactionCount.toString(),
      icon: DollarSign,
      color: "text-sky-500",
      bg: "bg-sky-500/10"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card/40 border-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
