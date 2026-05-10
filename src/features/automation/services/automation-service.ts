import { db } from "@/lib/db";
import { AutomationPayload, SystemEvent } from "../types";
import { NotificationService } from "./notification-service";
import { ActivityType, NotificationPriority } from "@prisma/client";

export class AutomationService {
  /**
   * Primary entry point for any domain event in the system.
   * This method decouples the domain logic from the automation workflows.
   */
  static async triggerEvent(event: SystemEvent, metadata: Record<string, any>) {
    const payload: AutomationPayload = {
      eventId: Math.random().toString(36).substring(7),
      eventType: event,
      timestamp: new Date(),
      metadata,
    };

    // 1. Log the trigger for observability
    console.log(`[Automation] Triggered: ${event}`, payload.eventId);

    // 2. Dispatch to internal handlers (simulating Queue-based execution)
    await this.processEvent(payload);
  }

  /**
   * Internal processor - this is where workers would pick up jobs in a production BullMQ setup.
   */
  private static async processEvent(payload: AutomationPayload) {
    const { eventType, metadata } = payload;

    switch (eventType) {
      case "DEAL.WON":
        await NotificationService.createNotification({
          title: "Deal Closed Successfully",
          message: `Congratulations! Deal worth $${metadata.value} for ${metadata.propertyTitle} is closed.`,
          priority: NotificationPriority.HIGH,
          type: "DEAL_ALERT",
          link: `/real-estate/pipeline`
        });
        break;

      case "LEAD.CREATED":
        if (metadata.isVip) {
          await NotificationService.createNotification({
            title: "VIP Lead Detected",
            message: `${metadata.name} has entered the pipeline as a high-value lead.`,
            priority: NotificationPriority.URGENT,
            type: "CRM_ALERT",
            link: `/crm/${metadata.id}`
          });
        }
        break;

      case "FINANCE.WITHDRAWAL_REQUESTED":
        await NotificationService.createNotification({
          title: "Withdrawal Authorization Required",
          message: `A new withdrawal request of $${metadata.amount} via ${metadata.method} is pending.`,
          priority: NotificationPriority.MEDIUM,
          type: "FINANCE_ALERT",
          link: "/finance/withdrawals"
        });
        break;

      default:
        console.log(`[Automation] No automated rule matched for ${eventType}`);
    }

    // Record automation completion in global activity
    if (metadata.contactId) {
      await db.activity.create({
        data: {
          type: ActivityType.AUTOMATION_TRIGGERED,
          description: `Automated workflow executed for event: ${eventType}`,
          contactId: metadata.contactId,
        }
      });
    }
  }
}
