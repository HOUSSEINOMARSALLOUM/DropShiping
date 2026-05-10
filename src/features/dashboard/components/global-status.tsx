import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, Coins, Bell, ShieldCheck } from "lucide-react";

interface StatusData {
  health: "HEALTHY" | "DEGRADED";
  revenue: number;
  aiCost: number;
  alertCount: number;
}

export function GlobalStatusBar({ data }: { data: StatusData }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-card/40 border border-primary/5">
        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">System Health</p>
          <p className="text-sm font-bold">{data.health}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-card/40 border border-primary/5">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Activity className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Revenue</p>
          <p className="text-sm font-bold">${data.revenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-card/40 border border-primary/5">
        <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
          <Coins className="h-4 w-4 text-violet-500" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">AI Compute</p>
          <p className="text-sm font-bold">${data.aiCost.toFixed(4)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 rounded-xl bg-card/40 border border-primary/5">
        <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
          <Bell className="h-4 w-4 text-orange-500" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Active Alerts</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">{data.alertCount}</p>
            {data.alertCount > 0 && <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />}
          </div>
        </div>
      </div>
    </div>
  );
}
