import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Folder } from "lucide-react";

interface CategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (categoryData: any) => void;
  editingCategory?: any;
  activeTab?: string;
}

export const CategoryDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  editingCategory,
  activeTab = 'supplements'
}: CategoryDialogProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("supplement");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || "");
      setType(editingCategory.type || "supplement");
    } else {
      setName("");
      // Auto-select type based on active tab
      const autoSelectedType = activeTab === 'vitamins' ? 'vitamin' : 'supplement';
      setType(autoSelectedType);
    }
  }, [editingCategory, isOpen, activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      type
    });

    // Reset form with auto-selected type
    setName("");
    const autoSelectedType = activeTab === 'vitamins' ? 'vitamin' : 'supplement';
    setType(autoSelectedType);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-100 rounded-lg">
              <Folder className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <DialogTitle>
                {editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
              </DialogTitle>
              <DialogDescription id="category-dialog-description">
                {editingCategory ? "اطلاعات دسته‌بندی را ویرایش کنید" : "دسته‌بندی جدید ایجاد کنید"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">نام دسته‌بندی</Label>
            <Input
              id="category-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام دسته‌بندی را وارد کنید"
              className="w-full"
              dir="rtl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-type">نوع</Label>
            <div className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {type === 'vitamin' ? 'ویتامین' : 'مکمل غذایی'}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              نوع بر اساس تب فعلی به صورت خودکار انتخاب شده است
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-brand-500 hover:bg-brand-600">
              {editingCategory ? "ویرایش" : "افزودن"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              لغو
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};