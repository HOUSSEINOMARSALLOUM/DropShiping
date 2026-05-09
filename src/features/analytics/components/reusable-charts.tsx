"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TimeSeriesDTO, DistributionDTO } from "../dto"

interface ChartProps {
  title: string
  description?: string
  data: TimeSeriesDTO[]
  lines?: { key: string, color: string }[]
  bars?: { key: string, color: string }[]
}

export function TrendChart({ title, description, data, lines, bars }: ChartProps) {
  return (
    <Card className="dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {lines ? (
              <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', backgroundColor: '#fff', color: '#000' }} />
                {lines.map((line, i) => (
                  <Line key={i} type="monotone" dataKey={line.key} stroke={line.color} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                ))}
              </LineChart>
            ) : bars ? (
              <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dx={-10} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', backgroundColor: '#fff', color: '#000' }} />
                {bars.map((bar, i) => (
                  <Bar key={i} dataKey={bar.key} fill={bar.color} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            ) : <></>}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface DistributionProps {
  title: string
  data: DistributionDTO[]
}

export function DistributionChart({ title, data }: DistributionProps) {
  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

  return (
    <Card className="dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || defaultColors[index % defaultColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', backgroundColor: '#fff', color: '#000' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-zinc-500">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color || defaultColors[index % defaultColors.length] }} />
              {entry.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
