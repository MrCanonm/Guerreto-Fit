/*
  Warnings:

  - You are about to drop the column `fecha` on the `service_prices` table. All the data in the column will be lost.
  - You are about to drop the column `monto` on the `service_prices` table. All the data in the column will be lost.
  - Added the required column `ammout` to the `service_prices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `service_prices` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppUserStatus" AS ENUM ('ACTIVO', 'INACTIVO');

-- AlterTable
ALTER TABLE "appUser" ADD COLUMN     "status" "AppUserStatus" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "service_prices" DROP COLUMN "fecha",
DROP COLUMN "monto",
ADD COLUMN     "ammout" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
