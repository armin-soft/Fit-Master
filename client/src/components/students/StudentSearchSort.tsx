
import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentSearchSortProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: string;
  sortOrder: 'asc' | 'desc';
  toggleSort: (field: string) => void;
}

export const StudentSearchSort: React.FC<StudentSearchSortProps> = ({
  searchQuery,
  setSearchQuery,
  sortField,
  sortOrder,
  toggleSort
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 h-4 w-4 text-brand-500/70" />
        <Input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="جستجو بر اساس نام، شماره تلفن و..."
          className="pl-9 pr-10 h-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1/2 left-1 transform -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">پاک کردن جستجو</span>
          </Button>
        )}
      </div>
      
      {/* Sort */}
      <div className="flex gap-3">
        <Select 
          value={sortField} 
          onValueChange={toggleSort}
        >
          <SelectTrigger className="w-40 h-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="flex items-center">
              <ArrowUpDown className="ml-2 h-4 w-4 text-brand-500/70" />
              <SelectValue placeholder="مرتب‌سازی" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">نام</SelectItem>
            <SelectItem value="phone">شماره تلفن</SelectItem>
            <SelectItem value="height">قد</SelectItem>
            <SelectItem value="weight">وزن</SelectItem>

          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          className="h-10 w-10 p-0 flex items-center justify-center"
          onClick={() => toggleSort(sortField)}
        >
          {sortOrder === 'asc' ? (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          <span className="sr-only">تغییر ترتیب مرتب‌سازی</span>
        </Button>
      </div>
    </div>
  );
};
