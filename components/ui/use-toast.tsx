// components/ui/use-toast.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Toast = {
  message: string;
  type: "success" | "error" | "info";
};

type ToastContextType = {
  showToast: (toast: Toast) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1)); // Automatically remove toast after 3 seconds
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 1000,
        }}
      >
        {toasts.map((toast, index) => (
          <div
            key={index}
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor:
                toast.type === "success"
                  ? "green"
                  : toast.type === "error"
                  ? "red"
                  : "blue",
              color: "white",
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
