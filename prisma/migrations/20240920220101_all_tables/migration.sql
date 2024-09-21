-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('MEMBRESIA', 'PASE_DIARIO');

-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('ACTIVO', 'CANCELADO', 'VENCIDA');

-- CreateEnum
CREATE TYPE "AppUserStatus" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateTable
CREATE TABLE "customer" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(36) NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sureName" TEXT NOT NULL,
    "customerType" "CustomerType" NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(36) NOT NULL,
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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "servicePriceId" INTEGER NOT NULL,
    "accessDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dailypass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_prices" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "ammout" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(36) NOT NULL,
    "id" SERIAL NOT NULL,
    "serviceName" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(36) NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sureName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appUser" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(36) NOT NULL,
    "id" TEXT NOT NULL,
    "accessName" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "accessHash" TEXT NOT NULL,
    "status" "AppUserStatus" NOT NULL DEFAULT 'ACTIVO',


    CONSTRAINT "appUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(36) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" VARCHAR(36) NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permision" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "permision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permision" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER NOT NULL,
    "permisionId" INTEGER NOT NULL,
    "allowed" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "role_permision_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "appUser" ADD CONSTRAINT "appUser_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appUser" ADD CONSTRAINT "appUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permision" ADD CONSTRAINT "role_permision_permisionId_fkey" FOREIGN KEY ("permisionId") REFERENCES "permision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permision" ADD CONSTRAINT "role_permision_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
