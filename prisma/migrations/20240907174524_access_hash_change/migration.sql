/*
  Warnings:

  - You are about to drop the column `acccesHash` on the `appUser` table. All the data in the column will be lost.
  - Added the required column `accessHash` to the `appUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appUser" DROP COLUMN "acccesHash",
ADD COLUMN     "accessHash" TEXT NOT NULL;
