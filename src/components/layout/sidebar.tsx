"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Building2,
  Wallet,
  Bot,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Dropshipping",
    icon: ShoppingCart,
    href: "/dropshipping",
    color: "text-violet-500",
  },
  {
    label: "CRM",
    icon: Users,
    href: "/crm",
    color: "text-pink-700",
  },
  {
    label: "Real Estate",
    icon: Building2,
    href: "/real-estate",
    color: "text-orange-700",
  },
  {
    label: "Finance",
    icon: Wallet,
    href: "/finance",
    color: "text-emerald-500",
  },
  {
    label: "AI Automations",
    icon: Bot,
    href: "/ai",
    color: "text-green-700",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
    color: "text-white",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-zinc-900 text-white w-64 border-r border-zinc-800 transition-all duration-300">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-2">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Nexus OS
          </h1>
        </Link>
      </div>

      <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group hover:bg-zinc-800/50",
              pathname === route.href ? "bg-zinc-800 text-white" : "text-zinc-400"
            )}
          >
            <route.icon className={cn("h-5 w-5", route.color)} />
            <span className="font-medium">{route.label}</span>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-zinc-800">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <button
          className="flex items-center gap-3 px-3 py-3 w-full rounded-lg transition-all duration-200 text-zinc-400 hover:bg-red-500/10 hover:text-red-500 mt-1"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
