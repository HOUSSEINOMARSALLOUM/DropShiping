import { EventBus } from "@/events/event-dispatcher";
import { NotificationService } from "./notification-service";
import { Logger } from "@/infrastructure/logger/logger";
import { NotificationPriority } from "@prisma/client";

export class AutomationService {
  /**
   * Automation Layer reacts to events emitted by the Service Layer.
   * It handles cross-domain triggers and side effects like notifications.
   */
  static registerHandlers() {
    Logger.info("Registering Automation Event Handlers", "AutomationService");

    EventBus.subscribe("CRM.LEAD_CREATED", async (event) => {
      if (event.data.isVip) {
        await NotificationService.createNotification({
          title: "New VIP Lead",
          message: `${event.data.firstName} ${event.data.lastName} joined the pipeline.`,
          priority: NotificationPriority.URGENT,
          type: "CRM_ALERT"
        });
      }
    });

    EventBus.subscribe("REAL_ESTATE.DEAL_WON", async (event) => {
      await NotificationService.createNotification({
        title: "Deal Closed",
        message: `High-value deal for ${event.data.property.title} completed.`,
        priority: NotificationPriority.HIGH,
        type: "DEAL_ALERT"
      });
    });

    EventBus.subscribe("FINANCE.WITHDRAWAL_REQUESTED", async (event) => {
      await NotificationService.createNotification({
        title: "Withdrawal Authorization",
        message: `Amount: $${event.data.amount} pending approval.`,
        priority: NotificationPriority.MEDIUM,
        type: "FINANCE_ALERT"
      });
    });
  }
}
