"use client";

import { cn } from "@/lib/utils";

const Avatar = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const AvatarImage = ({ src, className, ...props }) => {
  return (
    <img
      src={src}
      alt="Avatar"
      className={cn(
        "w-full h-full object-cover",
        className
      )}
      {...props}
    />
  );
};

const AvatarFallback = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center text-foreground font-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarFallback };