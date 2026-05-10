import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar className="hidden lg:flex w-72 border-r bg-card/50 backdrop-blur-xl h-screen sticky top-0" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <MobileNav />
            <Breadcrumbs className="hidden md:flex" />
          </div>
          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
