"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Notification } from "../types"
import { markAllNotificationsReadAction, markNotificationReadAction } from "../actions"

export function NotificationBell({ initialNotifications }: { initialNotifications: Notification[] }) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleMarkAsRead = async (id: string) => {
    await markNotificationReadAction(id)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsReadAction()
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case 'ERROR': return <XCircle className="h-4 w-4 text-red-500" />
      case 'WARNING': return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default: return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-950" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="font-medium text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="h-auto p-0 text-xs text-indigo-600 dark:text-indigo-400">
              <Check className="h-3 w-3 mr-1" /> Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-zinc-500">No new notifications</div>
          ) : (
            notifications.map(n => (
              <div 
                key={n.id} 
                className={`p-4 border-b border-zinc-100 dark:border-zinc-800 flex gap-3 ${n.isRead ? 'opacity-60' : 'bg-indigo-50/50 dark:bg-indigo-950/20'}`}
                onClick={() => !n.isRead && handleMarkAsRead(n.id)}
              >
                <div className="mt-0.5">{getIcon(n.type)}</div>
                <div className="flex-1 cursor-pointer">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{n.title}</p>
                  <p className="text-xs text-zinc-500 mt-1">{n.message}</p>
                  <p className="text-[10px] text-zinc-400 mt-2">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
