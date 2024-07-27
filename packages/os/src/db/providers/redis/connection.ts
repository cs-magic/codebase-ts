import { getEnv } from "@cs-magic/common"
import { Redis } from "ioredis"

const env = getEnv()

const createRedisClient = () =>
  new Redis().on("error", (err) => console.log("Redis Client Error", err))
export const globalForRedis = globalThis as unknown as {
  redis: ReturnType<typeof createRedisClient> | undefined
}
export const redis = globalForRedis.redis ?? createRedisClient()
if (env?.NODE_ENV !== "production") globalForRedis.redis = redis
