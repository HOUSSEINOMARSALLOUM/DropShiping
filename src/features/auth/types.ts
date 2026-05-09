export type Admin = {
  id: string
  email: string
  name?: string
  createdAt: Date
  updatedAt: Date
  settings?: AdminSettings
}

export type AdminSettings = {
  id: string
  adminId: string
  theme: string
  language: string
}
