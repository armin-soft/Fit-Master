import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Pill, Heart, Plus, X } from "lucide-react";

interface SupplementDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (supplementData: any) => void;
  editingSupplement?: any;
  categories: any[];
  type: 'supplement' | 'vitamin';
  selectedCategoryId?: number | null;
}

export const SupplementDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  editingSupplement,
  categories,
  type,
  selectedCategoryId
}: SupplementDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    categoryId: "",
    type: type
  });

  useEffect(() => {
    if (editingSupplement) {
      setFormData({
        name: editingSupplement.name || "",
        dosage: editingSupplement.dosage || "",
        frequency: editingSupplement.frequency || "",
        categoryId: editingSupplement.categoryId?.toString() || "",
        type: editingSupplement.type || type
      });
    } else {
      setFormData({
        name: "",
        dosage: "",
        frequency: "",
        categoryId: selectedCategoryId ? selectedCategoryId.toString() : "",
        type: type
      });
    }
  }, [editingSupplement, isOpen, type, selectedCategoryId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.dosage.trim() || !formData.categoryId) {
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      dosage: formData.dosage.trim(),
      frequency: formData.frequency.trim(),
      categoryId: parseInt(formData.categoryId)
    });

    // Reset form
    setFormData({
      name: "",
      dosage: "",
      frequency: "",
      categoryId: "",
      type: type
    });
  };

  const isVitamin = type === 'vitamin';
  const Icon = isVitamin ? Heart : Pill;
  const typeLabel = isVitamin ? 'ویتامین' : 'مکمل';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isVitamin ? 'bg-info-100' : 'bg-emerald-100'}`}>
              <Icon className={`w-5 h-5 ${isVitamin ? 'text-info-600' : 'text-emerald-600'}`} />
            </div>
            <div>
              <DialogTitle>
                {editingSupplement ? `ویرایش ${typeLabel}` : `افزودن ${typeLabel}`}
              </DialogTitle>
              <DialogDescription id="supplement-dialog-description">
                {editingSupplement ? `اطلاعات ${typeLabel} را ویرایش کنید` : `${typeLabel} جدید ایجاد کنید`}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supplement-name">نام {typeLabel}</Label>
              <Input
                id="supplement-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                placeholder={`نام ${typeLabel} را وارد کنید`}
                className="w-full"
                dir="rtl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplement-category">دسته‌بندی</Label>
              {selectedCategoryId && !editingSupplement ? (
                <div className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700 dir-rtl">
                  {categories.find(cat => cat.id === selectedCategoryId)?.name || 'دسته‌بندی انتخاب شده'}
                  <span className="text-sm text-gray-500 block mt-1">
                    (دسته‌بندی به صورت خودکار انتخاب شده است)
                  </span>
                </div>
              ) : (
                <Select 
                  value={formData.categoryId} 
                  onValueChange={(value) => setFormData(prev => ({...prev, categoryId: value}))}
                  dir="rtl"
                  disabled={selectedCategoryId && !editingSupplement}
                >
                  <SelectTrigger className="w-full" dir="rtl">
                    <SelectValue placeholder="دسته‌بندی را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    {categories
                      .filter(cat => cat.type === type || !cat.type)
                      .map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplement-dosage">دوز مصرف</Label>
                <Input
                  id="supplement-dosage"
                  value={formData.dosage}
                  onChange={(e) => setFormData(prev => ({...prev, dosage: e.target.value}))}
                  placeholder="مثال: 2 قرص"
                  className="w-full"
                  dir="rtl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplement-frequency">زمان مصرف</Label>
                <Input
                  id="supplement-frequency"
                  value={formData.frequency}
                  onChange={(e) => setFormData(prev => ({...prev, frequency: e.target.value}))}
                  placeholder="مثال: صبح و شب"
                  className="w-full"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="submit" 
                className={`flex-1 ${isVitamin ? 'bg-info-500 hover:bg-info-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
              >
                {editingSupplement ? "ویرایش" : "افزودن"}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};