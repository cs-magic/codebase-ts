/*
  Warnings:

  - Made the column `title` on table `PApp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PApp" ALTER COLUMN "title" SET NOT NULL;
