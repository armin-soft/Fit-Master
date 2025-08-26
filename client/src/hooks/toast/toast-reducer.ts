
import * as React from "react"
import { actionTypes, type State, type Action, type ToastType } from "./toast-types"

// Generate a unique toast id
export const genId = () => {
  return Math.random().toString(36).substring(2, 9)
}

// Reducer for toast state management
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      }
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }
    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      // If no id is provided, dismiss all
      if (toastId === undefined) {
        return {
          ...state,
          toasts: state.toasts.map((t) => ({
            ...t,
            open: false,
          })),
        }
      }

      // Dismiss by id
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        ),
      }
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Create toast context
const ToastContext = React.createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: { toasts: [] },
  dispatch: () => null,
})

// Action dispatcher for toast operations
export const dispatch = (action: Action) => {
  if (typeof window !== "undefined") {
    const event = new CustomEvent("toast", { detail: action })
    window.dispatchEvent(event)
  }
}
