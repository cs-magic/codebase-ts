-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "social-platform";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "totem-gpt";

-- CreateEnum
CREATE TYPE "public"."SseStatus" AS ENUM ('preparing', 'running', 'interrupted', 'finished');

-- CreateTable
CREATE TABLE "totem-gpt"."TotemGenRequest" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(7) NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "TotemGenRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "totem-gpt"."TotemGenResponse" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestId" TEXT NOT NULL,
    "status" "public"."SseStatus" NOT NULL DEFAULT 'preparing',
    "stream" TEXT NOT NULL,

    CONSTRAINT "TotemGenResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "totem-gpt"."TotemGenResponseActions" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "responseId" TEXT NOT NULL,
    "userId" VARCHAR(7) NOT NULL,
    "type" TEXT NOT NULL,
    "detail" TEXT,

    CONSTRAINT "TotemGenResponseActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social-platform"."SocialPlatform" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "SocialPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social-platform"."SocialPlatformAuth" (
    "id" VARCHAR(7) NOT NULL DEFAULT nanoid(7),
    "userId" TEXT NOT NULL,
    "socialPlatformId" TEXT NOT NULL,
    "isLoggedIn" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,

    CONSTRAINT "SocialPlatformAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social-platform"."SocialPlatformEvent" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB,
    "authId" TEXT NOT NULL,

    CONSTRAINT "SocialPlatformEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social-platform"."SocialPlatformPost" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authId" TEXT NOT NULL,
    "text" TEXT,
    "images" JSONB,
    "audios" JSONB,
    "vidios" JSONB,
    "files" JSONB,
    "location" JSONB,
    "permissions" JSONB,
    "publishTime" TIMESTAMP(3),

    CONSTRAINT "SocialPlatformPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "totem-gpt"."TotemGenRequest" ADD CONSTRAINT "TotemGenRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "totem-gpt"."TotemGenResponse" ADD CONSTRAINT "TotemGenResponse_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "totem-gpt"."TotemGenRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "totem-gpt"."TotemGenResponseActions" ADD CONSTRAINT "TotemGenResponseActions_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "totem-gpt"."TotemGenResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "totem-gpt"."TotemGenResponseActions" ADD CONSTRAINT "TotemGenResponseActions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social-platform"."SocialPlatformAuth" ADD CONSTRAINT "SocialPlatformAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social-platform"."SocialPlatformAuth" ADD CONSTRAINT "SocialPlatformAuth_socialPlatformId_fkey" FOREIGN KEY ("socialPlatformId") REFERENCES "social-platform"."SocialPlatform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social-platform"."SocialPlatformEvent" ADD CONSTRAINT "SocialPlatformEvent_authId_fkey" FOREIGN KEY ("authId") REFERENCES "social-platform"."SocialPlatformAuth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social-platform"."SocialPlatformPost" ADD CONSTRAINT "SocialPlatformPost_authId_fkey" FOREIGN KEY ("authId") REFERENCES "social-platform"."SocialPlatformAuth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
