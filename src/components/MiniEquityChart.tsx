"use client";

import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

export default function MiniEquityChart({ data, isProfitable }: { data: any[], isProfitable: boolean }) {
  const color = isProfitable ? "#10b981" : "#00f0ff"; // emerald or neon blue
  
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-700 text-sm font-medium">
        Generating...
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <YAxis domain={['dataMin', 'dataMax']} hide />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2} 
          dot={false} 
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
