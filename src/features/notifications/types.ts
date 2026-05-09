export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  actionUrl: string | null
  createdAt: Date
}

export interface NotificationInput {
  title: string
  message: string
  type?: NotificationType
  actionUrl?: string
}
