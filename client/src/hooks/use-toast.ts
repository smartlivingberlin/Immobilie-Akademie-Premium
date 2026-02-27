// Simplified version of shadcn/ui toast hook
import { useState, useEffect } from "react"

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

type ToastOptions = Omit<ToastProps, "id">

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({ title, description, action }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, action }
    setToasts((prev) => [...prev, newToast])
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  return {
    toast,
    toasts,
    dismiss: (id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }
  }
}
