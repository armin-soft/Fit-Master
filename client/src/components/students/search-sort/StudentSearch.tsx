
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface StudentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClearSearch?: () => void;
}

export const StudentSearch: React.FC<StudentSearchProps> = ({
  searchQuery,
  setSearchQuery,
  onClearSearch
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (onClearSearch) {
      onClearSearch();
    } else {
      setSearchQuery("");
    }
    inputRef.current?.focus();
  };

  return (
    <div 
      className={`
        relative flex items-center rounded-lg border border-input bg-background 
        shadow-sm transition-all duration-200
        ${isFocused ? 'ring-1 ring-ring' : ''}
        ${searchQuery ? 'pr-3' : 'pr-4'}
      `}
    >
      <Search className="h-4 w-4 absolute right-3 text-muted-foreground" />
      
      <Input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="جستجوی شاگرد..."
        className="border-0 focus-visible:ring-0 pr-9 text-sm bg-transparent shadow-none"
      />
      
      <AnimatePresence>
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClear}
            className="absolute left-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="پاک کردن جستجو"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
