-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('MEMBRESIA', 'PASE_DIARIO');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('ACTIVO', 'CANCELADO', 'PENDIENTE');

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sureName" TEXT NOT NULL,
    "customerType" "CustomerType" NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "MembershipStatus" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dailypass" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "accessDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "dailypass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "membership_email_key" ON "membership"("email");

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dailypass" ADD CONSTRAINT "dailypass_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
