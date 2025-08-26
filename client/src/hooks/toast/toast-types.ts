
import * as React from "react"
import { type ToastProps } from "@/components/ui/toast"

// Define ToastType with proper types
export type ToastType = Omit<ToastProps, "id"> & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Define action types as constants
export const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

export type ActionType = typeof actionTypes

export type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToastType
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToastType>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToastType["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToastType["id"]
    }

export interface State {
  toasts: ToastType[]
}

// Custom variants to include "success" and "warning"
export type ToastVariant = "default" | "destructive" | "success" | "warning";

export type Toast = Omit<ToastType, "id">;

// Import ToastActionElement from toast component
import { type ToastActionElement } from "@/components/ui/toast";
