"use client";

import { ExecutiveBriefing } from "@/features/ai/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertTriangle, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIExecutiveBrief({ briefing }: { briefing: ExecutiveBriefing }) {
  return (
    <Card className="h-full bg-gradient-to-br from-primary/5 via-card/40 to-card/40 border-primary/10 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Intelligence
        </CardTitle>
        <Badge variant="outline" className="bg-primary/5 text-[10px] text-primary border-primary/20">
          {briefing.sentiment}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs leading-relaxed italic text-foreground/80">
          "{briefing.summary}"
        </p>
        
        <div className="space-y-2">
          {briefing.criticalAlerts.slice(0, 2).map((alert, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-orange-500/5 border border-orange-500/10 text-[11px]">
              <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5" />
              <span>{alert}</span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/10">
            Execute Actions
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
