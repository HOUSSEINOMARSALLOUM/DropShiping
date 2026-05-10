import { db } from "@/lib/db";
import { NotificationDTO } from "../types";

export class NotificationService {
  static async getActiveNotifications() {
    return await db.notification.findMany({
      where: { isRead: false },
      orderBy: { createdAt: "desc" },
      take: 20
    });
  }

  static async createNotification(data: NotificationDTO) {
    return await db.notification.create({
      data: {
        title: data.title,
        message: data.message,
        priority: data.priority,
        type: data.type,
        link: data.link,
      }
    });
  }

  static async markAsRead(notificationId: string) {
    return await db.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });
  }

  static async markAllAsRead() {
    return await db.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true }
    });
  }

  static async getUnreadCount() {
    return await db.notification.count({
      where: { isRead: false }
    });
  }
}
