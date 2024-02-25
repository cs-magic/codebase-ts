import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// ref: https://stackoverflow.com/a/16702965/9422455
export const PHONE_REGEX =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/

export const validatePhone = (s: string) => PHONE_REGEX.test(s)

export const staticCreate = <T = any>(f: () => T) => {
  const g = globalThis as unknown as {
    data: T | undefined
  }
  return (g.data ??= f())
}
