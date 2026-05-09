"use client"

import { Client } from "../types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { deleteClientAction } from "../actions"
import { MoreHorizontal, Mail, MessageSquare, Briefcase } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function ClientTable({ clients }: { clients: Client[] }) {
  
  const getWealthBadge = (tier: string) => {
    switch(tier) {
      case 'BILLIONAIRE': return <Badge className="bg-amber-500 hover:bg-amber-600">Billionaire</Badge>
      case 'ULTRA_HIGH_NET_WORTH': return <Badge className="bg-purple-500 hover:bg-purple-600">UHNW</Badge>
      default: return <Badge className="bg-blue-500 hover:bg-blue-600">HNW</Badge>
    }
  }

  const getStageBadge = (stage: string) => {
    switch(stage) {
      case 'PROSPECT': return <Badge variant="outline">Prospect</Badge>
      case 'QUALIFIED': return <Badge variant="outline" className="text-blue-600 border-blue-600">Qualified</Badge>
      case 'NEGOTIATION': return <Badge variant="outline" className="text-orange-600 border-orange-600">Negotiation</Badge>
      case 'CLOSED_WON': return <Badge className="bg-emerald-500 hover:bg-emerald-600">Closed Won</Badge>
      case 'CLOSED_LOST': return <Badge variant="destructive">Closed Lost</Badge>
      default: return null
    }
  }

  return (
    <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Wealth Tier</TableHead>
            <TableHead>Deal Stage</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-zinc-200 dark:border-zinc-800">
                    <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50">
                      {client.firstName[0]}{client.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      {client.firstName} {client.lastName}
                    </span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {client.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getWealthBadge(client.wealthTier)}</TableCell>
              <TableCell>{getStageBadge(client.dealStage)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {client.company ? <><Briefcase className="h-3 w-3" /> {client.company}</> : '-'}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {client.tags?.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {client.tags?.length > 2 && (
                    <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-full">
                      +{client.tags.length - 2}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="dark:bg-zinc-950">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {client.whatsapp && (
                      <DropdownMenuItem onClick={() => window.open(`https://wa.me/${client.whatsapp}`, '_blank')}>
                        <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp Message
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600 dark:text-red-400"
                      onClick={() => deleteClientAction(client.id)}
                    >
                      Delete Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
