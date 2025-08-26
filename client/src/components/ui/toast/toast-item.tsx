
import { ToastIcon } from "./toast-icon"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { ToastType } from "@/hooks/toast/toast-types"

interface ToastItemProps {
  toast: ToastType
}

export function ToastItem({ toast }: ToastItemProps) {
  const { id, title, description, action, variant, ...props } = toast
  
  return (
    <Toast 
      key={id} 
      {...props}
      variant={variant}
      className={cn(
        "group shadow-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[swipe=end]:animate-out data-[state=closed]:fade-out-80",
        "data-[state=open]:slide-in-from-top-full data-[state=closed]:slide-out-to-top-full",
        "persian-numbers flex items-start gap-3 p-4 rounded-xl"
      )}
    >
      <div className="shrink-0 pt-0.5">
        <ToastIcon variant={variant || "default"} />
      </div>
      <div className="grid gap-1 flex-1 text-right">
        {title && (
          <ToastTitle className="text-base font-semibold">
            {title}
          </ToastTitle>
        )}
        {description && (
          <ToastDescription className="text-sm opacity-90">
            {description}
          </ToastDescription>
        )}
        {action}
      </div>
      <ToastClose className="absolute left-2 top-2 rounded-md p-1 text-foreground/50 opacity-100 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100" />
    </Toast>
  )
}
