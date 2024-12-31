"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"

const data = [
  { name: "Summer Beach Party", total: 1500 },
  { name: "Tech Conference 2023", total: 3000 },
  { name: "Downtown Music Festival", total: 2200 },
  { name: "Food Truck Rally", total: 800 },
  { name: "Art Exhibition", total: 1200 },
]

export function RevenueChart() {
  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--muted))",
    "hsl(var(--card))",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Event</CardTitle>
        <CardDescription>An overview of revenue generated from each event</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{fill: 'rgba(0, 0, 0, 0.1)'}}
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                boxShadow: 'hsl(var(--shadow)) 0px 10px 38px -10px, hsl(var(--shadow)) 0px 10px 20px -15px',
              }}
            />
            <Bar 
              dataKey="total" 
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

