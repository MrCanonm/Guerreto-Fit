/*
  Warnings:

  - You are about to drop the `permision` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_permision` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "role_permision" DROP CONSTRAINT "role_permision_permisionId_fkey";

-- DropForeignKey
ALTER TABLE "role_permision" DROP CONSTRAINT "role_permision_roleId_fkey";

-- DropTable
DROP TABLE "permision";

-- DropTable
DROP TABLE "role_permision";

-- CreateTable
CREATE TABLE "role_permission" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "permisionId" INTEGER NOT NULL,
    "allowed" BOOLEAN NOT NULL,

    CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permisionId_fkey" FOREIGN KEY ("permisionId") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
