"use client";

import { cn } from "@/app/lib/utils";

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-card shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("p-4 border-b border-border", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("p-4 border-t border-border", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardContent, CardHeader, CardFooter };