import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getClassName = (tailwind: string, isActive: boolean) =>
  cn(tailwind, isActive && "outline-offset-box relative");
