"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ChartDataPoint } from "../types";

export function RevenueChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))", 
              borderColor: "hsl(var(--border))",
              borderRadius: "12px",
              fontSize: "12px"
            }}
            itemStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            name="Revenue"
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
          <Area 
            type="monotone" 
            dataKey="secondary" 
            name="Expenses"
            stroke="#f97316" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorSecondary)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
