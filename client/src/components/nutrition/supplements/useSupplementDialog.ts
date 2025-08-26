
import { useState, useEffect } from "react";
import type { Supplement, SupplementCategory } from "@/types/supplement";

export interface SupplementDialogState {
  selectedSupplements: number[];
  selectedVitamins: number[];
  searchQuery: string;
  supplements: Supplement[];
  filteredItems: Supplement[];
  activeTab: "supplements" | "vitamins";
  showFilters: boolean;
  viewMode: "grid" | "list";
  categories: SupplementCategory[];
  selectedCategory: string;
  
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: "supplements" | "vitamins") => void;
  setShowFilters: (show: boolean) => void;
  setViewMode: (mode: "grid" | "list") => void;
  setSelectedCategory: (category: string) => void;
  toggleItem: (id: number) => void;
  isSelected: (id: number) => boolean;
  relevantCategories: SupplementCategory[];
  getSelectedCount: () => number;
}

export const useSupplementDialog = (
  initialSupplements: number[] = [],
  initialVitamins: number[] = [],
  deviceIsMobile: boolean = false
): SupplementDialogState => {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [filteredItems, setFilteredItems] = useState<Supplement[]>([]);
  const [activeTab, setActiveTab] = useState<"supplements" | "vitamins">("supplements");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">(deviceIsMobile ? "list" : "grid");
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Initialize with provided values when dialog opens
  useEffect(() => {
    setSelectedSupplements([...initialSupplements]);
    setSelectedVitamins([...initialVitamins]);
  }, [initialSupplements, initialVitamins]);
  
  // Load data from database
  useEffect(() => {
    const loadData = async () => {
      try {
        const { getStorageItem } = await import('@/utils/databaseStorage');
        
        const savedSupplements = await getStorageItem("supplements", []);
        setSupplements(Array.isArray(savedSupplements) ? savedSupplements : []);

        const savedCategories = await getStorageItem("supplementCategories", []);
        setCategories(Array.isArray(savedCategories) ? savedCategories : []);
      } catch (error) {
        console.error("Error loading data:", error);
        setSupplements([]);
        setCategories([]);
      }
    };
    loadData();
  }, []);
  
  // Filter items based on search query, active tab and category
  useEffect(() => {
    let filtered = supplements;
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (item.dosage && item.dosage.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (item.timing && item.timing.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (activeTab === "supplements") {
      filtered = filtered.filter(item => item.type === "supplement");
    } else {
      filtered = filtered.filter(item => item.type === "vitamin");
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, supplements, activeTab, selectedCategory]);
  
  // Toggle selection of an item
  const toggleItem = (id: number) => {
    if (activeTab === "supplements") {
      setSelectedSupplements(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    } else {
      setSelectedVitamins(prev => 
        prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
      );
    }
  };
  
  // Check if an item is selected
  const isSelected = (id: number) => {
    return activeTab === "supplements" 
      ? selectedSupplements.includes(id) 
      : selectedVitamins.includes(id);
  };
  
  // Get categories relevant to the active tab
  const relevantCategories = categories.filter(cat => 
    cat.type === (activeTab === "supplements" ? "supplement" : "vitamin")
  );
  
  // Get count of selected items for active tab
  const getSelectedCount = () => {
    return activeTab === "supplements" 
      ? selectedSupplements.length 
      : selectedVitamins.length;
  };
  
  return {
    selectedSupplements,
    selectedVitamins,
    searchQuery,
    setSearchQuery,
    supplements,
    filteredItems,
    activeTab,
    setActiveTab,
    showFilters,
    setShowFilters,
    viewMode,
    setViewMode,
    categories,
    selectedCategory,
    setSelectedCategory,
    toggleItem,
    isSelected,
    relevantCategories,
    getSelectedCount
  };
};
