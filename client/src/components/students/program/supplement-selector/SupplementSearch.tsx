
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SupplementSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  activeTab: 'supplement' | 'vitamin';
}

const SupplementSearch: React.FC<SupplementSearchProps> = ({
  searchQuery,
  setSearchQuery,
  activeTab
}) => {
  return (
    <div className="mb-4 relative text-right" dir="rtl">
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={activeTab === 'supplement' ? 'جستجوی مکمل‌ها...' : 'جستجوی ویتامین‌ها...'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-10 pl-4 text-right"
      />
    </div>
  );
};

export default SupplementSearch;
