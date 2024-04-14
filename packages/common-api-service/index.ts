// Import the framework and instantiate it
import Fastify from "fastify"
import { createWechatyBot } from "../common-wechaty/create-wechaty-bot"

const fastify = Fastify({
  logger: true,
})

const bot = createWechatyBot({ name: "default" })

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" }
})

fastify.get("/bot/start", async () => {
  bot.on("error", (error) => {
    console.error("-- [error]: ", error)
  })

  try {
    console.log("\n-- starting\n")
    await bot.start()
  } catch (e) {
    console.log("\n-- err\n")
    await bot.stop()
  } finally {
    console.log(`-- [finally] state: `, bot.state)
  }
  return "starting"
})

fastify.get("/bot/stop", async () => {
  void bot.stop()
  return "stopping"
})

fastify.get("/bot/state", async () => {
  return bot.state
})

// Run the server!
try {
  await fastify.listen({ port: 40414 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
