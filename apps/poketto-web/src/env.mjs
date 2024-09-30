import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const nodeEnv = process.env.NODE_ENV;
// console.log({ nodeEnv });

export const baseEnv = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),

    OPENAI_API_KEY: z.string(),
    KV_REST_API_URL: z.string().optional(),
    KV_REST_API_TOKEN: z.string().optional(),

    ALI_AK: z.string().optional(),
    ALI_SK: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,

    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,

    ALI_AK: process.env.ALI_AK,
    ALI_SK: process.env.ALI_SK,
  },
});
// console.log({ baseEnv });

export const authEnv = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NEXTAUTH_SECRET:
      nodeEnv === "production" ? z.string() : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str, // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),

    // Add ` on ID and SECRET if you want to make sure they're not empty
    DISCORD_CLIENT_ID: z.string().optional(),
    DISCORD_CLIENT_SECRET: z.string().optional(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),

    AWS_AK: z.string().optional(),
    AWS_SK: z.string().optional(),
    POSTMARK_API_TOKEN: z.string().optional(),
    POSTMARK_SIGN_IN_TEMPLATE: z.string().optional(),
    POSTMARK_ACTIVATION_TEMPLATE: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

    AWS_AK: process.env.AWS_AK,
    AWS_SK: process.env.AWS_SK,
    POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
    POSTMARK_SIGN_IN_TEMPLATE: process.env.POSTMARK_SIGN_IN_TEMPLATE,
    POSTMARK_ACTIVATION_TEMPLATE: process.env.POSTMARK_ACTIVATION_TEMPLATE,
  } /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validations.
   * This is especially useful for Docker builds.
   */,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

export const paymentEnv = createEnv({
  server: {
    STRIPE_API_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string(), // must
  },
  client: {},
  runtimeEnv: {
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
});
