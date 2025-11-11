import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createAvatar } from "@dicebear/core";
import { pixelArtNeutral } from "@dicebear/collection";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assertValue<T>(
  v: T | undefined,
  errorMessage?: string,
): NonNullable<T> {
  if (v === undefined || v === null) {
    throw new Error(errorMessage ?? "Missing property");
  }
  return v;
}

export function genAvatar(value: string): string | null {
  if (!value) return null;

  return createAvatar(pixelArtNeutral, {
    seed: value,
  }).toDataUri();
}

export function formatAddr(str: string | undefined, n: number = 4): string {
  if (!str) return "";
  return str?.length > n
    ? str.slice(0, 6) + "..." + str.slice(str.length - n)
    : str;
}

export function isActivePath(path: string, pathname: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
}
