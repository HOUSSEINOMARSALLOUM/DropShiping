import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative h-24 w-24 bg-zinc-900 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl">
          <Bot className="h-12 w-12 text-primary animate-bounce" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg">
          404
        </div>
      </div>

      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Signal <span className="text-primary">Lost</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          The tactical route you're looking for doesn't exist or has been decommissioned. 
          The Nexus OS core remains operational.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10">
          <Link href="javascript:history.back()">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Link>
        </Button>
        <Button asChild className="rounded-xl shadow-lg shadow-primary/20">
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Return to Command Center
          </Link>
        </Button>
      </div>

      <div className="absolute bottom-8 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] opacity-30">
        Nexus OS // Error Registry // Route_Not_Found
      </div>
    </div>
  );
}
