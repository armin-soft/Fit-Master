
export type SupplementType = 'supplement' | 'vitamin';

export interface UseSupplementsManagerReturn {
  supplements: any[];
  categories: any[];
  filteredSupplements: any[];
  relevantCategories: any[];
  activeTab: 'supplement' | 'vitamin';
  selectedCategory: string | null;
  isLoading: boolean;
  
  setActiveTab: (tab: 'supplement' | 'vitamin') => void;
  setSelectedCategory: (category: string | null) => void;
  addCategory: (name: string) => void;
  updateCategory: (id: number, name: string) => void;
  deleteCategory: (category: any) => void;
  addSupplement: (data: any) => void;
  updateSupplement: (id: number, data: any) => void;
  deleteSupplement: (id: number) => void;
}
