/*
  Warnings:

  - You are about to drop the `EvalCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvalCompany` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvalConv` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvalLlmResponse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvalModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvalRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvalResponse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvalTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EvalAppToEvalRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "eval"."EvalApp" DROP CONSTRAINT "EvalApp_modelName_fkey";

-- DropForeignKey
ALTER TABLE "eval"."EvalConv" DROP CONSTRAINT "EvalConv_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "eval"."EvalLlmResponse" DROP CONSTRAINT "EvalLlmResponse_cardId_fkey";

-- DropForeignKey
ALTER TABLE "eval"."EvalModel" DROP CONSTRAINT "EvalModel_companyId_fkey";

-- DropForeignKey
ALTER TABLE "eval"."EvalRequest" DROP CONSTRAINT "EvalRequest_convId_fkey";

-- DropForeignKey
ALTER TABLE "eval"."EvalResponse" DROP CONSTRAINT "EvalResponse_appId_fkey";

-- DropForeignKey
ALTER TABLE "eval"."EvalResponse" DROP CONSTRAINT "EvalResponse_convId_fkey";

-- DropForeignKey
ALTER TABLE "eval"."EvalResponse" DROP CONSTRAINT "EvalResponse_requestId_fkey";

-- DropForeignKey
ALTER TABLE "eval"."EvalTask" DROP CONSTRAINT "EvalTask_convId_fkey";

-- DropForeignKey
ALTER TABLE "eval"."_EvalAppToEvalRequest" DROP CONSTRAINT "_EvalAppToEvalRequest_A_fkey";

-- DropForeignKey
ALTER TABLE "eval"."_EvalAppToEvalRequest" DROP CONSTRAINT "_EvalAppToEvalRequest_B_fkey";

-- DropTable
DROP TABLE "eval"."EvalCard";

-- DropTable
DROP TABLE "eval"."EvalCompany";

-- DropTable
DROP TABLE "eval"."EvalConv";

-- DropTable
DROP TABLE "eval"."EvalLlmResponse";

-- DropTable
DROP TABLE "eval"."EvalModel";

-- DropTable
DROP TABLE "eval"."EvalRequest";

-- DropTable
DROP TABLE "eval"."EvalResponse";

-- DropTable
DROP TABLE "eval"."EvalTask";

-- DropTable
DROP TABLE "eval"."_EvalAppToEvalRequest";

-- CreateTable
CREATE TABLE "eval"."Card" (
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
CREATE TABLE "eval"."Company" (
    "id" TEXT NOT NULL DEFAULT nanoid(5),
    "title" TEXT NOT NULL,
    "url" TEXT,
    "logo" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."Conv" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "currentRequestId" TEXT,

    CONSTRAINT "Conv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."LlmResponse" (
    "id" TEXT NOT NULL DEFAULT nanoid(7),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cardId" TEXT NOT NULL,
    "response" JSONB,
    "ossUrl" TEXT,

    CONSTRAINT "LlmResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."Model" (
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
CREATE TABLE "eval"."Request" (
    "id" TEXT NOT NULL DEFAULT nanoid(9),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "context" JSONB NOT NULL,
    "convId" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eval"."Response" (
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
CREATE TABLE "eval"."Task" (
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
CREATE TABLE "eval"."_EvalAppToRequest" (
    "A" VARCHAR(5) NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_platformType_platformId_key" ON "eval"."Card"("platformType", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "Response_convId_key" ON "eval"."Response"("convId");

-- CreateIndex
CREATE UNIQUE INDEX "_EvalAppToRequest_AB_unique" ON "eval"."_EvalAppToRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_EvalAppToRequest_B_index" ON "eval"."_EvalAppToRequest"("B");

-- AddForeignKey
ALTER TABLE "eval"."EvalApp" ADD CONSTRAINT "EvalApp_modelName_fkey" FOREIGN KEY ("modelName") REFERENCES "eval"."Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."Conv" ADD CONSTRAINT "Conv_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "customer"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."LlmResponse" ADD CONSTRAINT "LlmResponse_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "eval"."Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."Model" ADD CONSTRAINT "Model_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "eval"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."Request" ADD CONSTRAINT "Request_convId_fkey" FOREIGN KEY ("convId") REFERENCES "eval"."Conv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."Response" ADD CONSTRAINT "Response_convId_fkey" FOREIGN KEY ("convId") REFERENCES "eval"."Conv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."Response" ADD CONSTRAINT "Response_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "eval"."Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."Response" ADD CONSTRAINT "Response_appId_fkey" FOREIGN KEY ("appId") REFERENCES "eval"."EvalApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."Task" ADD CONSTRAINT "Task_convId_fkey" FOREIGN KEY ("convId") REFERENCES "wechat"."WechatConv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."_EvalAppToRequest" ADD CONSTRAINT "_EvalAppToRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "eval"."EvalApp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eval"."_EvalAppToRequest" ADD CONSTRAINT "_EvalAppToRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "eval"."Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
