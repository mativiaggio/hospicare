"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
  variant?:
    | "default"
    | "primary"
    | "primary-outline"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function ModeToggle({ variant, className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant={variant || "outline"}
      size="icon"
      className={cn("shadow-none", className)}
      onClick={toggleTheme}>
      <Sun className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
      <Moon className="h-[1.2rem] w-[1.2rem] hidden transition-all dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
