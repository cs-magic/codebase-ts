import { customAlphabet } from "nanoid/non-secure"

/**
 * ai/nanoid
 */
export const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_", 5) // 这个要和prisma的位数对齐
