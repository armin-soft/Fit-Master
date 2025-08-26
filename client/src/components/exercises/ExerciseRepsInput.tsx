
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseRepsInputProps {
  exerciseId: number;
  reps: string;
  onRepsChange: (exerciseId: number, reps: string) => void;
  className?: string;
}

export const ExerciseRepsInput: React.FC<ExerciseRepsInputProps> = ({
  exerciseId,
  reps,
  onRepsChange,
  className,
}) => {
  const repsValue = parseInt(reps) || 10;

  const handleDecrement = () => {
    if (repsValue > 1) {
      onRepsChange(exerciseId, (repsValue - 1).toString());
    }
  };

  const handleIncrement = () => {
    if (repsValue < 30) {
      onRepsChange(exerciseId, (repsValue + 1).toString());
    }
  };

  // Directly handle manual input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[۰-۹]/g, d => String(["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"].indexOf(d))));
    if (!isNaN(value) && value >= 1 && value <= 30) {
      onRepsChange(exerciseId, value.toString());
    }
  };

  return (
    <div
      className={cn(
        "flex items-center h-8 rounded-md bg-muted/40 border border-border/50 p-1 select-none",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-full aspect-square rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted"
        onClick={handleDecrement}
        disabled={repsValue <= 1}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">کاهش</span>
      </Button>
      
      <div className="flex-1 flex items-center justify-center">
        <input 
          type="text" 
          value={toPersianNumbers(reps)}
          onChange={handleInputChange}
          className="w-full text-center bg-transparent border-none focus:outline-none text-sm font-medium"
          style={{ direction: "rtl" }}
        />
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-full aspect-square rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted"
        onClick={handleIncrement}
        disabled={repsValue >= 30}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">افزایش</span>
      </Button>
    </div>
  );
};
