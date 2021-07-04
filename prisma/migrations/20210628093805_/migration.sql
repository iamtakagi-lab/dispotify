/*
  Warnings:

  - Added the required column `messageFormat` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "messageFormat" TEXT NOT NULL;
