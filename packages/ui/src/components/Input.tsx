import React from "react";
import { cn } from "../lib/utils.ts";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      '__INPUT_CLASSNAME__',
      "h-10 w-full max-w-64 rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };