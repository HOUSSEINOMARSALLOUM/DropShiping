"use client"

import { Bell, Search, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500">
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-4 py-2 w-64 rounded-full bg-zinc-100 dark:bg-zinc-900 border-none text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-zinc-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-zinc-950"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md cursor-pointer ring-2 ring-transparent hover:ring-indigo-500 transition-all">
          A
        </div>
      </div>
    </header>
  )
}
