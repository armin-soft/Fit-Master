
import React from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { Pill } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SupplementCard from "./SupplementCard";
import { Supplement } from "@/types/supplement";

interface SupplementGridProps {
  filteredItems: Supplement[];
  selectedItems: number[];
  toggleItem: (id: number) => void;
  searchQuery: string;
  selectedCategory: string | null;
  clearFilters: () => void;
}

const SupplementGrid: React.FC<SupplementGridProps> = ({
  filteredItems,
  selectedItems,
  toggleItem,
  searchQuery,
  selectedCategory,
  clearFilters
}) => {
  if (filteredItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-right" dir="rtl">
        <EmptyState
          icon="Pill"
          title={
            searchQuery || selectedCategory
              ? "هیچ موردی با فیلترهای انتخابی یافت نشد"
              : "هیچ موردی برای نمایش وجود ندارد"
          }
          description={
            searchQuery || selectedCategory
              ? "فیلترهای خود را تغییر دهید تا نتایج دیگری ببینید"
              : "لطفا بعداً دوباره بررسی کنید"
          }
          action={
            searchQuery || selectedCategory
              ? { label: "پاک کردن فیلترها", onClick: clearFilters }
              : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 p-1 text-right" dir="rtl">
      <AnimatePresence>
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            dir="rtl"
          >
            <SupplementCard
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onSelect={toggleItem}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SupplementGrid;
