"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface FinanceSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
}

export function FinanceSnapshot({ summary }: { summary: FinanceSummary }) {
  return (
    <Card className="h-full bg-card/40 border-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Wallet className="h-4 w-4 text-emerald-500" />
          Finance Ledger
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Revenue</p>
            <div className="flex items-center gap-1 text-emerald-500 font-bold">
              <TrendingUp className="h-3 w-3" />
              <span className="text-sm">${summary.totalRevenue.toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Expenses</p>
            <div className="flex items-center gap-1 text-orange-500 font-bold">
              <TrendingDown className="h-3 w-3" />
              <span className="text-sm">${summary.totalExpenses.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-primary/5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">Net Position</span>
            <span className="text-lg font-bold text-primary">${summary.netProfit.toLocaleString()}</span>
          </div>
          <div className="h-1.5 w-full bg-primary/5 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${(summary.netProfit / summary.totalRevenue) * 100}%` }} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
