import { RealEstateService } from "@/features/real-estate/services/real-estate-service";
import { PropertyGrid } from "@/features/real-estate/components/property-grid";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Search, Filter } from "lucide-react";

export default async function RealEstatePage() {
  const properties = await RealEstateService.getProperties();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Asset Portfolio
          </h1>
          <p className="text-muted-foreground">
            Monitor property performance, inventory levels, and asset velocity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-card/50">
            <Search className="mr-2 h-4 w-4" />
            Inventory Search
          </Button>
          <Button className="shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" />
            List New Property
          </Button>
        </div>
      </div>

      {/* Analytics-Ready KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-card/30 border border-primary/5">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Total Assets</span>
          <p className="text-2xl font-bold">{properties.length}</p>
        </div>
        <div className="space-y-1 border-l border-primary/10 pl-6">
          <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Portfolio Value</span>
          <p className="text-2xl font-bold text-primary">
            ${properties.reduce((acc, p) => acc + Number(p.price), 0).toLocaleString()}
          </p>
        </div>
        <div className="space-y-1 border-l border-primary/10 pl-6">
          <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Available</span>
          <p className="text-2xl font-bold text-emerald-500">
            {properties.filter(p => p.status === 'AVAILABLE').length}
          </p>
        </div>
        <div className="space-y-1 border-l border-primary/10 pl-6">
          <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Under Contract</span>
          <p className="text-2xl font-bold text-orange-500">
            {properties.filter(p => p.status === 'UNDER_CONTRACT').length}
          </p>
        </div>
      </div>

      <PropertyGrid properties={properties} />
    </div>
  );
}
