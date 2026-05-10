import { FinanceService } from "@/features/finance/services/finance-service";
import { FinanceStats } from "@/features/finance/components/finance-stats";
import { TransactionTable } from "@/features/finance/components/transaction-table";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter, Wallet } from "lucide-react";

export default async function FinancePage() {
  const [summary, transactions] = await Promise.all([
    FinanceService.getFinancialSummary(),
    FinanceService.getTransactions()
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Wallet className="h-8 w-8 text-primary" />
            Financial Ledger
          </h1>
          <p className="text-muted-foreground">
            Unified capital tracking across CRM leads and Real Estate assets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-card/50">
            <Download className="mr-2 h-4 w-4" />
            Export Statement
          </Button>
          <Button className="shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      <FinanceStats summary={summary} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Recent Activity</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Category
          </Button>
        </div>
        <TransactionTable transactions={transactions as any} />
      </div>

      {/* Analytics-Ready Forecasting Placeholder */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-2xl bg-card/30 border border-primary/5 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Cash Flow Forecast</h3>
          <div className="h-[120px] flex items-center justify-center border border-dashed border-primary/10 rounded-xl bg-background/50 text-muted-foreground text-xs">
            Integrated forecasting model pending historical data accumulation...
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-card/30 border border-primary/5 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Attribution Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span>Real Estate Commission</span>
              <span className="font-bold">64%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[64%]" />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>CRM Consultation</span>
              <span className="font-bold">22%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 w-[22%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
