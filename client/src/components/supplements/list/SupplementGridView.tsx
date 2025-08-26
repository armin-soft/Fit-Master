
import React from 'react';
import { Plus, Search, Grid, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Supplement } from '@/types/supplement';
import { SupplementCard } from './SupplementCard';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface SupplementGridViewProps {
  supplements: Supplement[];
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddSupplement: () => void;
  activeTab: 'supplement' | 'vitamin';
}

export const SupplementGridView: React.FC<SupplementGridViewProps> = ({
  supplements,
  onEditSupplement,
  onDeleteSupplement,
  searchQuery,
  setSearchQuery,
  onAddSupplement,
  activeTab,
}) => {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  if (supplements.length === 0 && !searchQuery) {
    return (
      <div className="py-20 flex items-center justify-center" dir="rtl">
        <EmptyState
          icon={activeTab === 'supplement' ? "Pill" : "Heart"}
          title={`هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} وجود ندارد`}
          description={`اولین ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} خود را اضافه کنید`}
          action={{
            label: `افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
            onClick: onAddSupplement
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full" dir="rtl">
      {/* Header Controls */}
      <div className="flex flex-col gap-4">
        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 text-right border-gray-300 focus:border-primary focus:ring-primary/20"
              dir="rtl"
            />
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={cn(
                  "h-8 w-8 p-0",
                  viewMode === 'grid' && "bg-white shadow-sm"
                )}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn(
                  "h-8 w-8 p-0",
                  viewMode === 'list' && "bg-white shadow-sm"
                )}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              onClick={onAddSupplement}
              className={cn(
                "flex items-center gap-2 text-white shadow-lg",
                activeTab === 'supplement'
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              )}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">
                افزودن {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
              </span>
            </Button>
          </div>
        </div>

        {/* Results Counter */}
        {searchQuery && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Filter className="h-4 w-4" />
            <span>
              {toPersianNumbers(supplements.length)} نتیجه برای "{searchQuery}" پیدا شد
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full">
        {supplements.length === 0 ? (
          <div className="py-20 flex items-center justify-center">
            <EmptyState
              icon="Search"
              title="نتیجه‌ای یافت نشد"
              description={`هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} با عبارت "${searchQuery}" پیدا نشد`}
              action={{
                label: "پاک کردن جستجو",
                onClick: () => setSearchQuery("")
              }}
            />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "gap-4 w-full",
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" 
                : "flex flex-col space-y-4"
            )}
          >
            <AnimatePresence>
              {supplements.map((supplement) => (
                <motion.div
                  key={supplement.id}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-full"
                >
                  <SupplementCard
                    supplement={supplement}
                    onEdit={() => onEditSupplement(supplement)}
                    onDelete={() => onDeleteSupplement(supplement.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
