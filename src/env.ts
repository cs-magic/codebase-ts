import dotenv from "dotenv"

dotenv.config()

export const env = {
  // env
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,

  // db
  DATABASE_URL: process.env.DATABASE_URL,

  // next-auth
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  // discord
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

  // ali
  ALI_AK: process.env.ALI_AK,
  ALI_SK: process.env.ALI_SK,

  // tencent
  TENCENT_AK: process.env.TENCENT_AK,
  TENCENT_SK: process.env.TENCENT_SK,

  // wechat
  WECHAT_APP_SECRET: process.env.WECHAT_APP_SECRET,

  // pusher
  PUSHER_APP_ID: process.env.PUSHER_APP_ID,
  PUSHER_APP_SECRET: process.env.PUSHER_APP_SECRET,
  NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
}
