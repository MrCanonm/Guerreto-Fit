-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('MEMBRESIA', 'PASE_DIARIO');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('ACTIVO', 'CANCELADO', 'VENCIDA');

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
    "servicePriceId" INTEGER NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "dni" TEXT NOT NULL,
    "monthsToPay" INTEGER NOT NULL,
    "totalAmout" DOUBLE PRECISION NOT NULL,
    "status" "MembershipStatus" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dailypass" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "servicePriceId" INTEGER NOT NULL,
    "accessDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dailypass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_prices" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "serviceName" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "membership_customerId_key" ON "membership"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "dailypass_customerId_key" ON "dailypass"("customerId");

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_servicePriceId_fkey" FOREIGN KEY ("servicePriceId") REFERENCES "service_prices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dailypass" ADD CONSTRAINT "dailypass_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dailypass" ADD CONSTRAINT "dailypass_servicePriceId_fkey" FOREIGN KEY ("servicePriceId") REFERENCES "service_prices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_prices" ADD CONSTRAINT "service_prices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
