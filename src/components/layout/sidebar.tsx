"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  Briefcase,
  Activity,
  Bot
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Automation AI",
    icon: Bot,
    href: "/automation",
    color: "text-violet-500",
  },
  {
    label: "CRM",
    icon: Users,
    href: "/crm",
    color: "text-pink-500",
  },
  {
    label: "Projects",
    icon: Briefcase,
    href: "/projects",
    color: "text-orange-500",
  },
  {
    label: "Finance",
    icon: CreditCard,
    href: "/finance",
    color: "text-emerald-500",
  },
  {
    label: "Analytics",
    icon: Activity,
    href: "/analytics",
    color: "text-yellow-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-400",
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("space-y-4 py-4 flex flex-col h-full", className)}>
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4 bg-primary rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Nexus <span className="text-primary">OS</span>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition-all",
                pathname === route.href || pathname.startsWith(`${route.href}/`)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 mt-auto border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground font-medium">System Online</span>
        </div>
      </div>
    </div>
  );
}
