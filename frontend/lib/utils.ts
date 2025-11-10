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

export function genAvatar(address: string): string | null {
  if (!address) return null;

  return createAvatar(pixelArtNeutral, {
    seed: address,
  }).toDataUri();
}

export function formatAddr(str: string | undefined, n: number = 4): string {
  if (!str) return "";
  return str?.length > n
    ? str.slice(0, 6) + "..." + str.slice(str.length - n)
    : str;
}
