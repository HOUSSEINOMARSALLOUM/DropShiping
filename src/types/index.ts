export type NavItem = {
  title: string
  href: string
  icon: React.ReactNode
  disabled?: boolean
}

export type User = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}
