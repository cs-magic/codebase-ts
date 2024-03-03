import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { nanoid } from "nanoid"
import { NANOID_LEN } from "@/config/system"

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

export function getRecordKeys<K extends string, T extends Record<K, any> = any>(
  record: T,
): K[] {
  return Object.keys(record) as K[]
}

export class FixedArray<T> extends Array<T> {
  private maxSize: number

  constructor(size = 8) {
    // the Array default size
    super(size)
    this.maxSize = size
  }

  public push(...items: T[]): number {
    super.push(...items)
    while (this.length > this.maxSize) this.shift()
    // console.log("pushed: ", this.toString())
    return this.length
  }
}

export class UnexpectedError extends Error {
  constructor() {
    super("Unexpected!")
  }
}

export const getNewId = (): string => nanoid(NANOID_LEN)
