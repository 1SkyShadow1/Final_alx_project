"use client";

import { cn } from "@/lib/utils";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "block w-full rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
      {...props}
    />
  );
};

const Label = ({ htmlFor, children, className, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-sm font-medium text-muted-foreground", className)}
      {...props}
    >
      {children}
    </label>
  );
};

export { Input, Label };