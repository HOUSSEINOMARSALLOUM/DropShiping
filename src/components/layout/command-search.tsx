"use client";

import { useState, useEffect } from "react";
import { 
  Command, 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator 
} from "@/components/ui/command";
import { 
  Calculator, 
  Calendar, 
  CreditCard, 
  Settings, 
  Smile, 
  User,
  Search,
  Building2,
  TrendingUp,
  BrainCircuit,
  Terminal
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/10 bg-card/50 text-muted-foreground hover:text-foreground transition-all group"
      >
        <Search className="h-4 w-4" />
        <span className="text-xs font-medium">Search command...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 ml-4 group-hover:bg-primary/10 transition-colors">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-card/50 backdrop-blur-xl border-primary/20 shadow-2xl">
          <CommandInput placeholder="Type a command or search entities..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Intelligence">
              <CommandItem onSelect={() => runCommand(() => router.push("/ai"))}>
                <BrainCircuit className="mr-2 h-4 w-4 text-primary" />
                <span>Executive Briefing</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
                <TrendingUp className="mr-2 h-4 w-4 text-emerald-500" />
                <span>Market Analytics</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Operations">
              <CommandItem onSelect={() => runCommand(() => router.push("/crm"))}>
                <User className="mr-2 h-4 w-4 text-sky-500" />
                <span>CRM Command Center</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/real-estate"))}>
                <Building2 className="mr-2 h-4 w-4 text-orange-500" />
                <span>Asset Portfolio</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/finance"))}>
                <CreditCard className="mr-2 h-4 w-4 text-violet-500" />
                <span>Financial Ledger</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="System">
              <CommandItem onSelect={() => runCommand(() => router.push("/settings/infrastructure"))}>
                <Terminal className="mr-2 h-4 w-4 text-gray-400" />
                <span>Infrastructure Status</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
                <Settings className="mr-2 h-4 w-4" />
                <span>System Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
}
