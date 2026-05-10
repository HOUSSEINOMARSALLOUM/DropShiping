import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntelligenceCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: string;
  trendValue?: string;
  className?: string;
}

export function IntelligenceCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className
}: IntelligenceCardProps) {
  return (
    <Card className={cn("bg-card/40 border-primary/5 hover:border-primary/20 transition-all group", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div className={cn(
            "mt-3 text-[10px] font-bold flex items-center gap-1",
            trend === "up" ? "text-emerald-500" : "text-orange-500"
          )}>
            <span>{trend === "up" ? "▲" : "▼"}</span>
            <span>{trendValue} vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
