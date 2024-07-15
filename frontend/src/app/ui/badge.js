"use client";

import { cn } from "@/lib/utils";

const Badge = ({ children, variant = "default", className, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        variant === "default" &&
          "bg-primary text-primary-foreground",
        variant === "outline" &&
          "border border-border text-foreground",
        variant === "destructive" &&
          "bg-destructive text-destructive-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;