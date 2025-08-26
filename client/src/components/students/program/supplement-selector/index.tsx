
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid, List, Pill, Heart, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Supplement } from "@/types/supplement";
import { useQuery } from "@tanstack/react-query";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SupplementCard from "./SupplementCard";

interface StudentSupplementSelectorProps {
  supplements: Supplement[];
  selectedSupplements: number[];
  setSelectedSupplements: React.Dispatch<React.SetStateAction<number[]>>;
  selectedVitamins: number[];
  setSelectedVitamins: React.Dispatch<React.SetStateAction<number[]>>;
  activeTab: 'supplement' | 'vitamin';
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const StudentSupplementSelector: React.FC<StudentSupplementSelectorProps> = ({
  supplements,
  selectedSupplements,
  setSelectedSupplements,
  selectedVitamins,
  setSelectedVitamins,
  activeTab,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredItems, setFilteredItems] = useState<Supplement[]>([]);

  // Fetch supplement categories
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/data/supplementCategories'],
    queryFn: async () => {
      const response = await fetch('/api/data/supplementCategories', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch supplement categories');
      }
      return response.json();
    },
  });

  // Filter supplements by type and search
  useEffect(() => {
    let filtered = supplements.filter(item => 
      item.type === (activeTab === 'supplement' ? 'supplement' : 'vitamin')
    );

    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.dosage && item.dosage.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
  }, [supplements, activeTab, searchQuery]);

  // Get relevant categories for current tab
  const relevantCategories = categories.filter((cat: any) => 
    cat.type === (activeTab === 'supplement' ? 'supplement' : 'vitamin')
  );

  // Group supplements by category
  const groupedSupplements = relevantCategories.map((category: any) => ({
    ...category,
    supplements: filteredItems.filter((supp: any) => supp.categoryId === category.id)
  }));

  // Supplements without category
  const uncategorizedSupplements = filteredItems.filter((supp: any) => !supp.categoryId);

  const handleToggleItem = (id: number) => {
    if (activeTab === 'supplement') {
      setSelectedSupplements(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    } else {
      setSelectedVitamins(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    }
  };

  const isSelected = (id: number) => {
    return activeTab === 'supplement' 
      ? selectedSupplements.includes(id)
      : selectedVitamins.includes(id);
  };

  return (
    <div className="space-y-4 h-full flex flex-col text-right" dir="rtl">
      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10 text-right"
          dir="rtl"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="p-4 bg-slate-50 rounded-lg">
              {activeTab === 'supplement' ? <Pill className="h-12 w-12 text-slate-400 mx-auto mb-2" /> : <Heart className="h-12 w-12 text-slate-400 mx-auto mb-2" />}
              <p className="text-muted-foreground">
                هیچ {activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} یافت نشد
              </p>
            </div>
          </div>
        ) : (
          <Accordion type="multiple" defaultValue={relevantCategories.map((cat: any) => cat.id.toString())} className="w-full space-y-2">
            {/* Categorized supplements */}
            {groupedSupplements.map((category: any) => (
              category.supplements.length > 0 && (
                <AccordionItem key={category.id} value={category.id.toString()} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline text-right" dir="rtl">
                    <div className="flex items-center gap-3 text-right" dir="rtl">
                      {activeTab === 'supplement' ? <Pill className="h-5 w-5 text-brand-600" /> : <Heart className="h-5 w-5 text-brand-600" />}
                      <span className="font-medium text-slate-700">{category.name}</span>
                      <span className="text-sm text-muted-foreground bg-slate-100 px-2 py-1 rounded-full">
                        {category.supplements.length}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.supplements.map((item: any) => (
                        <SupplementCard
                          key={item.id}
                          item={item}
                          isSelected={isSelected(item.id)}
                          onSelect={handleToggleItem}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            ))}

            {/* Uncategorized supplements */}
            {uncategorizedSupplements.length > 0 && (
              <AccordionItem value="uncategorized" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline text-right" dir="rtl">
                  <div className="flex items-center gap-3 text-right" dir="rtl">
                    {activeTab === 'supplement' ? <Pill className="h-5 w-5 text-slate-400" /> : <Heart className="h-5 w-5 text-slate-400" />}
                    <span className="font-medium text-slate-700">بدون دسته‌بندی</span>
                    <span className="text-sm text-muted-foreground bg-slate-100 px-2 py-1 rounded-full">
                      {uncategorizedSupplements.length}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {uncategorizedSupplements.map((item: any) => (
                      <SupplementCard
                        key={item.id}
                        item={item}
                        isSelected={isSelected(item.id)}
                        onSelect={handleToggleItem}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default StudentSupplementSelector;
