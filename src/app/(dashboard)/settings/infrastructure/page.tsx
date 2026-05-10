import { WorkerService } from "@/features/infrastructure/services/worker-service";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Database, 
  AlertCircle,
  Clock,
  HardDrive,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function InfrastructurePage() {
  const health = await WorkerService.getWorkerHealth();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            Infrastructure Command
          </h1>
          <p className="text-muted-foreground">
            Monitor system health, worker queues, and operational observability logs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-card/50">
            <Activity className="mr-2 h-4 w-4" />
            Live Trace
          </Button>
          <Button size="sm" className="shadow-lg shadow-primary/20">
            Export Health Report
          </Button>
        </div>
      </div>

      {/* Global Health Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/40 border-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Worker Cluster</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">8 Nodes</span>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-none">{health.status}</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">Active background executors</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Queue Depth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{health.queueDepth} Tasks</span>
              <Clock className="h-4 w-4 text-primary opacity-50" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">Pending event-driven jobs</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">DB Connection Pool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">14 / 50</span>
              <Database className="h-4 w-4 text-primary opacity-50" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">PostgreSQL session occupancy</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Error Rate (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{health.failureRate.toFixed(2)}%</span>
              <AlertCircle className={health.failureRate > 5 ? "text-red-500" : "text-emerald-500"} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">Aggregated system exceptions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Real-time Observability Chart Placeholder */}
        <Card className="lg:col-span-2 bg-card/40 border-primary/5 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Latency Distribution</CardTitle>
              <p className="text-xs text-muted-foreground">Real-time p95 request latency (ms)</p>
            </div>
            <BarChart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center border-t border-primary/5 bg-primary/5">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Cpu className="h-8 w-8 opacity-20 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase">Live Telemetry Feed Active</span>
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure Inventory */}
        <div className="space-y-6">
          <Card className="bg-card/40 border-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Asset Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HardDrive className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold">S3 Object Store</span>
                </div>
                <span className="text-xs text-muted-foreground font-bold uppercase">842 GB</span>
              </div>
              <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[42%]" />
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                Retention strategy: Automatic archival to Cold Storage after 180 days.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Audit Stream</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between text-[11px] border-b border-primary/5 pb-2 last:border-0">
                    <div className="flex flex-col">
                      <span className="font-bold">AUTH.ROLE_UPDATE</span>
                      <span className="text-muted-foreground">By SuperAdmin • #8421</span>
                    </div>
                    <span className="text-muted-foreground italic">2m ago</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-[10px] uppercase font-bold tracking-widest text-primary hover:bg-primary/5 transition-all">
                Access Audit Vault
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
