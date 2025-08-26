
import { ToastItem } from "./toast-item"
import { ToastViewport } from "@/components/ui/toast"
import { ToastType } from "@/hooks/toast/toast-types"

interface ToastContainerProps {
  toasts: ToastType[]
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
      <ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-0 sm:flex-col md:max-w-[420px] mx-auto" />
    </>
  )
}
