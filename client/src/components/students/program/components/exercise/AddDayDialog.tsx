
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, VisuallyHidden } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddDayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newDayLabel: string;
  setNewDayLabel: (label: string) => void;
  handleAddDay: () => void;
}

const AddDayDialog: React.FC<AddDayDialogProps> = ({
  open,
  onOpenChange,
  newDayLabel,
  setNewDayLabel,
  handleAddDay,
}) => {
  // اضافه کردن Enter key handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newDayLabel.trim()) {
      e.preventDefault();
      handleAddDay();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-800/30" aria-describedby="add-day-dialog-description">
        <DialogHeader>
          <DialogTitle className="text-center text-emerald-700 dark:text-emerald-300">افزودن روز جدید</DialogTitle>
          <DialogDescription id="add-day-dialog-description" className="sr-only">
            فرم افزودن روز جدید به برنامه تمرینی
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              value={newDayLabel}
              onChange={(e) => setNewDayLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="نام روز (مثال: روز پنجم)"
              className="text-right border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 dark:focus:border-emerald-400"
              aria-label="نام روز"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-sky-200 text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:text-sky-300 dark:hover:bg-sky-900/20"
          >
            انصراف
          </Button>
          <Button
            type="button"
            onClick={handleAddDay}
            disabled={!newDayLabel.trim()}
            className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0"
          >
            افزودن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDayDialog;
