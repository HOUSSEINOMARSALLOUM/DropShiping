import { PropertyForm } from "@/features/real-estate/components/property-form"
import { ClientService } from "@/features/crm/services/client-service"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function NewPropertyPage() {
  // Fetch clients to populate the Owner dropdown (CRM Integration)
  const clients = await ClientService.getAllClients()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/real-estate" 
          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">New Property Listing</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Create a luxury listing and track VIP viewings.</p>
        </div>
      </div>

      <div className="py-4">
        <PropertyForm clients={clients as any} />
      </div>
    </div>
  )
}
