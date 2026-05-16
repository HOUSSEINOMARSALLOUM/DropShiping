"use client";

import { Activity } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Zap, Clock, Terminal, Activity as PulseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ActivityStream({ activities }: { activities: any[] }) {
  return (
    <Card className="h-full bg-card/40 border-primary/5 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary opacity-50" />
            System Pulse
          </div>
          {activities.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] text-primary/70 animate-pulse">LIVE</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[300px] overflow-y-auto px-6 pb-6 scrollbar-none">
          <div className={cn(
            "space-y-4 relative",
            activities.length > 0 && "before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-primary/20 before:via-primary/5 before:to-transparent"
          )}>
            {activities.map((activity) => (
              <div key={activity.id} className="group flex gap-4 relative pl-8 transition-all hover:translate-x-1">
                <div className="absolute left-0 h-6 w-6 rounded-full bg-card border border-primary/10 flex items-center justify-center z-10 shadow-sm group-hover:border-primary/30 transition-colors">
                  <Zap className="h-3 w-3 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[11px] font-medium leading-tight group-hover:text-primary transition-colors">{activity.description}</p>
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
              <div className="flex flex-col items-center justify-center py-12 space-y-4 opacity-40">
                <div className="relative">
                  <PulseIcon className="h-12 w-12 text-primary animate-pulse" />
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">System Idle</p>
                  <p className="text-[9px] text-muted-foreground uppercase italic tracking-tighter">Monitoring business events...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

