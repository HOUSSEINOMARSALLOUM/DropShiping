"use server"

import { revalidatePath } from "next/cache"
import { NotificationService } from "./services/notification-service"

export async function markNotificationReadAction(id: string) {
  await NotificationService.markAsRead(id)
  revalidatePath("/", "layout")
}

export async function markAllNotificationsReadAction() {
  await NotificationService.markAllAsRead()
  revalidatePath("/", "layout")
}
