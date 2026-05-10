import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight, Shield, Zap, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Abstract Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] -z-10" />

      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
            <Bot className="text-primary-foreground h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">Nexus OS</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link href="#enterprise" className="text-sm font-medium hover:text-primary transition-colors">Enterprise</Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/20">
            <Link href="/dashboard">Launch OS <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="px-6 pt-24 pb-12 lg:pt-32 lg:pb-24 text-center">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4 animate-bounce">
              <Zap className="h-3 w-3" />
              v2.0 Now Live
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter lg:leading-[1.1]">
              The Operating System for <br />
              <span className="bg-gradient-to-r from-primary via-violet-400 to-sky-400 bg-clip-text text-transparent">
                Autonomous Business.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Scale your operations with AI-driven automation, real-time intelligence, and a unified command center designed for the next generation of industry leaders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full" asChild>
                <Link href="/dashboard">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full backdrop-blur-sm">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="px-6 py-24 bg-card/30 border-y border-border/40">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: "Enterprise Security",
                desc: "Military-grade encryption and granular access controls for your sensitive business data."
              },
              {
                icon: Zap,
                title: "Hyper-Automation",
                desc: "Custom AI agents that handle repetitive tasks, from CRM management to financial reporting."
              },
              {
                icon: Globe,
                title: "Global Scalability",
                desc: "Built on edge-ready architecture to serve your teams and customers anywhere in the world."
              }
            ].map((f, i) => (
              <div key={i} className="space-y-4 p-8 rounded-2xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all group">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-6 py-12 border-t border-border/40 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 Nexus OS. Built for those who lead.
        </p>
      </footer>
    </div>
  );
}
