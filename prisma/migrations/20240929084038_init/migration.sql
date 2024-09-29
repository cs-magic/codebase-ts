-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "assistant";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "customer";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "llm";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "payment";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "poketto";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "swot";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "wechat";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateEnum
CREATE TYPE "public"."PlatformType" AS ENUM ('Poketto', 'FlowGPT', 'OpenAI', 'MidJourney', 'StableDiffusion', 'OpenChat', 'sms', 'email', 'github', 'discord', 'google', 'wxmpArticle', 'bilibiliVideo', 'xhsNote');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('pending', 'running', 'paused', 'done', 'discarded');

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

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL DEFAULT nanoid(5),
    "title" TEXT NOT NULL,
    "url" TEXT,
    "logo" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

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
    "phone" TEXT,
    "phoneVerified" TIMESTAMP(3),
    "wxid" TEXT,
    "wxidVerified" TIMESTAMP(3),
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
CREATE TABLE "llm"."Conv" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "currentRequestId" TEXT,

    CONSTRAINT "Conv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "llm"."LlmResponse" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cardId" TEXT NOT NULL,
    "response" JSONB,
    "ossUrl" TEXT,

    CONSTRAINT "LlmResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "llm"."Model" (
    "id" TEXT NOT NULL DEFAULT nanoid(5),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "logo" TEXT,
    "url" TEXT,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "llm"."Request" (
    "id" TEXT NOT NULL DEFAULT nanoid(9),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "context" JSONB NOT NULL,
    "convId" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "llm"."Response" (
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

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "llm"."EvalApp" (
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
CREATE TABLE "assistant"."Card" (
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

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assistant"."Task" (
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

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "llm"."_EvalAppToRequest" (
    "A" VARCHAR(5) NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "poketto"."_PokettoAppToPokettoAppTag" (
    "A" VARCHAR(7) NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "customer"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "customer"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_wxid_key" ON "customer"."User"("wxid");

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
CREATE UNIQUE INDEX "Response_convId_key" ON "llm"."Response"("convId");

-- CreateIndex
CREATE UNIQUE INDEX "PokettoApp_platformType_platformId_key" ON "poketto"."PokettoApp"("platformType", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "PokettoAppCategory_main_sub_key" ON "poketto"."PokettoAppCategory"("main", "sub");

-- CreateIndex
CREATE UNIQUE INDEX "PokettoAppState_appId_key" ON "poketto"."PokettoAppState"("appId");

-- CreateIndex
CREATE UNIQUE INDEX "PokettoAppTag_name_key" ON "poketto"."PokettoAppTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Card_platformType_platformId_key" ON "assistant"."Card"("platformType", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "_EvalAppToRequest_AB_unique" ON "llm"."_EvalAppToRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_EvalAppToRequest_B_index" ON "llm"."_EvalAppToRequest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PokettoAppToPokettoAppTag_AB_unique" ON "poketto"."_PokettoAppToPokettoAppTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PokettoAppToPokettoAppTag_B_index" ON "poketto"."_PokettoAppToPokettoAppTag"("B");

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
ALTER TABLE "llm"."Conv" ADD CONSTRAINT "Conv_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."LlmResponse" ADD CONSTRAINT "LlmResponse_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "assistant"."Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."Model" ADD CONSTRAINT "Model_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."Request" ADD CONSTRAINT "Request_convId_fkey" FOREIGN KEY ("convId") REFERENCES "llm"."Conv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."Response" ADD CONSTRAINT "Response_convId_fkey" FOREIGN KEY ("convId") REFERENCES "llm"."Conv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."Response" ADD CONSTRAINT "Response_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "llm"."Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."Response" ADD CONSTRAINT "Response_appId_fkey" FOREIGN KEY ("appId") REFERENCES "llm"."EvalApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."EvalApp" ADD CONSTRAINT "EvalApp_user_fkey" FOREIGN KEY ("user") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."EvalApp" ADD CONSTRAINT "EvalApp_modelName_fkey" FOREIGN KEY ("modelName") REFERENCES "llm"."Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "wechat"."WechatMessage" ADD CONSTRAINT "WechatMessage_talkerId_fkey" FOREIGN KEY ("talkerId") REFERENCES "wechat"."WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wechat"."WechatMessage" ADD CONSTRAINT "WechatMessage_listenerId_fkey" FOREIGN KEY ("listenerId") REFERENCES "wechat"."WechatConv"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wechat"."WechatMessage" ADD CONSTRAINT "WechatMessage_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "wechat"."WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistant"."Task" ADD CONSTRAINT "Task_convId_fkey" FOREIGN KEY ("convId") REFERENCES "wechat"."WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."_EvalAppToRequest" ADD CONSTRAINT "_EvalAppToRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "llm"."EvalApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."_EvalAppToRequest" ADD CONSTRAINT "_EvalAppToRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "llm"."Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."_PokettoAppToPokettoAppTag" ADD CONSTRAINT "_PokettoAppToPokettoAppTag_A_fkey" FOREIGN KEY ("A") REFERENCES "poketto"."PokettoApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poketto"."_PokettoAppToPokettoAppTag" ADD CONSTRAINT "_PokettoAppToPokettoAppTag_B_fkey" FOREIGN KEY ("B") REFERENCES "poketto"."PokettoAppTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
