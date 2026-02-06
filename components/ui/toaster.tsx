"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        style: {
          background: "#1f2937",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
        classNames: {
          toast: "!bg-gray-800 !text-white !border !border-white/10",
          success: "!bg-green-600 !text-white !border !border-green-500",
          error: "!bg-red-600 !text-white !border !border-red-500",
          description: "!text-gray-400",
          actionButton: "!bg-blue-600 !text-white",
          cancelButton: "!bg-gray-700 !text-gray-200",
        },
      }}
      {...props}
    />
  );
}
