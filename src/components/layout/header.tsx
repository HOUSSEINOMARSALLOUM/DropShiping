"use client"

import { Bell, Search, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  return (
    <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-6 bg-zinc-950/50 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 rounded-xl hover:bg-white/5 text-muted-foreground transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden md:flex items-center group">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search command... (⌘ K)"
            className="pl-10 pr-4 py-2 w-72 rounded-xl bg-white/5 border border-white/5 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white/[0.08] outline-none transition-all placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2.5 rounded-xl hover:bg-white/5 text-muted-foreground transition-all hover:text-white active:scale-95 group">
          <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary border-2 border-zinc-950 shadow-[0_0_8px_rgba(var(--primary),0.5)]"></span>
        </button>
        <div className="flex items-center gap-3 pl-2 border-l border-white/5">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-bold text-white leading-none">Abdo M.</span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-tighter">Founder</span>
          </div>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary/80 to-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 cursor-pointer ring-2 ring-white/10 hover:ring-primary/50 transition-all active:scale-95">
            AM
          </div>
        </div>
      </div>
    </header>
  )
}

