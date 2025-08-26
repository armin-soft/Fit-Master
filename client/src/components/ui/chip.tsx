
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary ring-primary/30 hover:bg-primary/20",
        secondary:
          "bg-secondary/10 text-secondary-foreground ring-secondary/20 hover:bg-secondary/20",
        outline: "bg-background text-foreground ring-border hover:bg-muted/40",
        success:
          "bg-success-500/10 text-success-700 ring-success-600/20 hover:bg-success-500/20",
        warning:
          "bg-warning-500/10 text-warning-700 ring-warning-600/20 hover:bg-warning-500/20",
        danger:
          "bg-destructive/10 text-destructive ring-destructive/20 hover:bg-destructive/20",
        info: "bg-primary/10 text-primary ring-primary/30 hover:bg-primary/20",
      },
      interactive: {
        true: "cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: true,
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  onRemove?: () => void;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant, interactive, onRemove, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(chipVariants({ variant, interactive }), className)}
        {...props}
      >
        {props.children}
        {onRemove && (
          <button
            type="button"
            className="ml-1 -mr-1 h-3.5 w-3.5 rounded-full hover:bg-muted/40 flex items-center justify-center"
            onClick={onRemove}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="sr-only">Remove</span>
          </button>
        )}
      </span>
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };
