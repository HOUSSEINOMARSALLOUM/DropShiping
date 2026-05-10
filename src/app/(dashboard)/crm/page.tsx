import { ContactService } from "@/features/crm/services/contact-service";
import { ContactList } from "@/features/crm/components/contact-list";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Search } from "lucide-react";

export default async function CRMPage() {
  const contacts = await ContactService.getAll();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">CRM Command Center</h1>
          <p className="text-muted-foreground">
            Manage your high-value relationships and relationship velocity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-card/50">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" />
            New Contact
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-primary/5">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search contacts, companies, or industries..."
            className="w-full bg-transparent pl-10 pr-4 py-2 text-sm focus:outline-none"
          />
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm border-l border-primary/10 pl-4">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-[10px] font-bold uppercase">Total Leads</span>
            <span className="font-bold">{contacts.length}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-[10px] font-bold uppercase">VIPs</span>
            <span className="font-bold text-yellow-500">{contacts.filter(c => c.isVip).length}</span>
          </div>
        </div>
      </div>

      <ContactList contacts={contacts} />
    </div>
  );
}
