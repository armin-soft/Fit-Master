
import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DietSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DietSearch: React.FC<DietSearchProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="جستجو در غذاها..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 text-right"
          dir="rtl"
        />
      </div>
    </motion.div>
  );
};

export default DietSearch;
