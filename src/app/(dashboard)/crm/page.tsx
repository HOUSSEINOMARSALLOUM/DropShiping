import { ClientService } from "@/features/crm/services/client-service"
import { ClientTable } from "@/features/crm/components/client-table"
import { VIPDashboardWidgets } from "@/features/crm/components/vip-dashboard-widgets"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Search, Filter } from "lucide-react"

export default async function CRMPage() {
  const clients = await ClientService.getAllClients()

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">VIP Network CRM</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage high-net-worth relationships, deal pipelines, and real estate interests.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="border-zinc-200 dark:border-zinc-800">
            <Filter className="w-4 h-4" />
          </Button>
          <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md border-0">
            <Link href="/crm/new">
              <Plus className="w-4 h-4 mr-2" />
              Add VIP Client
            </Link>
          </Button>
        </div>
      </div>

      <VIPDashboardWidgets 
        totalClients={clients.length} 
        activeDeals={clients.filter(c => c.dealStage === 'NEGOTIATION').length} 
        totalWealthValue="$142.5M"
      />

      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search network..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-zinc-200"
          />
        </div>

        {clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-zinc-950 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-full mb-4 text-indigo-500">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Your network is empty</h3>
            <p className="text-sm text-zinc-500 mb-6 max-w-sm text-center">Start adding your high-net-worth connections to track deals and real estate interests.</p>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/crm/new">Add First Client</Link>
            </Button>
          </div>
        ) : (
          <ClientTable clients={clients as any} />
        )}
      </div>
    </div>
  )
}
