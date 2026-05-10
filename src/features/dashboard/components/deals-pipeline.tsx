"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Home, ArrowRight, DollarSign } from "lucide-react";

export function DealsPipeline({ deals }: { deals: any[] }) {
  return (
    <Card className="h-full bg-card/40 border-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Building2 className="h-4 w-4 text-orange-500" />
          Pipeline Velocity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {deals.slice(0, 4).map((deal) => (
          <div key={deal.id} className="p-3 rounded-xl bg-background/40 border border-primary/5 group hover:border-primary/20 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">{deal.stage}</span>
              <span className="text-xs font-bold text-foreground">${Number(deal.value).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-3 w-3 text-muted-foreground" />
              <p className="text-[11px] font-medium truncate">{deal.property.title}</p>
            </div>
          </div>
        ))}
        {deals.length === 0 && (
          <div className="text-center py-6 text-[10px] text-muted-foreground italic uppercase">No active deals</div>
        )}
      </CardContent>
    </Card>
  );
}
