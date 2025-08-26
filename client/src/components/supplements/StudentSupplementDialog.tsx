
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, VisuallyHidden } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Save, X, Plus, Check, ChevronLeft, Pill, LayoutGrid, ListFilter, SlidersHorizontal, Beaker, Filter } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentSupplementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (data: {
    supplements: number[];
    vitamins: number[];
  }) => boolean;
  initialSupplements: number[];
  initialVitamins: number[];
}

export function StudentSupplementDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialSupplements = [],
  initialVitamins = []
}: StudentSupplementDialogProps) {
  const deviceInfo = useDeviceInfo();
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [filteredItems, setFilteredItems] = useState<Supplement[]>([]);
  const [activeTab, setActiveTab] = useState<"supplements" | "vitamins">("supplements");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">(deviceInfo.isMobile ? "list" : "grid");
  const [categories, setCategories] = useState<SupplementCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // مقادیر اولیه وقتی دیالوگ باز می‌شود
  useEffect(() => {
    if (open) {
      setSelectedSupplements(initialSupplements);
      setSelectedVitamins(initialVitamins);
    }
  }, [open, initialSupplements, initialVitamins]);

  // بارگذاری از دیتابیس آنلاین
  useEffect(() => {
    const loadData = async () => {
      try {
        // Use API endpoints directly
        const supResponse = await fetch('/api/preferences/supplements');
        const supResult = await supResponse.json();
        const savedSupplements = supResult && supResult.value ? JSON.parse(supResult.value) : [];
        if (Array.isArray(savedSupplements) && savedSupplements.length > 0) {
          setSupplements(savedSupplements);
        }

        const catResponse = await fetch('/api/preferences/supplementCategories');
        const catResult = await catResponse.json();
        const savedCategories = catResult && catResult.value ? JSON.parse(catResult.value) : [];
        if (Array.isArray(savedCategories) && savedCategories.length > 0) {
          setCategories(savedCategories);
        }
      } catch (error) {
        console.error("Error loading data from database:", error);
        setSupplements([]);
        setCategories([]);
      }
    };
    
    loadData();
  }, []);

  // فیلتر کردن آیتم‌ها
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

  // تغییر وضعیت انتخاب آیتم
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

  // ذخیره تغییرات
  const handleSave = () => {
    const success = onSave({
      supplements: selectedSupplements,
      vitamins: selectedVitamins
    });
    
    if (success) {
      onOpenChange(false);
    }
    
    return success;
  };

  // بررسی وضعیت انتخاب آیتم
  const isSelected = (id: number) => {
    return activeTab === "supplements" 
      ? selectedSupplements.includes(id) 
      : selectedVitamins.includes(id);
  };

  // دسته‌بندی‌های مربوط به تب فعال
  const relevantCategories = categories.filter(cat => 
    cat.type === (activeTab === "supplements" ? "supplement" : "vitamin")
  );

  // محاسبه عرض دیالوگ براساس دستگاه
  const getDialogWidth = () => {
    if (deviceInfo.isMobile) {
      return "w-[100vw]";
    } else if (deviceInfo.isTablet) {
      return "w-[90vw]";
    } else if (deviceInfo.isSmallLaptop) {
      return "w-[85vw]";
    } else {
      return "w-[80vw]";
    }
  };

  // محاسبه ارتفاع دیالوگ براساس دستگاه  
  const getDialogHeight = () => {
    if (deviceInfo.isMobile) {
      return "h-[100vh]";
    } else {
      return "h-[90vh]";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col m-0",
        deviceInfo.isMobile ? "rounded-none shadow-none max-w-[100vw]" : "rounded-xl shadow-xl",
        getDialogWidth(),
        getDialogHeight()
      )} dir="rtl">
        <VisuallyHidden>
          <DialogTitle>
            مدیریت {activeTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها"} برای {studentName}
          </DialogTitle>
          <DialogDescription>
            انتخاب و مدیریت {activeTab === "supplements" ? "مکمل‌های غذایی" : "ویتامین‌ها"} برای {studentName}
          </DialogDescription>
        </VisuallyHidden>
        <DialogHeader className={cn(
          "border-b bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-sm shrink-0",
          deviceInfo.isMobile ? "px-3 py-2" : deviceInfo.isTablet ? "px-4 py-3" : "px-6 py-4"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={cn(
                "rounded-full flex items-center justify-center shadow-md",
                deviceInfo.isMobile ? "w-8 h-8" : "w-10 h-10",
                activeTab === "supplements" 
                  ? "bg-gradient-to-br from-brand-400 to-brand-600" 
                  : "bg-gradient-to-br from-info-400 to-info-600"
              )}>
                {activeTab === "supplements" 
                  ? <Beaker className={deviceInfo.isMobile ? "h-4 w-4" : "h-5 w-5"} color="white" /> 
                  : <Pill className={deviceInfo.isMobile ? "h-4 w-4" : "h-5 w-5"} color="white" />}
              </div>
              <div>
                <h2 className={cn(
                  "font-bold text-foreground",
                  deviceInfo.isMobile ? "text-base" : "text-lg"
                )}>
                  {activeTab === "supplements" ? "مدیریت مکمل‌ها" : "مدیریت ویتامین‌ها"}
                </h2>
                <p className={cn(
                  "font-medium text-muted-foreground",
                  deviceInfo.isMobile ? "text-xs" : "text-sm"
                )}>
                  {studentName}
                </p>
              </div>
            </div>
            
            {!deviceInfo.isMobile && (
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={cn(
                          "border-muted transition-colors",
                          deviceInfo.isMobile ? "h-7 w-7" : "h-9 w-9",
                          viewMode === "grid" && "bg-primary/10 text-primary"
                        )} 
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">نمایش شبکه‌ای</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={cn(
                          "border-muted transition-colors",
                          deviceInfo.isMobile ? "h-7 w-7" : "h-9 w-9",
                          viewMode === "list" && "bg-primary/10 text-primary"
                        )} 
                        onClick={() => setViewMode("list")}
                      >
                        <ListFilter className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">نمایش لیستی</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={cn(
                          "border-muted transition-colors",
                          deviceInfo.isMobile ? "h-7 w-7" : "h-9 w-9",
                          showFilters && "bg-primary/10 text-primary"
                        )} 
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <SlidersHorizontal className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs font-medium">فیلترها</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="flex flex-col h-full overflow-hidden">
          {/* تب‌ها */}
          <div className="border-b bg-muted/10 shrink-0">
            <TabsList className={cn(
              "bg-transparent p-1 gap-1 rounded-none border-b-0",
              deviceInfo.isMobile ? "h-9" : "h-11"
            )}>
              <TabsTrigger 
                value="supplements" 
                className={cn(
                  "rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 dark:data-[state=active]:text-primary data-[state=active]:shadow-none transition-colors duration-200",
                  deviceInfo.isMobile ? "h-7 text-xs" : "h-9 text-sm"
                )}
                onClick={() => setActiveTab("supplements")}
              >
                <Beaker className={deviceInfo.isMobile ? "w-3 h-3 ml-1" : "w-4 h-4 ml-2"} />
                مکمل‌ها
              </TabsTrigger>
              <TabsTrigger 
                value="vitamins" 
                className={cn(
                  "rounded-md data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary-foreground dark:data-[state=active]:bg-secondary/20 dark:data-[state=active]:text-secondary-foreground data-[state=active]:shadow-none transition-colors duration-200",
                  deviceInfo.isMobile ? "h-7 text-xs" : "h-9 text-sm"
                )}
                onClick={() => setActiveTab("vitamins")}
              >
                <Pill className={deviceInfo.isMobile ? "w-3 h-3 ml-1" : "w-4 h-4 ml-2"} />
                ویتامین‌ها
              </TabsTrigger>
            </TabsList>
          </div>

          {/* جستجو */}
          <div className={cn(
            "border-b bg-muted/20 shrink-0",
            deviceInfo.isMobile ? "px-3 py-2" : "px-6 py-3"
          )}>
            <div className="relative flex-1">
              <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder={`جستجو در ${activeTab === "supplements" ? "مکمل‌ها" : "ویتامین‌ها"}...`}
                className={cn(
                  "pl-3 pr-10 bg-background focus-visible:ring-primary/20 border-muted text-right",
                  deviceInfo.isMobile ? "h-8 text-xs" : "h-10 text-sm"
                )}
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
              />
            </div>
          </div>

          {/* فیلترها */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{height: 0, opacity: 0}}
                animate={{height: 'auto', opacity: 1}}
                exit={{height: 0, opacity: 0}}
                transition={{duration: 0.2}}
                className="flex-shrink-0 overflow-hidden bg-muted/10 border-b"
              >
                <div className={cn(
                  "flex flex-col gap-3",
                  deviceInfo.isMobile ? "p-2" : "p-4"
                )}>
                  <div>
                    <h3 className={cn(
                      "font-medium mb-2 text-foreground",
                      deviceInfo.isMobile ? "text-xs" : "text-sm"
                    )}>
                      فیلتر براساس دسته‌بندی
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      <Badge 
                        variant={selectedCategory === "all" ? "default" : "outline"} 
                        className={cn(
                          "cursor-pointer transition-all hover:bg-primary/10",
                          deviceInfo.isMobile ? "text-[0.65rem] px-2 py-0" : "text-xs",
                          activeTab === "supplements" 
                            ? "data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90" 
                            : "data-[state=checked]:bg-secondary data-[state=checked]:hover:bg-secondary/90"
                        )}
                        onClick={() => setSelectedCategory("all")}
                      >
                        همه دسته‌بندی‌ها
                      </Badge>
                      {relevantCategories.map(category => (
                        <Badge 
                          key={category.id} 
                          variant={selectedCategory === category.name ? "default" : "outline"} 
                          className={cn(
                            "cursor-pointer transition-all hover:bg-primary/10",
                            deviceInfo.isMobile ? "text-[0.65rem] px-2 py-0" : "text-xs",
                            activeTab === "supplements" 
                              ? "data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary/90" 
                              : "data-[state=checked]:bg-secondary data-[state=checked]:hover:bg-secondary/90"
                          )}
                          onClick={() => setSelectedCategory(category.name)}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* لیست آیتم‌ها */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full w-full">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                  <div className={cn(
                    "rounded-full flex items-center justify-center mb-4 shadow-sm",
                    deviceInfo.isMobile ? "w-12 h-12" : "w-16 h-16",
                    activeTab === "supplements" 
                      ? "bg-gradient-to-b from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30" 
                      : "bg-gradient-to-b from-secondary/10 to-secondary/20 dark:from-secondary/20 dark:to-secondary/30"
                  )}>
                    {activeTab === "supplements" ? (
                      <Beaker className={`${deviceInfo.isMobile ? "h-6 w-6" : "h-8 w-8"} text-primary`} />
                    ) : (
                      <Pill className={`${deviceInfo.isMobile ? "h-6 w-6" : "h-8 w-8"} text-secondary-foreground`} />
                    )}
                  </div>
                  <h3 className={cn(
                    "font-medium text-foreground",
                    deviceInfo.isMobile ? "text-base" : "text-lg"
                  )}>
                    هیچ {activeTab === "supplements" ? "مکملی" : "ویتامینی"} یافت نشد
                  </h3>
                </div>
              ) : viewMode === "grid" ? (
                <div className={cn(
                  "grid gap-2 sm:gap-3",
                  deviceInfo.isMobile ? "p-2 grid-cols-1" : 
                  deviceInfo.isTablet ? "p-2 grid-cols-2 md:grid-cols-3" : 
                  deviceInfo.isSmallLaptop ? "p-3 grid-cols-3 lg:grid-cols-4" : 
                  "p-3 grid-cols-4 xl:grid-cols-5"
                )}>
                  {filteredItems.map(item => (
                    <motion.div 
                      key={item.id} 
                      initial={{opacity: 0, scale: 0.95}}
                      animate={{opacity: 1, scale: 1}}
                      transition={{duration: 0.2}}
                      layout
                    >
                      <div 
                        className={cn(
                          "border transition-all cursor-pointer shadow-sm hover:shadow",
                          deviceInfo.isMobile ? "p-2 rounded-lg" : "p-4 rounded-xl",
                          isSelected(item.id) 
                            ? activeTab === "supplements"
                              ? "border-violet-300 bg-violet-50 dark:border-violet-700 dark:bg-violet-900/20"
                              : "border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20"
                            : "border-border hover:border-primary/20 bg-card hover:bg-muted/50"
                        )}
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className="flex gap-2 sm:gap-3 items-start">
                          <div className={cn(
                            "rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors",
                            deviceInfo.isMobile ? "w-4 h-4" : "w-5 h-5",
                            isSelected(item.id) 
                              ? activeTab === "supplements"
                                ? "bg-violet-500"
                                : "bg-blue-500"
                              : "border-2 border-muted-foreground/30"
                          )}>
                            {isSelected(item.id) && <Check className={deviceInfo.isMobile ? "h-2 w-2" : "h-3 w-3"} color="white" />}
                          </div>
                          <div className="space-y-1 sm:space-y-2">
                            <div>
                              <h4 className={cn(
                                "font-medium text-foreground",
                                deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base"
                              )}>
                                {item.name}
                              </h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <span className={cn(
                                  "px-2 py-0.5 rounded-full border",
                                  deviceInfo.isMobile ? "text-[0.65rem]" : "text-xs",
                                  activeTab === "supplements"
                                    ? "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                                    : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                                )}>
                                  {item.category}
                                </span>
                              </div>
                            </div>
                            {(item.dosage || item.timing) && (
                              <div className="space-y-0.5">
                                {item.dosage && (
                                  <div className={cn(
                                    "flex items-center gap-1",
                                    deviceInfo.isMobile ? "text-[0.65rem]" : "text-xs"
                                  )}>
                                    <span className="font-medium text-foreground">دوز مصرف:</span>
                                    <span className="text-muted-foreground">{item.dosage}</span>
                                  </div>
                                )}
                                {item.timing && (
                                  <div className={cn(
                                    "flex items-center gap-1",
                                    deviceInfo.isMobile ? "text-[0.65rem]" : "text-xs"
                                  )}>
                                    <span className="font-medium text-foreground">زمان مصرف:</span>
                                    <span className="text-muted-foreground">{item.timing}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="divide-y">
                  {filteredItems.map(item => (
                    <motion.div 
                      key={item.id} 
                      initial={{opacity: 0, y: 5}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.2}}
                    >
                      <div 
                        className={cn(
                          "transition-all cursor-pointer hover:bg-muted/50",
                          deviceInfo.isMobile ? "p-2" : deviceInfo.isTablet ? "p-3" : "p-4",
                          isSelected(item.id) 
                            ? activeTab === "supplements"
                              ? "bg-violet-50 dark:bg-violet-900/20"
                              : "bg-blue-50 dark:bg-blue-900/20"
                            : ""
                        )}
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className="flex gap-2 sm:gap-3">
                          <div className={cn(
                            "rounded-full mt-1 flex-shrink-0 flex items-center justify-center transition-colors",
                            deviceInfo.isMobile ? "w-4 h-4" : "w-5 h-5",
                            isSelected(item.id) 
                              ? activeTab === "supplements"
                                ? "bg-violet-500"
                                : "bg-blue-500"
                              : "border-2 border-muted-foreground/30"
                          )}>
                            {isSelected(item.id) && <Check className={deviceInfo.isMobile ? "h-2 w-2" : "h-3 w-3"} color="white" />}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between flex-wrap gap-1">
                              <h4 className={cn(
                                "font-medium text-foreground",
                                deviceInfo.isMobile ? "text-xs" : deviceInfo.isTablet ? "text-sm" : "text-base"
                              )}>
                                {item.name}
                              </h4>
                              <span className={cn(
                                "px-2 py-0.5 rounded-full border",
                                deviceInfo.isMobile ? "text-[0.65rem]" : "text-xs",
                                activeTab === "supplements"
                                  ? "bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                                  : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                              )}>
                                {item.category}
                              </span>
                            </div>
                            
                            {(item.dosage || item.timing) && (
                              <div className={cn(
                                "flex gap-3 mt-1",
                                deviceInfo.isMobile ? "text-[0.65rem]" : "text-xs"
                              )}>
                                {item.dosage && (
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium text-foreground">دوز مصرف:</span>
                                    <span className="text-muted-foreground">{item.dosage}</span>
                                  </div>
                                )}
                                {item.timing && (
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium text-foreground">زمان مصرف:</span>
                                    <span className="text-muted-foreground">{item.timing}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* فوتر */}
          <div className={cn(
            "border-t mt-auto bg-muted/20 shrink-0 flex items-center justify-between",
            deviceInfo.isMobile ? "p-3" : "p-4"
          )}>
            <div className="flex items-center gap-2">
              <motion.div 
                initial={{scale: 0.9, opacity: 0}}
                animate={{
                  scale: selectedSupplements.length + selectedVitamins.length > 0 ? 1 : 0.9,
                  opacity: selectedSupplements.length + selectedVitamins.length > 0 ? 1 : 0
                }} 
                className={cn(
                  "rounded-full text-white flex items-center gap-1.5",
                  deviceInfo.isMobile ? "px-2 py-1 text-[0.65rem]" : "px-3 py-1.5 text-xs",
                  activeTab === "supplements" 
                    ? "bg-gradient-to-r from-violet-500 to-purple-500" 
                    : "bg-gradient-to-r from-blue-500 to-indigo-500"
                )}
              >
                <Plus className={deviceInfo.isMobile ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />
                {toPersianNumbers(
                  activeTab === "supplements" 
                    ? selectedSupplements.length 
                    : selectedVitamins.length
                )} {activeTab === "supplements" ? "مکمل" : "ویتامین"} انتخاب شده
              </motion.div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                className={cn(
                  "gap-1.5",
                  deviceInfo.isMobile ? "text-xs h-7 px-2" : "text-sm h-9"
                )}
              >
                <X className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
                انصراف
              </Button>
              <Button 
                onClick={handleSave} 
                className={cn(
                  "gap-1.5 text-white border-0",
                  deviceInfo.isMobile ? "text-xs h-7 px-2" : "text-sm h-9",
                  activeTab === "supplements"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                )}
                disabled={selectedSupplements.length + selectedVitamins.length === 0}
              >
                <Save className={deviceInfo.isMobile ? "h-3 w-3" : "h-4 w-4"} />
                ذخیره
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
