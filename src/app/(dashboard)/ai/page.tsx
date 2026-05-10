import { AIService } from "@/features/ai/services/ai-service";
import { AnalyticsService } from "@/features/analytics/services/analytics-service";
import { ExecutiveBriefingPanel } from "@/features/ai/components/executive-briefing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  Coins, 
  BarChart,
  BrainCircuit,
  Settings2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AIPage() {
  // Aggregate cross-domain context for the AI
  const context = await AnalyticsService.getExecutiveIntelligence();
  const briefingResponse = await AIService.generateExecutiveBriefing(context);
  const briefing = briefingResponse.data;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-primary" />
            Neural Orchestration
          </h1>
          <p className="text-muted-foreground">
            Manage provider abstractions, prompt registries, and cross-domain business intelligence.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-card/50">
            <Settings2 className="mr-2 h-4 w-4" />
            Provider Config
          </Button>
          <Button size="sm" className="shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
            <Sparkles className="mr-2 h-4 w-4" />
            Re-Sync Intelligence
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Cost & Usage Intelligence */}
        <Card className="bg-card/40 border-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Compute Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{briefingResponse.usage.totalTokens}</span>
              <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                <Cpu className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">Tokens consumed / session</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Operational Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-emerald-500">${briefingResponse.usage.estimatedCost.toFixed(4)}</span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/5 flex items-center justify-center">
                <Coins className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">Estimated provider billing</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{briefingResponse.model}</span>
              <Badge variant="outline" className="text-[10px] bg-primary/5 border-primary/10">{briefingResponse.provider}</Badge>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">Tier 1 reasoning engine</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Safety & Guardrails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-emerald-500">
              <span className="text-sm font-bold uppercase tracking-widest">Active</span>
              <ShieldAlert className="h-4 w-4" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">Strict domain isolation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Briefing Panel */}
        <div className="lg:col-span-2">
          <ExecutiveBriefingPanel briefing={briefing} />
        </div>

        {/* AI Insight Logs */}
        <div className="space-y-6">
          <Card className="bg-card/40 border-primary/5">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Neural Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 relative pl-10">
                    <div className="absolute left-0 h-8 w-8 rounded-full bg-card border border-primary/10 flex items-center justify-center z-10">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[11px] font-bold leading-tight">Prompt: EXECUTIVE_BRIEFING</p>
                      <p className="text-[10px] text-muted-foreground italic truncate max-w-[200px]">Successfully cross-referenced CRM and Finance datasets.</p>
                      <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter mt-1">2m ago • 842 Tokens</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-primary/5 transition-all">
                Full Audit Trail
              </Button>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-primary/10 border border-primary/5 space-y-4">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-widest">AI Scoring System</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Proprietary algorithms analyze contact behavior and transaction velocity to predict future revenue attribution.
            </p>
            <Button className="w-full bg-primary shadow-lg shadow-primary/20 text-xs font-bold">
              Run Lead Scoring Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
