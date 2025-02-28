"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  title?: string;
  variant?:
    | "default"
    | "primary"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "data-table-filter";
}

export function Submit({
  isLoading,
  title,
  variant = "primary",
  className,
  ...props
}: SubmitProps) {
  return (
    <Button
      variant={variant || "primary"}
      disabled={isLoading}
      className={cn(
        "w-28", // Ancho fijo
        className
      )}
      {...props}>
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin" />
            </motion.div>
          ) : (
            <motion.span
              key="text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              // exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center">
              <span className="flex gap-2 items-center">
                {title || "Guardar"} <Stethoscope />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Button>
  );
}
