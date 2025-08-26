
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SortButtonProps {
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
}

export const SortButton: React.FC<SortButtonProps> = ({ sortOrder, toggleSortOrder }) => {
  return (
    <Card className="p-2">
      <Button 
        variant="ghost" 
        className="h-8 px-2 text-sm hover:bg-secondary/10 text-secondary"
        onClick={toggleSortOrder}
      >
        <ArrowUpDown className={`h-4 w-4 mr-1 transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-180' : 'rotate-0'}`} />
        <span>{sortOrder === "asc" ? "صعودی" : "نزولی"}</span>
      </Button>
    </Card>
  );
};
