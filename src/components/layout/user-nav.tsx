"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationCenter } from "@/features/automation/components/notification-center";
import { CommandSearch } from "@/components/layout/command-search";
import { useState } from "react";

export function UserNav() {
  // Mock data for initial UI state - in production this would be fetched/pushed
  const [notifications] = useState([
    {
      id: "1",
      title: "VIP Lead Detected",
      message: "Houssein S. has entered the pipeline as a VIP.",
      priority: "URGENT",
      isRead: false,
      type: "CRM_ALERT",
      link: "/crm",
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
      updatedAt: new Date()
    },
    {
      id: "2",
      title: "Deal Closed",
      message: "Penthouse Deal $2.4M won successfully.",
      priority: "HIGH",
      isRead: false,
      type: "DEAL_ALERT",
      link: "/real-estate/pipeline",
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
      updatedAt: new Date()
    }
  ]);

  return (
    <div className="flex items-center gap-4">
      <CommandSearch />
      
      <NotificationCenter notifications={notifications as any} />

      <div className="flex items-center gap-3 pl-2 border-l border-border">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-semibold tracking-tight text-foreground">Abdo M.</span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Founder</span>
        </div>
        <Avatar className="h-9 w-9 border-2 border-primary/20 shadow-lg shadow-primary/10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@abdom" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
