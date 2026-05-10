"use client";

import { useState, useEffect } from "react";
import { Notification } from "@prisma/client";
import { 
  Bell, 
  Check, 
  Clock, 
  ExternalLink, 
  MoreHorizontal,
  X,
  AlertCircle,
  Zap,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const priorityConfig = {
  LOW: { color: "text-gray-400", bg: "bg-gray-400/10", icon: Info },
  MEDIUM: { color: "text-sky-500", bg: "bg-sky-500/10", icon: Info },
  HIGH: { color: "text-orange-500", bg: "bg-orange-500/10", icon: Zap },
  URGENT: { color: "text-red-500", bg: "bg-red-500/10", icon: AlertCircle },
};

export function NotificationCenter({ notifications }: { notifications: Notification[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative hover:bg-primary/10 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse border-2 border-background" />
        )}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 md:w-96 bg-card border border-primary/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-primary/5 flex items-center justify-between bg-primary/5">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-tight">System Alerts</h3>
                <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-none px-1.5 h-4">
                  {unreadCount} New
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setIsOpen(false)}>
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground opacity-50 flex flex-col items-center gap-2">
                  <Bell className="h-8 w-8" />
                  <p className="text-xs">Your operational queue is clear</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const config = priorityConfig[n.priority];
                  const Icon = config.icon;
                  return (
                    <div 
                      key={n.id} 
                      className={cn(
                        "p-4 border-b border-primary/5 last:border-0 hover:bg-primary/5 transition-all cursor-pointer group relative",
                        !n.isRead && "bg-primary/5"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", config.bg)}>
                          <Icon className={cn("h-4 w-4", config.color)} />
                        </div>
                        <div className="space-y-1 pr-4">
                          <p className="text-xs font-bold leading-tight group-hover:text-primary transition-colors">{n.title}</p>
                          <p className="text-[11px] text-muted-foreground leading-snug">{n.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                              {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                      {!n.isRead && (
                        <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-3 bg-primary/5 border-t border-primary/5 flex justify-center">
              <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all">
                View All Intelligence Logs
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
