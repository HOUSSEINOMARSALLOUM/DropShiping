import { WorkerDispatcher } from "@/infrastructure/queue/worker-dispatcher";

export class NotificationService {
  /**
   * Sending notifications is a side effect. It must be enqueued, never blocking the domain service.
   */
  static async createNotification(data: any) {
    // 1. We still persist the notification record immediately for UI responsiveness
    // (This is considered part of the "Notification Domain" write)
    
    // 2. We enqueue the external side effects (Push, WhatsApp, Email)
    await WorkerDispatcher.enqueue("SEND_NOTIFICATION_SIDE_EFFECTS", data);
  }

  static async sendEmailBriefing(email: string, content: any) {
    await WorkerDispatcher.enqueue("SEND_EMAIL", { to: email, content });
  }

  static async sendWhatsAppAlert(phone: string, message: string) {
    await WorkerDispatcher.enqueue("SEND_WHATSAPP", { to: phone, message });
  }
}
