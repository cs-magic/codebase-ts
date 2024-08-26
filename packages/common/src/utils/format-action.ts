import logger from "../log/index.js"

import { formatError } from "./format-error.js"

export type AsyncOrSync<T> = T extends Promise<any> ? T : Promise<T>

export const formatAction = async <T>(func: () => T | Promise<T>, name = "doing action"): Promise<T> => {
  try {
    logger.info(`🌈 ${name}`)
    const result = await Promise.resolve(func())
    logger.info(`✅  ${name}`) // need extra space
    return result
  } catch (e) {
    logger.info(`❌  ${name}`) // need extra space
    formatError(e)
    throw e
  }
}
