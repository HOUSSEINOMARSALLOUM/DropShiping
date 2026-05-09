"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface ChartData {
  name: string
  revenue: number
  expenses: number
}

export function FinanceCharts({ data }: { data: ChartData[] }) {
  return (
    <Card className="dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm w-full">
      <CardHeader>
        <CardTitle>Cash Flow Overview</CardTitle>
        <CardDescription>Monthly revenue vs expenses tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', backgroundColor: '#fff', color: '#000' }}
                itemStyle={{ color: '#000' }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
