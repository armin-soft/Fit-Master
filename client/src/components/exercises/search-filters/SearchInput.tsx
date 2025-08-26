
import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "جستجو...",
  className,
  inputClassName,
  autoFocus = false
}) => {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-70" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full pr-9 focus:outline-none focus:ring-1 focus:ring-primary/30",
          inputClassName
        )}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default SearchInput;
