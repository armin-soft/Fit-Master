
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ExercisesTabFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ExercisesTabFilters = ({
  searchQuery,
  setSearchQuery
}: ExercisesTabFiltersProps) => {
  return (
    <div className="flex flex-col xs:flex-row gap-2">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجوی حرکت..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-3 pr-10"
        />
      </div>
      
      {searchQuery && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSearchQuery("")}
          className="text-xs"
        >
          پاک کردن
        </Button>
      )}
    </div>
  );
};
