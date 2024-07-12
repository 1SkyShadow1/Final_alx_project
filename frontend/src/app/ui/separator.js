"use client";

import { cn } from "@/lib/utils";

const Separator = ({ className, ...props }) => {
  return (
    <hr
      className={cn(
        "border-t border-border",
        className
      )}
      {...props}
    />
  );
};

export { Separator };
