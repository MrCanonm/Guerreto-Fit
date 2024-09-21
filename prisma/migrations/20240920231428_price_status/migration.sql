/*
  Warnings:

  - You are about to drop the column `description` on the `role_permision` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PricesStatus" AS ENUM ('ACTUAL', 'ANTERIOR');

-- AlterTable
ALTER TABLE "role_permision" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "service_prices" ADD COLUMN     "status" "PricesStatus" NOT NULL DEFAULT 'ACTUAL';
