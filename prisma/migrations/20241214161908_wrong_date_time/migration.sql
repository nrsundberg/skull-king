/*
  Warnings:

  - You are about to drop the column `ended` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `started` on the `player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "game" ALTER COLUMN "ended" DROP NOT NULL;

-- AlterTable
ALTER TABLE "player" DROP COLUMN "ended",
DROP COLUMN "started";

-- AlterTable
ALTER TABLE "round" ALTER COLUMN "ended" DROP NOT NULL;
