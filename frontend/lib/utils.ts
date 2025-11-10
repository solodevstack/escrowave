import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assertValue<T>(
  v: T | undefined,
  errorMessage?: string
): NonNullable<T> {
  if (v === undefined || v === null) {
    throw new Error(errorMessage ?? "Missing property");
  }
  return v;
}
