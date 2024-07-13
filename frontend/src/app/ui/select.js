"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const Select = ({ children, id, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative" {...props}>
      <SelectTrigger onClick={toggleOpen} id={id} />
      {isOpen && (
        <SelectContent className="absolute z-10 mt-2 w-full rounded-md bg-background border border-border shadow-md">
          {children}
        </SelectContent>
      )}
    </div>
  );
};

const SelectTrigger = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className="flex items-center justify-between w-full rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      {...props}
    >
      {children}
    </button>
  );
};

const SelectValue = ({ children, ...props }) => {
  return (
    <span className="text-sm font-medium text-foreground" {...props}>
      {children}
    </span>
  );
};

const SelectContent = ({ children, className, ...props }) => {
  return (
    <ul
      className={cn(
        "overflow-hidden rounded-md shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
};

const SelectItem = ({ children, value, ...props }) => {
  return (
    <li
      className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-muted-foreground"
      value={value}
      {...props}
    >
      {children}
    </li>
  );
};

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};