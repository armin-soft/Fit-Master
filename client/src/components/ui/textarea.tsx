
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = false, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    
    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current;
        
        const adjustHeight = () => {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        };
        
        // تنظیم ارتفاع اولیه
        adjustHeight();
        
        // گوش دادن به تغییرات متن
        textarea.addEventListener('input', adjustHeight);
        
        return () => {
          textarea.removeEventListener('input', adjustHeight);
        };
      }
    }, [autoResize, props.value]);

    // ترکیب ref ها
    const combinedRef = React.useCallback((node: HTMLTextAreaElement) => {
      // Update internal ref
      (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      
      // Forward to external ref
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      }
    }, [ref]);

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          autoResize && "resize-none overflow-hidden",
          className
        )}
        ref={combinedRef}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
