
import React from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface SupplementStatisticsProps {
  filteredItemsCount: number;
  selectedItemsCount: number;
  activeTab: 'supplement' | 'vitamin';
  dayLabel?: string;
}

const SupplementStatistics: React.FC<SupplementStatisticsProps> = ({
  filteredItemsCount,
  selectedItemsCount,
  activeTab,
  dayLabel
}) => {
  const getLabel = () => {
    const typeLabel = activeTab === 'supplement' ? 'مکمل' : 'ویتامین';
    const dayInfo = dayLabel ? ` برای ${dayLabel}` : '';
    return `${toPersianNumbers(selectedItemsCount)} ${typeLabel} انتخاب شده${dayInfo}`;
  };
  
  return (
    <div className="py-2 px-4 text-sm text-center border-t mt-2">
      <div className="flex justify-between items-center">
        <div className="text-muted-foreground">
          {toPersianNumbers(filteredItemsCount)} مورد
        </div>
        <div className="font-medium text-indigo-600">
          {getLabel()}
        </div>
      </div>
    </div>
  );
};

export default SupplementStatistics;
