"use client";

import { cn } from "@/app/lib/utils";

const Button = ({ children, variant = "default", className, ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium",
        variant === "default" &&
          "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" &&
          "border border-border text-foreground hover:bg-muted hover:text-muted-foreground",
        variant === "destructive" &&
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        variant === "ghost" &&
          "bg-transparent text-foreground hover:bg-muted hover:text-muted-foreground",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };