-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "customer";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "eval";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "llm";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "payment";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "poketto";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "wechat";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateEnum
CREATE TYPE "public"."PlatformType" AS ENUM ('Poketto', 'FlowGPT', 'OpenAI', 'MidJourney', 'StableDiffusion', 'OpenChat', 'email', 'github', 'discord', 'google', 'wxmpArticle', 'bilibiliVideo', 'xhsNote');

-- CreateEnum
CREATE TYPE "customer"."InvitationStatus" AS ENUM ('Idle', 'Pending', 'Accepted', 'Expired');

-- CreateEnum
CREATE TYPE "customer"."IssueType" AS ENUM ('Debunk', 'PuzzleInUse', 'FeatureRequest', 'BugReport', 'LeakReport', 'BusinessCollaboration');

-- CreateEnum
CREATE TYPE "payment"."StripeMode" AS ENUM ('payment', 'subscription');

-- CreateEnum
CREATE TYPE "payment"."StripeSubscriptionLevel" AS ENUM ('basic', 'premium', 'extreme');

-- CreateEnum
CREATE TYPE "payment"."TransactionType" AS ENUM ('charge', 'consume');

-- CreateEnum
CREATE TYPE "llm"."ChatMessageFormatType" AS ENUM ('text', 'image', 'voice', 'video', 'map', 'realtimeVoice', 'realtimeVideo', 'systemNotification');

-- CreateEnum
CREATE TYPE "llm"."PromptRoleType" AS ENUM ('system', 'user', 'assistant', 'data', 'tool', 'function');

-- CreateEnum
CREATE TYPE "poketto"."PokettoRoleType" AS ENUM ('admin', 'manager', 'normal');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('pending', 'running', 'paused', 'done', 'discarded');

