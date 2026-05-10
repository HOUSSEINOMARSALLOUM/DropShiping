import { RealEstateService } from "@/features/real-estate/services/real-estate-service";
import { DealPipeline } from "@/features/real-estate/components/deal-pipeline";
import { Button } from "@/components/ui/button";
import { TrendingUp, LayoutGrid, ListFilter } from "lucide-react";

export default async function PipelinePage() {
  const deals = await RealEstateService.getPipeline();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-emerald-500" />
            Deal Pipeline
          </h1>
          <p className="text-muted-foreground">
            Monitor transaction flow, revenue forecasting, and closing velocity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="bg-card/50">
            <ListFilter className="mr-2 h-4 w-4" />
            Stage Filter
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <DealPipeline deals={deals as any} />
        </div>

        {/* Sidebar Forecasting */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Monthly Outlook</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Pipeline Volume</p>
                <p className="text-2xl font-bold">${deals.reduce((acc, d) => acc + Number(d.value), 0).toLocaleString()}</p>
              </div>
              <div className="pt-4 border-t border-primary/10">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Projected Revenue</p>
                <p className="text-2xl font-bold text-emerald-500">
                  ${(deals.reduce((acc, d) => acc + Number(d.value), 0) * 0.03).toLocaleString()}
                </p>
              </div>
            </div>
            <Button className="w-full mt-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all">
              Export Forecast
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
