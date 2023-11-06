/*
  Warnings:

  - Made the column `s3link` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "s3link" SET NOT NULL;
