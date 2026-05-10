"use client";

import { Deal, Property, Contact, Commission } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, User, Home, ArrowRight, TrendingUp } from "lucide-react";

interface DealWithExtras extends Deal {
  property: Property;
  contact: Contact;
  commission: Commission | null;
}

export function DealPipeline({ deals }: { deals: DealWithExtras[] }) {
  return (
    <div className="space-y-4">
      {deals.map((deal) => (
        <Card key={deal.id} className="bg-card/40 border-primary/5 hover:border-primary/20 transition-all">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Value & Stage */}
              <div className="flex flex-col items-center justify-center min-w-[140px] p-4 rounded-xl bg-primary/10 border border-primary/20">
                <span className="text-xs font-bold uppercase text-primary/60">Deal Value</span>
                <span className="text-xl font-bold text-primary">${Number(deal.value).toLocaleString()}</span>
                <Badge variant="secondary" className="mt-2 text-[10px] uppercase tracking-tighter">
                  {deal.stage}
                </Badge>
              </div>

              {/* Entity Connection */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Home className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Property</p>
                    <p className="text-sm font-semibold truncate max-w-[200px]">{deal.property.title}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Investor / Client</p>
                    <p className="text-sm font-semibold">{deal.contact.firstName} {deal.contact.lastName}</p>
                  </div>
                </div>
              </div>

              {/* Commission Outlook */}
              <div className="flex items-center gap-4 lg:border-l border-primary/10 lg:pl-6">
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Est. Commission</p>
                  <div className="flex items-center justify-end gap-1.5 text-emerald-500 font-bold">
                    <TrendingUp className="h-4 w-4" />
                    <span>${(Number(deal.value) * 0.03).toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full border-2 border-emerald-500/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
