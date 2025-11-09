"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { month: "Mês 1", weight: 85, traditional: 35 },
  { month: "Mês 2", weight: 81, traditional: 42 },
  { month: "Mês 3", weight: 75, traditional: 52 },
  { month: "Mês 4", weight: 70, traditional: 62 },
  { month: "Mês 5", weight: 65, traditional: 70 },
  { month: "Mês 6", weight: 62, traditional: 78 },
]

export function DietComparisonChart() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white p-8 rounded-2xl">
      <div className="w-full flex justify-between items-center mb-4 px-4">
        <span className="text-sm font-semibold text-gray-900">Seu Peso</span>
        <span className="text-sm font-semibold text-gray-900">Dieta Tradicional</span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 0, right: 30, left: -20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" vertical={false} />

          <XAxis
            dataKey="month"
            stroke="#333"
            style={{ fontSize: "12px" }}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#666" }}
          />

          <YAxis stroke="transparent" style={{ fontSize: "12px" }} axisLine={false} tickLine={false} tick={false} />

          <Area
            type="monotone"
            dataKey="weight"
            stroke="#1a1a1a"
            fill="#c0c0c0"
            fillOpacity={0.5}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={0}
            strokeWidth={3}
            dot={false}
            name="weight"
          />

          <Area
            type="monotone"
            dataKey="traditional"
            stroke="#f97316"
            fill="#fed7aa"
            fillOpacity={0.6}
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={0}
            strokeWidth={3}
            dot={false}
            name="traditional"
          />

          <Area
            type="monotone"
            dataKey="weight"
            stroke="transparent"
            fill="transparent"
            dot={({ cx, cy, payload, index }) => {
              if (index === 0 || index === data.length - 1) {
                return (
                  <circle
                    key={`dot-weight-${index}`}
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="white"
                    stroke="#1a1a1a"
                    strokeWidth={2}
                  />
                )
              }
              return null
            }}
          />

          <Area
            type="monotone"
            dataKey="traditional"
            stroke="transparent"
            fill="transparent"
            dot={({ cx, cy, payload, index }) => {
              if (index === 0 || index === data.length - 1) {
                return (
                  <circle
                    key={`dot-traditional-${index}`}
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="white"
                    stroke="#f97316"
                    strokeWidth={2}
                  />
                )
              }
              return null
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs font-medium text-gray-700">CalorIA</div>
    </div>
  )
}
