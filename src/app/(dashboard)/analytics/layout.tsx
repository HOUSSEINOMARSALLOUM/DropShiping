"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navs = [
    { name: 'Executive Overview', href: '/analytics' },
    { name: 'Finance', href: '/analytics/finance' },
    { name: 'CRM Intelligence', href: '/analytics/crm' },
    { name: 'Real Estate', href: '/analytics/real-estate' },
    { name: 'Dropshipping', href: '/analytics/dropshipping' },
    { name: 'AI Engine', href: '/analytics/ai' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Business Intelligence</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Read-only global analytics and cached operational metrics.</p>
      </div>

      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {navs.map((nav) => (
            <Link
              key={nav.name}
              href={nav.href}
              className={cn(
                "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors",
                pathname === nav.href
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 dark:hover:text-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              {nav.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="py-2">
        {children}
      </div>
    </div>
  )
}
