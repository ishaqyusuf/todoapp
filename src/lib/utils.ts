import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ReturnTypeAsync<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;
