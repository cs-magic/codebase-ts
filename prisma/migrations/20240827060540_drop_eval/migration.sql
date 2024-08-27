-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "swot";

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL DEFAULT nanoid(5),
    "title" TEXT NOT NULL,
    "url" TEXT,
    "logo" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "swot"."Card" (
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
CREATE TABLE "swot"."Task" (
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

-- CreateIndex
CREATE UNIQUE INDEX "Response_convId_key" ON "llm"."Response"("convId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_platformType_platformId_key" ON "swot"."Card"("platformType", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "_EvalAppToRequest_AB_unique" ON "llm"."_EvalAppToRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_EvalAppToRequest_B_index" ON "llm"."_EvalAppToRequest"("B");

-- AddForeignKey
ALTER TABLE "llm"."Conv" ADD CONSTRAINT "Conv_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."LlmResponse" ADD CONSTRAINT "LlmResponse_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "swot"."Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "swot"."Task" ADD CONSTRAINT "Task_convId_fkey" FOREIGN KEY ("convId") REFERENCES "wechat"."WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."_EvalAppToRequest" ADD CONSTRAINT "_EvalAppToRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "llm"."EvalApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "llm"."_EvalAppToRequest" ADD CONSTRAINT "_EvalAppToRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "llm"."Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
