"use client";

import { Activity } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Zap, Clock, Terminal } from "lucide-react";

export function ActivityStream({ activities }: { activities: any[] }) {
  return (
    <Card className="h-full bg-card/40 border-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary opacity-50" />
          System Pulse
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[300px] overflow-y-auto px-6 pb-6">
          <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-primary/5">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 relative pl-8">
                <div className="absolute left-0 h-6 w-6 rounded-full bg-card border border-primary/10 flex items-center justify-center z-10 shadow-sm">
                  <Zap className="h-3 w-3 text-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[11px] font-medium leading-tight">{activity.description}</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-2.5 w-2.5 text-muted-foreground" />
                    <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">
                      {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <div className="text-center py-6 text-[10px] text-muted-foreground italic uppercase">System idle</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
