import { AnalyticsService } from "@/features/analytics/services/analytics-service";
import { AIService } from "@/features/ai/services/ai-service";
import { FinanceService } from "@/features/finance/services/finance-service";
import { RealEstateService } from "@/features/real-estate/services/real-estate-service";
import { ContactService } from "@/features/crm/services/contact-service";
import { WorkerService } from "@/features/infrastructure/services/worker-service";
import { NotificationService } from "@/features/automation/services/notification-service";
import { db } from "@/infrastructure/db/db";

import { GlobalStatusBar } from "@/features/dashboard/components/global-status";
import { AIExecutiveBrief } from "@/features/dashboard/components/ai-brief";
import { CRMAlerts } from "@/features/dashboard/components/crm-alerts";
import { FinanceSnapshot } from "@/features/dashboard/components/finance-snapshot";
import { DealsPipeline } from "@/features/dashboard/components/deals-pipeline";
import { ActivityStream } from "@/features/dashboard/components/activity-stream";

import { Button } from "@/components/ui/button";
import { Command, LayoutDashboard, RefreshCcw } from "lucide-react";

export default async function ExecutiveCommandCenter() {
  // Aggregate data using existing service layer (Server-first fetching)
  const [
    intel,
    financeSummary,
    pipeline,
    contacts,
    health,
    unreadCount,
    recentActivities,
  ] = await Promise.all([
    AnalyticsService.getExecutiveIntelligence(),
    FinanceService.getFinancialSummary(),
    RealEstateService.getPipeline(),
    ContactService.getAll(),
    WorkerService.getWorkerHealth(),
    NotificationService.getUnreadCount(),
    db.activity.findMany({ 
      orderBy: { createdAt: "desc" }, 
      take: 20,
      include: { contact: true }
    })
  ]);

  // Generate briefing with analytics context
  const briefingResponse = await AIService.generateExecutiveBriefing(intel);

  const statusData = {
    health: health.status as "HEALTHY" | "DEGRADED",
    revenue: financeSummary.totalRevenue,
    aiCost: briefingResponse.usage.estimatedCost,
    alertCount: unreadCount
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Meta Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            Executive Command Center
          </h1>
          <p className="text-muted-foreground">
            Unified real-time operational oversight across all business domains.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-card/40 border-primary/10">
            <RefreshCcw className="mr-2 h-3.5 w-3.5 opacity-50" />
            Full Re-Sync
          </Button>
          <Button size="sm" className="shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
            <Command className="mr-2 h-4 w-4" />
            Operational Actions
          </Button>
        </div>
      </div>

      {/* A. Global Status Bar */}
      <GlobalStatusBar data={statusData} />

      {/* 6-Panel Executive Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* B. AI Executive Brief */}
        <div className="lg:col-span-1">
          <AIExecutiveBrief briefing={briefingResponse.data} />
        </div>

        {/* C. CRM Alerts */}
        <div className="lg:col-span-1">
          <CRMAlerts contacts={contacts as any} />
        </div>

        {/* D. Finance Snapshot */}
        <div className="lg:col-span-1">
          <FinanceSnapshot summary={financeSummary} />
        </div>

        {/* E. Deals Pipeline */}
        <div className="lg:col-span-1">
          <DealsPipeline deals={pipeline as any} />
        </div>

        {/* F. Activity Stream */}
        <div className="lg:col-span-2">
          <ActivityStream activities={recentActivities} />
        </div>
      </div>

      {/* Analytics Attribution Hook */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Strategic Readiness</p>
            <p className="text-xs text-muted-foreground">System is operating at peak efficiency across 4 domains.</p>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-primary/20 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">94%</span>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-500/10 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">AI Intelligence Gain</p>
            <p className="text-xs text-muted-foreground">Automated lead scoring and revenue forecasting enabled.</p>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-violet-500/20 flex items-center justify-center">
            <span className="text-xs font-bold text-violet-500">+12%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
