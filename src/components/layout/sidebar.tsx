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
    <div className={cn("space-y-4 py-4 flex flex-col h-full bg-zinc-950/50 backdrop-blur-xl border-r border-white/5", className)}>
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-10 mr-4 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
            <Bot className="w-6 h-6 text-primary-foreground" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter">
            Nexus <span className="text-primary">OS</span>
          </h1>
        </Link>
        <div className="space-y-1.5">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-semibold cursor-pointer rounded-xl transition-all duration-200 ease-in-out",
                pathname === route.href || pathname.startsWith(`${route.href}/`)
                  ? "bg-primary/10 text-primary shadow-sm shadow-primary/5"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn(
                  "h-5 w-5 mr-3 transition-transform group-hover:scale-110",
                  pathname === route.href || pathname.startsWith(`${route.href}/`) ? route.color : "text-muted-foreground group-hover:" + route.color
                )} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-4 py-4 mt-auto mx-3 mb-2 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></div>
            </div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">System Online</span>
          </div>
          <div className="text-[10px] font-mono text-primary/40 uppercase">v1.0.4</div>
        </div>
      </div>
    </div>
  );
}

