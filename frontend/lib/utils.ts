import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";
import { toast } from "sonner";

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

  return createAvatar(shapes, {
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

export function copyToClipoard(value: string, message?: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        if (message) toast.success(message ?? "Copied successfully");
      })
      .catch(() => {
        console.error("Failed to copy to clipboard");
      });
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
      if (message) toast.success(message ?? "Copied successfully");
    } catch {
      console.error("Fallback: Failed to copy to clipboard");
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
