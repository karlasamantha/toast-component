import React from 'react'

export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([])

  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        setToasts([])
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  function handleToasts(message, variant) {
    const newToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        variant,
        message
      }
    ]

    setToasts(newToasts)
  }

  function handleDismiss(toastId) {
    const newToasts = toasts.filter((toast) => toast.id !== toastId)
    setToasts(newToasts)
  }

  const value = { toasts, handleDismiss, handleToasts }
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export default ToastProvider
