
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ChartContainer } from "./ChartContainer";
import { CustomTooltip } from "./CustomTooltip";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface WeeklyData {
  week: string;
  students: number;
  sessions: number;
}

interface WeeklyProgressChartProps {
  data: WeeklyData[];
  isLoading?: boolean;
}

export const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({ data, isLoading }) => {
  const hasData = data.some(w => w.students > 0);
  
  if (!hasData) return null;

  return (
    <ChartContainer
      title="روند پیشرفت هفتگی"
      description="نمودار رشد شاگردان و جلسات در طول زمان"
      delay={0.7}
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis 
              dataKey="week" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => toPersianNumbers(value.toString())}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="students"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorStudents)"
              name="شاگردان"
            />
            <Area
              type="monotone"
              dataKey="sessions"
              stroke="#0ea5e9"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSessions)"
              name="جلسات"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};
