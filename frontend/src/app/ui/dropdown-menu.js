"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const DropdownMenu = ({ children, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative" {...props}>
      <DropdownMenuTrigger onClick={toggleOpen} />
      {isOpen && (
        <DropdownMenuContent
          className={cn(
            "absolute z-10 mt-2 w-full rounded-md border border-border shadow-md",
            className
          )}
        >
          {children}
        </DropdownMenuContent>
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, ...props }) => {
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

const DropdownMenuContent = ({ children, className, ...props }) => {
  return (
    <ul
      className={cn(
        "overflow-hidden rounded-md shadow-md",
        className
      )}
      // style={{ opacity: 10 }} 
      {...props}
    >
      {children}
    </ul>
  );
};

const DropdownMenuCheckboxItem = ({
  children,
  value,
  checked,
  onChange,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <li
      className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-muted-foreground"
      {...props}
    >
      <input
        type="checkbox"
        className="h-4 w-4 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500"
        checked={isChecked}
        onChange={handleChange}
        value={value}
      />
      <span className="ml-3">{children}</span>
    </li>
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
};