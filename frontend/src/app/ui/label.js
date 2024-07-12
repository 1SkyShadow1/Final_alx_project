"use client";

import { cn } from "@/lib/utils";

const Label = ({ htmlFor, children, ...props }) => {
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

export { Label };