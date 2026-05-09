import { db } from "@/lib/db"
import { NotificationInput } from "../types"

export class NotificationService {
  static async getUnread() {
    return await db.notification.findMany({
      where: { isRead: false },
      orderBy: { createdAt: 'desc' },
      take: 20
    })
  }

  static async create(data: NotificationInput) {
    return await db.notification.create({
      data: {
        title: data.title,
        message: data.message,
        type: data.type || 'INFO',
        actionUrl: data.actionUrl
      }
    })
  }

  static async markAsRead(id: string) {
    return await db.notification.update({
      where: { id },
      data: { isRead: true }
    })
  }

  static async markAllAsRead() {
    return await db.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true }
    })
  }
}
