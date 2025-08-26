
import { AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { ToastVariant } from "@/hooks/toast/toast-types"

interface ToastIconProps {
  variant: ToastVariant | undefined
}

export function ToastIcon({ variant }: ToastIconProps) {
  switch (variant) {
    case "destructive":
      return <AlertCircle className="h-5 w-5 text-warning-500" />
    case "success":
      return <CheckCircle className="h-5 w-5 text-success-500" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-warning-500" />
    default:
      return <Info className="h-5 w-5 text-info-500" />
  }
}
