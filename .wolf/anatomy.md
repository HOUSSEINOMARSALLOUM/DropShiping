# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-05-14T09:00:00.733Z
> Files: 183 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.gitignore` — Git ignore rules (~135 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `components.json` (~149 tok)
- `eslint.config.mjs` — ESLint flat configuration (~124 tok)
- `LOCAL_READINESS.md` — Nexus OS - Local Readiness & Safety Guide (~409 tok)
- `next-env.d.ts` — / <reference types="next" /> (~72 tok)
- `next.config.ts` — Next.js configuration (~45 tok)
- `package-lock.json` — npm lock file (~95185 tok)
- `package.json` — Node.js package manifest (~343 tok)
- `postcss.config.mjs` — Declares config (~26 tok)
- `README.md` — Project documentation (~363 tok)
- `sentry.client.config.ts` — This file configures the initialization of Sentry on the client. (~210 tok)
- `sentry.edge.config.ts` — This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on). (~169 tok)
- `sentry.server.config.ts` — This file configures the initialization of Sentry on the server. (~156 tok)
- `tsconfig.json` — TypeScript configuration (~192 tok)
- `vercel.json` (~201 tok)

## .claude/

- `settings.json` (~441 tok)

## .claude/rules/

- `openwolf.md` (~313 tok)

## .github/workflows/

- `deploy.yml` — CI: Nexus OS CI/CD (~360 tok)

## prisma/

- `schema.prisma` — Prisma database schema (~2490 tok)
- `seed.ts` — prisma: main (~488 tok)

## src/

- `env.ts` — Deployment Gating Utility (~384 tok)
- `proxy.ts` — Exports proxy, config (~227 tok)

## src/app/

- `globals.css` — Styles: 6 rules, 44 vars, 2 media queries, 2 animations, 3 layers (~849 tok)
- `layout.tsx` — fontSans (~228 tok)
- `page.tsx` — LandingPage (~1463 tok)

## src/app/(auth)/

- `layout.tsx` — AuthLayout (~533 tok)

## src/app/(auth)/login/

- `page.tsx` — LoginPage — renders form (~824 tok)

## src/app/(dashboard)/

- `layout.tsx` — DashboardLayout (~342 tok)

## src/app/(dashboard)/ai/

- `page.tsx` — AIPage — renders chart (~2157 tok)

## src/app/(dashboard)/analytics/

- `layout.tsx` — AnalyticsLayout (~498 tok)
- `page.tsx` — AnalyticsPage — renders chart (~1905 tok)

## src/app/(dashboard)/analytics/ai/

- `page.tsx` — AIAnalyticsPage — renders chart (~238 tok)

## src/app/(dashboard)/analytics/crm/

- `page.tsx` — CRMAnalyticsPage — renders chart (~258 tok)

## src/app/(dashboard)/analytics/dropshipping/

- `page.tsx` — DropshippingAnalyticsPage — renders chart (~274 tok)

## src/app/(dashboard)/analytics/finance/

- `page.tsx` — FinanceAnalyticsPage — renders chart (~268 tok)

## src/app/(dashboard)/analytics/real-estate/

- `page.tsx` — RealEstateAnalyticsPage — renders chart (~250 tok)

## src/app/(dashboard)/automation/

- `page.tsx` — AutomationPage — renders form (~478 tok)

## src/app/(dashboard)/crm/

- `page.tsx` — CRMPage (~654 tok)

## src/app/(dashboard)/crm/[id]/

- `page.tsx` — ContactDetailPage — renders map (~1503 tok)

## src/app/(dashboard)/crm/new/

- `page.tsx` — NewClientPage (~240 tok)

## src/app/(dashboard)/dashboard/

- `page.tsx` — ExecutiveCommandCenter (~1579 tok)

## src/app/(dashboard)/dropshipping/

- `page.tsx` — DropshippingPage (~782 tok)

## src/app/(dashboard)/dropshipping/import/

- `page.tsx` — ImportPage (~250 tok)

## src/app/(dashboard)/finance/

- `page.tsx` — FinancePage (~1010 tok)

## src/app/(dashboard)/finance/new/

- `page.tsx` — NewTransactionPage (~247 tok)

## src/app/(dashboard)/real-estate/

- `page.tsx` — RealEstatePage (~814 tok)

## src/app/(dashboard)/real-estate/new/

- `page.tsx` — NewPropertyPage (~312 tok)

## src/app/(dashboard)/real-estate/pipeline/

- `page.tsx` — PipelinePage (~776 tok)

## src/app/(dashboard)/settings/infrastructure/

- `page.tsx` — InfrastructurePage — renders chart (~2207 tok)

## src/app/api/health/

- `route.ts` — Next.js API route: GET (~197 tok)

## src/application/event-handlers/

- `finance-handlers.ts` — Exports registerFinanceHandlers (~264 tok)

## src/application/services/

- `ai-service.ts` — AI execution is read-only. Insights are emitted as events or returned as suggestions. (~428 tok)
- `audit-service.ts` — Central Audit Logging enforced by the Event Bus for every system event. (~169 tok)
- `automation-service.ts` — Automation Layer reacts to events emitted by the Service Layer. (~447 tok)
- `contact-service.ts` — Exports ContactService (~243 tok)
- `finance-service.ts` — The Finance Domain is highly sensitive. (~389 tok)
- `notification-service.ts` — Sending notifications is a side effect. It must be enqueued, never blocking the domain service. (~251 tok)
- `real-estate-service.ts` — Exports RealEstateService (~312 tok)

## src/components/layout/

- `breadcrumbs.tsx` — Breadcrumbs (~219 tok)
- `command-search.tsx` — CommandSearch — uses useState, useRouter, useEffect (~1123 tok)
- `header.tsx` — Header (~470 tok)
- `mobile-nav.tsx` — MobileNav (~105 tok)
- `sidebar.tsx` — routes (~804 tok)
- `user-nav.tsx` — UserNav — uses useState (~521 tok)

## src/components/ui/

- `avatar.tsx` — Avatar (~402 tok)
- `badge.tsx` — badgeVariants (~323 tok)
- `button.tsx` — buttonVariants (~525 tok)
- `card.tsx` — Card (~528 tok)
- `command.tsx` — Command — renders modal (~1380 tok)
- `dialog.tsx` — Dialog — renders modal (~1100 tok)
- `dropdown-menu.tsx` — DropdownMenu (~2496 tok)
- `input.tsx` — Input (~298 tok)
- `select.tsx` — Select (~1902 tok)
- `separator.tsx` — Separator (~156 tok)
- `table.tsx` — Table — renders table (~790 tok)
- `tabs.tsx` — Tabs (~1000 tok)
- `textarea.tsx` — Textarea (~221 tok)
- `tooltip.tsx` — TooltipProvider (~814 tok)

## src/events/

- `event-dispatcher.ts` — Universal Dispatcher with automatic traceability and architectural validation. (~270 tok)
- `event-types.ts` — Exports DomainEvent, EventPayload (~144 tok)

## src/features/ai/

- `actions.ts` — Exports runAIGenerationAction (~146 tok)
- `types.ts` — AI Generation Task Types (~401 tok)

## src/features/ai/components/

- `ai-playground.tsx` — AIPlayground — uses useState (~1239 tok)
- `executive-briefing.tsx` — ExecutiveBriefingPanel (~1097 tok)
- `generation-history.tsx` — GenerationHistory — renders table (~694 tok)

## src/features/ai/prompts/

- `registry.ts` — Exports PromptRegistry (~363 tok)

## src/features/ai/services/

- `ai-service.ts` — Universal AI Execution Engine with observability and cost control. (~950 tok)
- `orchestrator.ts` — Exports AIOrchestrator (~828 tok)

## src/features/ai/types/

- `index.ts` — Exports AIProvider, AIResponse, ExecutiveBriefing, DomainScore (~197 tok)

## src/features/analytics/

- `dto.ts` — Exports MetricDTO, TimeSeriesDTO, DistributionDTO, ExecutiveInsightsDTO + 5 more (~381 tok)
- `types.ts` — Exports AnalyticsReport (~48 tok)

## src/features/analytics/components/

- `intelligence-card.tsx` — IntelligenceCard (~458 tok)
- `metric-card.tsx` — MetricCard (~321 tok)
- `reusable-charts.tsx` — TrendChart — renders chart (~1260 tok)
- `revenue-chart.tsx` — RevenueChart — renders chart (~674 tok)

## src/features/analytics/services/

- `ai-aggregator.ts` — Exports AIAggregator (~433 tok)
- `analytics-service.ts` — Exports AnalyticsService (~691 tok)
- `cache-layer.ts` — CacheLayer handles data caching logic. (~192 tok)
- `crm-aggregator.ts` — Exports CRMAggregator (~584 tok)
- `dropshipping-aggregator.ts` — Exports DropshippingAggregator (~458 tok)
- `executive-aggregator.ts` — Exports ExecutiveAggregator (~580 tok)
- `finance-aggregator.ts` — Exports FinanceAggregator (~448 tok)
- `real-estate-aggregator.ts` — Exports RealEstateAggregator (~513 tok)

## src/features/analytics/types/

- `index.ts` — Exports KPIDTO, ChartDataPoint, DomainIntelligence (~188 tok)

## src/features/auth/

- `types.ts` — Exports Admin, AdminSettings (~66 tok)

## src/features/automation/

- `actions.ts` — Exports runBackgroundWorkerAction, enqueueTaskAction (~238 tok)
- `types.ts` — Exports TaskStatus, TaskType, TaskPayload, SystemTask (~166 tok)

## src/features/automation/components/

- `notification-center.tsx` — priorityConfig — uses useState (~1418 tok)
- `queue-dashboard.tsx` — QueueDashboard — renders table (~1352 tok)

## src/features/automation/integrations/

- `email.ts` — Exports EmailIntegration (~365 tok)
- `whatsapp.ts` — Exports WhatsAppIntegration (~142 tok)

## src/features/automation/services/

- `automation-service.ts` — Primary entry point for any domain event in the system. (~790 tok)
- `notification-service.ts` — Exports NotificationService (~291 tok)
- `queue-service.ts` — Enqueue a new background task (~528 tok)
- `worker.ts` — Exports BackgroundWorker (~607 tok)

## src/features/automation/types/

- `index.ts` — Exports SystemEvent, AutomationPayload, NotificationDTO (~148 tok)

## src/features/crm/

- `actions.ts` — API routes: GET (11 endpoints) (~440 tok)
- `types.ts` — Zod schemas: ClientSchema (~508 tok)

## src/features/crm/actions/

- `contact-actions.ts` — Exports createContactAction, addNoteAction (~340 tok)

## src/features/crm/components/

- `activity-timeline.tsx` — iconMap (~471 tok)
- `client-form.tsx` — ClientForm — renders form — uses useState, useRouter (~1519 tok)
- `client-table.tsx` — ClientTable — renders table (~1660 tok)
- `contact-list.tsx` — ContactList (~1188 tok)
- `contact-notes.tsx` — ContactNotes — uses useState (~516 tok)
- `contact-reminders.tsx` — ContactReminders (~536 tok)
- `vip-dashboard-widgets.tsx` — VIPDashboardWidgets (~822 tok)

## src/features/crm/services/

- `client-service.ts` — Exports ClientService (~314 tok)
- `contact-service.ts` — Exports ContactService (~556 tok)

## src/features/crm/types/

- `index.ts` — Zod schemas: ContactSchema, NoteSchema, ReminderSchema (~301 tok)

## src/features/dashboard/

- `types.ts` — Exports KPIMetric (~37 tok)

## src/features/dashboard/components/

- `activity-stream.tsx` — ActivityStream (~605 tok)
- `ai-brief.tsx` — AIExecutiveBrief (~543 tok)
- `crm-alerts.tsx` — CRMAlerts (~615 tok)
- `deals-pipeline.tsx` — DealsPipeline (~457 tok)
- `finance-snapshot.tsx` — FinanceSnapshot (~647 tok)
- `global-status.tsx` — GlobalStatusBar (~724 tok)

## src/features/dropshipping/

- `actions.ts` — API routes: GET (1 endpoints) (~482 tok)
- `types.ts` — Base Types from Prisma (~366 tok)

## src/features/dropshipping/components/

- `product-card.tsx` — ProductCard (~1268 tok)
- `product-import-form.tsx` — ProductImportForm — renders form — uses useState, useRouter (~535 tok)

## src/features/dropshipping/services/

- `ai-pipeline.ts` — Exports AIPipelineService (~199 tok)
- `product-service.ts` — Exports ProductService (~337 tok)
- `shopify-service.ts` — Exports ShopifyService (~171 tok)

## src/features/finance/

- `actions.ts` — API routes: GET (8 endpoints) (~413 tok)
- `types.ts` — Zod schemas: TransactionSchema (~302 tok)

## src/features/finance/actions/

- `finance-actions.ts` — Exports recordTransactionAction, requestWithdrawalAction (~309 tok)

## src/features/finance/components/

- `finance-charts.tsx` — FinanceCharts — renders chart (~631 tok)
- `finance-dashboard-widgets.tsx` — FinanceDashboardWidgets (~942 tok)
- `finance-stats.tsx` — FinanceStats (~524 tok)
- `transaction-form.tsx` — TransactionForm — renders form — uses useState, useRouter (~1462 tok)
- `transaction-table.tsx` — TransactionTable — renders table (~1077 tok)

## src/features/finance/services/

- `finance-service.ts` — Exports FinanceService (~680 tok)

## src/features/finance/types/

- `index.ts` — Zod schemas: TransactionSchema, WithdrawalSchema (~248 tok)

## src/features/infrastructure/services/

- `audit-service.ts` — Record critical system mutations for compliance and security auditing. (~308 tok)
- `storage-service.ts` — Abstracted file upload logic with provider-agnostic implementation. (~418 tok)
- `worker-service.ts` — Monitor health of system components and record metrics. (~410 tok)

## src/features/integrations/api/

- `token-service.ts` — Generates a new secure API token for external integrations. (~355 tok)

## src/features/integrations/services/

- `briefing-service.ts` — Orchestrates the daily intelligence briefing using AI and domain analytics. (~336 tok)
- `integration-service.ts` — Abstracted gateway for all external provider communications. (~534 tok)

## src/features/notifications/

- `actions.ts` — Exports markNotificationReadAction, markAllNotificationsReadAction (~116 tok)
- `types.ts` — Exports NotificationType, Notification, NotificationInput (~104 tok)

## src/features/notifications/components/

- `notification-bell.tsx` — NotificationBell — uses useState (~1003 tok)

## src/features/notifications/services/

- `notification-service.ts` — Exports NotificationService (~238 tok)

## src/features/real-estate/

- `actions.ts` — API routes: GET (15 endpoints) (~484 tok)
- `types.ts` — Zod schemas: PropertySchema (~410 tok)

## src/features/real-estate/actions/

- `real-estate-actions.ts` — Exports createPropertyAction, scheduleViewingAction, closeDealAction (~377 tok)

## src/features/real-estate/components/

- `deal-pipeline.tsx` — DealPipeline (~1004 tok)
- `property-card.tsx` — PropertyCard — renders map (~1182 tok)
- `property-form.tsx` — PropertyForm — renders form — uses useState, useRouter (~1777 tok)
- `property-grid.tsx` — PropertyGrid — renders map (~992 tok)

## src/features/real-estate/services/

- `property-service.ts` — Exports PropertyService (~268 tok)
- `real-estate-service.ts` — Exports RealEstateService (~950 tok)

## src/features/real-estate/types/

- `index.ts` — Zod schemas: PropertySchema, ViewingSchema, DealSchema (~385 tok)

## src/infrastructure/db/

- `db.ts` — Exports db (~82 tok)

## src/infrastructure/guards/

- `system-guards.ts` — Enforce domain isolation at runtime. (~313 tok)

## src/infrastructure/logger/

- `logger.ts` — Exports Logger (~116 tok)

## src/infrastructure/queue/

- `worker-dispatcher.ts` — Dispatches non-blocking side effects to the background infrastructure. (~436 tok)

## src/lib/

- `audit-logger.ts` — Log administrative and destructive actions to the database securely (~343 tok)
- `db.ts` — Exports db (~65 tok)
- `logger.ts` — Exports Logger (~382 tok)
- `utils.ts` — Exports cn (~49 tok)

## src/types/

- `index.ts` — Exports NavItem, User (~60 tok)