-- CreateTable
CREATE TABLE "customer"."User" (
    "id" VARCHAR(7) NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "platformType" "public"."PlatformType" NOT NULL DEFAULT 'Poketto',
    "platformId" TEXT NOT NULL,
    "platformArgs" JSONB,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "description" TEXT,
    "followedByCount" INTEGER NOT NULL DEFAULT 0,
    "followingCount" INTEGER NOT NULL DEFAULT 0,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "stripeSubscriptionEnd" TIMESTAMP(3),
    "stripeCustomerId" TEXT,
    "quota" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer"."Feedback" (
    "id" TEXT NOT NULL,
    "issueType" "customer"."IssueType" NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer"."FollowRelation" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,

    CONSTRAINT "FollowRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer"."InvitationRelation" (
    "id" TEXT NOT NULL,
    "status" "customer"."InvitationStatus" NOT NULL DEFAULT 'Idle',
    "fromId" TEXT NOT NULL,
    "toId" TEXT,

    CONSTRAINT "InvitationRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."Account" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "payment"."Coupon" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(7) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment"."StripeProduct" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "mode" "payment"."StripeMode" NOT NULL,
    "expire" INTEGER,
    "level" "payment"."StripeSubscriptionLevel" DEFAULT 'basic',

    CONSTRAINT "StripeProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment"."StripePayment" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "redeemCode" TEXT,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StripePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "llm"."ChatMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "role" "llm"."PromptRoleType" NOT NULL DEFAULT 'user',
    "content" TEXT,
    "format" "llm"."ChatMessageFormatType" NOT NULL DEFAULT 'text',
    "conversationId" TEXT NOT NULL,
    "namespace" TEXT DEFAULT 'default',
    "vector" vector,
    "cost" DOUBLE PRECISION DEFAULT 0,
    "modelType" TEXT DEFAULT 'gpt-3.5-turbo',
    "isUsingFree" BOOLEAN DEFAULT false,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "llm"."ChatMessageAction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "ChatMessageAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "llm"."Conversation" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poketto"."PokettoApp" (
    "id" VARCHAR(7) NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "platformType" "public"."PlatformType" NOT NULL DEFAULT 'Poketto',
    "platformId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "isOpenSource" BOOLEAN NOT NULL DEFAULT true,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "categoryMain" INTEGER NOT NULL,
    "categorySub" INTEGER NOT NULL,
    "modelName" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PokettoApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poketto"."PokettoAppAction" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "appId" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "PokettoAppAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poketto"."PokettoAppCategory" (
    "id" TEXT NOT NULL,
    "main" INTEGER NOT NULL,
    "sub" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "PokettoAppCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poketto"."PokettoAppComment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "rate" INTEGER DEFAULT 0,

    CONSTRAINT "PokettoAppComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poketto"."PokettoAppPrompts" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "role" "llm"."PromptRoleType" NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "PokettoAppPrompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poketto"."PokettoAppStarred" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PokettoAppStarred_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poketto"."PokettoAppState" (
    "id" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "forks" INTEGER NOT NULL DEFAULT 0,
    "tips" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "calls" INTEGER NOT NULL DEFAULT 0,
    "shares" INTEGER NOT NULL DEFAULT 0,
    "appId" TEXT NOT NULL,

    CONSTRAINT "PokettoAppState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poketto"."PokettoAppTag" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "PokettoAppTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."EvalApp" (
    "id" VARCHAR(5) NOT NULL DEFAULT nanoid(5),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user" TEXT,
    "modelName" TEXT NOT NULL,
    "systemPrompt" TEXT,
    "title" TEXT,
    "granted" BOOLEAN NOT NULL DEFAULT false,
    "temperature" DOUBLE PRECISION DEFAULT 0.7,
    "maxTokens" INTEGER DEFAULT 4096,
    "topP" DOUBLE PRECISION DEFAULT 0.5,
    "frequencyPenalty" DOUBLE PRECISION DEFAULT 0,
    "presencePenalty" DOUBLE PRECISION DEFAULT 0,
    "n" INTEGER DEFAULT 1,
    "streaming" BOOLEAN DEFAULT true,
    "stop" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "timeout" INTEGER DEFAULT 3000,
    "openAIApiKey" TEXT,

    CONSTRAINT "EvalApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."EvalCard" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user" JSONB,
    "platformType" "public"."PlatformType" NOT NULL,
    "platformId" TEXT,
    "platformData" JSONB,
    "sourceUrl" TEXT,
    "author" JSONB,
    "time" TIMESTAMP(3),
    "title" TEXT,
    "description" TEXT,
    "cover" JSONB,
    "images" JSONB[],
    "iFrames" JSONB[],
    "videos" JSONB[],
    "html" TEXT,
    "contentMd" TEXT,
    "stat" JSONB,
    "ossUrl" TEXT,

    CONSTRAINT "EvalCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."EvalCompany" (
    "id" TEXT NOT NULL DEFAULT nanoid(5),
    "title" TEXT NOT NULL,
    "url" TEXT,
    "logo" TEXT,

    CONSTRAINT "EvalCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."EvalConv" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "currentRequestId" TEXT,

    CONSTRAINT "EvalConv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."EvalLlmResponse" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cardId" TEXT NOT NULL,
    "response" JSONB,
    "ossUrl" TEXT,

    CONSTRAINT "EvalLlmResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."EvalModel" (
    "id" TEXT NOT NULL DEFAULT nanoid(5),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "logo" TEXT,
    "url" TEXT,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "EvalModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."EvalRequest" (
    "id" TEXT NOT NULL DEFAULT nanoid(9),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "context" JSONB NOT NULL,
    "convId" TEXT NOT NULL,

    CONSTRAINT "EvalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."EvalResponse" (
    "id" TEXT NOT NULL DEFAULT nanoid(9),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "convId" TEXT,
    "requestId" TEXT,
    "appId" TEXT,
    "appClientId" TEXT,
    "content" TEXT,
    "error" TEXT,
    "tTrigger" TIMESTAMP(3),
    "tStart" TIMESTAMP(3),
    "tEnd" TIMESTAMP(3),
    "isDraft" BOOLEAN DEFAULT false,
    "interruptedAt" TIMESTAMP(3),

    CONSTRAINT "EvalResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."EvalTask" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."TaskStatus" NOT NULL DEFAULT 'pending',
    "convId" TEXT,
    "notes" TEXT[],
    "priority" INTEGER NOT NULL DEFAULT 5,
    "timer" JSONB,

    CONSTRAINT "EvalTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wechat"."WechatMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "talkerId" TEXT NOT NULL,
    "listenerId" TEXT,
    "roomId" TEXT,
    "timestamp" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "text" TEXT,
    "mentionIdList" TEXT[],
    "filename" TEXT,

    CONSTRAINT "WechatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wechat"."WechatConv" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "friend" BOOLEAN,
    "gender" INTEGER,
    "type" INTEGER,
    "weixin" TEXT,
    "alias" TEXT,
    "city" TEXT,
    "province" TEXT,
    "signature" TEXT,
    "phone" TEXT[],
    "address" TEXT,
    "star" BOOLEAN,
    "adminIdList" TEXT[],
    "memberIdList" TEXT[],
    "topic" TEXT,
    "ownerId" TEXT,
    "preference" JSONB,
    "data" JSONB,

    CONSTRAINT "WechatConv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poketto"."_PokettoAppToPokettoAppTag" (
    "A" VARCHAR(7) NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "eval"."_EvalAppToEvalRequest" (
    "A" VARCHAR(5) NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "customer"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "customer"."User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_platformType_platformId_key" ON "customer"."User"("platformType", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "InvitationRelation_toId_key" ON "customer"."InvitationRelation"("toId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "auth"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "auth"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "auth"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "auth"."VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "conversation" ON "llm"."Conversation"("userId", "appId");

-- CreateIndex
CREATE UNIQUE INDEX "PokettoApp_platformType_platformId_key" ON "poketto"."PokettoApp"("platformType", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "PokettoAppCategory_main_sub_key" ON "poketto"."PokettoAppCategory"("main", "sub");

-- CreateIndex
CREATE UNIQUE INDEX "PokettoAppState_appId_key" ON "poketto"."PokettoAppState"("appId");

-- CreateIndex
CREATE UNIQUE INDEX "PokettoAppTag_name_key" ON "poketto"."PokettoAppTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EvalCard_platformType_platformId_key" ON "eval"."EvalCard"("platformType", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "EvalResponse_convId_key" ON "eval"."EvalResponse"("convId");

-- CreateIndex
CREATE UNIQUE INDEX "_PokettoAppToPokettoAppTag_AB_unique" ON "poketto"."_PokettoAppToPokettoAppTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PokettoAppToPokettoAppTag_B_index" ON "poketto"."_PokettoAppToPokettoAppTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EvalAppToEvalRequest_AB_unique" ON "eval"."_EvalAppToEvalRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_EvalAppToEvalRequest_B_index" ON "eval"."_EvalAppToEvalRequest"("B");

-- AddForeignKey
ALTER TABLE "customer"."Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer"."FollowRelation" ADD CONSTRAINT "FollowRelation_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer"."FollowRelation" ADD CONSTRAINT "FollowRelation_toId_fkey" FOREIGN KEY ("toId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer"."InvitationRelation" ADD CONSTRAINT "InvitationRelation_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer"."InvitationRelation" ADD CONSTRAINT "InvitationRelation_toId_fkey" FOREIGN KEY ("toId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment"."Coupon" ADD CONSTRAINT "Coupon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment"."StripePayment" ADD CONSTRAINT "StripePayment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "payment"."StripeProduct"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment"."StripePayment" ADD CONSTRAINT "StripePayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."ChatMessage" ADD CONSTRAINT "ChatMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "llm"."Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."ChatMessageAction" ADD CONSTRAINT "ChatMessageAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."ChatMessageAction" ADD CONSTRAINT "ChatMessageAction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "llm"."ChatMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."Conversation" ADD CONSTRAINT "Conversation_appId_fkey" FOREIGN KEY ("appId") REFERENCES "poketto"."PokettoApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoApp" ADD CONSTRAINT "PokettoApp_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoApp" ADD CONSTRAINT "PokettoApp_categoryMain_categorySub_fkey" FOREIGN KEY ("categoryMain", "categorySub") REFERENCES "poketto"."PokettoAppCategory"("main", "sub") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoAppAction" ADD CONSTRAINT "PokettoAppAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoAppAction" ADD CONSTRAINT "PokettoAppAction_appId_fkey" FOREIGN KEY ("appId") REFERENCES "poketto"."PokettoApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoAppCategory" ADD CONSTRAINT "PokettoAppCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoAppComment" ADD CONSTRAINT "PokettoAppComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoAppComment" ADD CONSTRAINT "PokettoAppComment_appId_fkey" FOREIGN KEY ("appId") REFERENCES "poketto"."PokettoApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoAppPrompts" ADD CONSTRAINT "PokettoAppPrompts_appId_fkey" FOREIGN KEY ("appId") REFERENCES "poketto"."PokettoApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoAppStarred" ADD CONSTRAINT "PokettoAppStarred_appId_fkey" FOREIGN KEY ("appId") REFERENCES "poketto"."PokettoApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoAppStarred" ADD CONSTRAINT "PokettoAppStarred_userId_fkey" FOREIGN KEY ("userId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoAppState" ADD CONSTRAINT "PokettoAppState_appId_fkey" FOREIGN KEY ("appId") REFERENCES "poketto"."PokettoApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."PokettoAppTag" ADD CONSTRAINT "PokettoAppTag_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."EvalApp" ADD CONSTRAINT "EvalApp_user_fkey" FOREIGN KEY ("user") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."EvalApp" ADD CONSTRAINT "EvalApp_modelName_fkey" FOREIGN KEY ("modelName") REFERENCES "eval"."EvalModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."EvalConv" ADD CONSTRAINT "EvalConv_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."EvalLlmResponse" ADD CONSTRAINT "EvalLlmResponse_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "eval"."EvalCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."EvalModel" ADD CONSTRAINT "EvalModel_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "eval"."EvalCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."EvalRequest" ADD CONSTRAINT "EvalRequest_convId_fkey" FOREIGN KEY ("convId") REFERENCES "eval"."EvalConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."EvalResponse" ADD CONSTRAINT "EvalResponse_convId_fkey" FOREIGN KEY ("convId") REFERENCES "eval"."EvalConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."EvalResponse" ADD CONSTRAINT "EvalResponse_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "eval"."EvalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."EvalResponse" ADD CONSTRAINT "EvalResponse_appId_fkey" FOREIGN KEY ("appId") REFERENCES "eval"."EvalApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."EvalTask" ADD CONSTRAINT "EvalTask_convId_fkey" FOREIGN KEY ("convId") REFERENCES "wechat"."WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wechat"."WechatMessage" ADD CONSTRAINT "WechatMessage_talkerId_fkey" FOREIGN KEY ("talkerId") REFERENCES "wechat"."WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wechat"."WechatMessage" ADD CONSTRAINT "WechatMessage_listenerId_fkey" FOREIGN KEY ("listenerId") REFERENCES "wechat"."WechatConv"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wechat"."WechatMessage" ADD CONSTRAINT "WechatMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "wechat"."WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."_PokettoAppToPokettoAppTag" ADD CONSTRAINT "_PokettoAppToPokettoAppTag_A_fkey" FOREIGN KEY ("A") REFERENCES "poketto"."PokettoApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."_PokettoAppToPokettoAppTag" ADD CONSTRAINT "_PokettoAppToPokettoAppTag_B_fkey" FOREIGN KEY ("B") REFERENCES "poketto"."PokettoAppTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."_EvalAppToEvalRequest" ADD CONSTRAINT "_EvalAppToEvalRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "eval"."EvalApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."_EvalAppToEvalRequest" ADD CONSTRAINT "_EvalAppToEvalRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "eval"."EvalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
