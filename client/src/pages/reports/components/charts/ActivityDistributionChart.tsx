
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { ChartContainer } from "./ChartContainer";
import { CustomTooltip } from "./CustomTooltip";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ActivityData {
  name: string;
  value: number;
  color: string;
}

interface ActivityDistributionChartProps {
  data: ActivityData[];
  isLoading?: boolean;
}

export const ActivityDistributionChart: React.FC<ActivityDistributionChartProps> = ({ data, isLoading }) => {
  // Use emerald-sky color scheme
  const colorScheme = ["#10b981", "#0ea5e9", "#059669", "#0284c7", "#34d399", "#38bdf8"];
  const updatedData = data.map((item, index) => ({
    ...item,
    color: colorScheme[index % colorScheme.length]
  }));

  return (
    <ChartContainer
      title="فعالیت‌های تعریف شده"
      description="توزیع انواع برنامه‌های اختصاص یافته"
      delay={0.6}
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={updatedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => toPersianNumbers(value.toString())}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={6}>
              {updatedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};
