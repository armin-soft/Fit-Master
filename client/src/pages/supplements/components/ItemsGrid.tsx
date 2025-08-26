
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Supplement } from "@/types/supplement";
import { ItemsHeader } from "./ItemsGrid/ItemsHeader";
import { ItemsSearch } from "./ItemsGrid/ItemsSearch";
import { ItemCard } from "./ItemsGrid/ItemCard";
import { EmptyItemsState } from "./ItemsGrid/EmptyItemsState";

interface ItemsGridProps {
  items: Supplement[];
  onEdit: (item: Supplement) => void;
  onDelete: (id: number) => void;
  activeTab: "supplement" | "vitamin";
  selectedCategory: string | null;
}

export const ItemsGrid: React.FC<ItemsGridProps> = ({
  items,
  onEdit,
  onDelete,
  activeTab,
  selectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredItems = items.filter(item => {
    const matchesType = item.type === activeTab;
    // Category filtering is handled by the parent component now
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesSearch;
  });

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8" dir="rtl">
      <ItemsHeader
        activeTab={activeTab}
        filteredItemsCount={filteredItems.length}
        selectedCategory={selectedCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <ItemsSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
      />

      {filteredItems.length === 0 ? (
        <EmptyItemsState
          activeTab={activeTab}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      ) : (
        <motion.div
          layout
          className={`gap-6 ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col"
          }`}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                activeTab={activeTab}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
