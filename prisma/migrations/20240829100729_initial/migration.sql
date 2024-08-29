-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('Aluminium', 'Steel', 'Plutonium');

-- CreateEnum
CREATE TYPE "ShipType" AS ENUM ('Piranha', 'Jellyfish', 'Shark', 'HackBoat', 'Taifun', 'Blizzard', 'Hurricane', 'Tsunami', 'Enterprise', 'Bermuda', 'KittyHawk', 'Atlantis');

-- CreateEnum
CREATE TYPE "FightType" AS ENUM ('Normal', 'Emp', 'FirstStrike');

-- CreateEnum
CREATE TYPE "BuildOrderType" AS ENUM ('Ship', 'Harvester');

-- CreateEnum
CREATE TYPE "FleetActionType" AS ENUM ('Attack', 'Defend');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "resourcesId" TEXT NOT NULL,
    "coordinatesId" TEXT NOT NULL,
    "harvesters" INTEGER NOT NULL DEFAULT 10,
    "distribution" INTEGER[] DEFAULT ARRAY[50, 30]::INTEGER[],

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fleet" (
    "id" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "targetId" INTEGER,
    "baseFleet" BOOLEAN NOT NULL DEFAULT false,
    "resourcesId" TEXT NOT NULL,
    "travelTime" INTEGER,
    "remainingTime" INTEGER,
    "action" "FleetActionType",
    "actionTime" INTEGER,
    "returning" BOOLEAN,

    CONSTRAINT "Fleet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipGroup" (
    "id" TEXT NOT NULL,
    "fleetId" TEXT NOT NULL,
    "type" "ShipType" NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "ShipGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "aluminium" INTEGER NOT NULL DEFAULT 0,
    "steel" INTEGER NOT NULL DEFAULT 0,
    "plutonium" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceNode" (
    "id" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "coordinatesId" TEXT NOT NULL,

    CONSTRAINT "ResourceNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinate" (
    "id" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "Coordinate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildOrder" (
    "id" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "type" "BuildOrderType" NOT NULL,
    "what" "ShipType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "remainingTime" INTEGER NOT NULL,

    CONSTRAINT "BuildOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_key" ON "Station"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Station_ownerId_key" ON "Station"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Station_resourcesId_key" ON "Station"("resourcesId");

-- CreateIndex
CREATE UNIQUE INDEX "Station_coordinatesId_key" ON "Station"("coordinatesId");

-- CreateIndex
CREATE UNIQUE INDEX "Fleet_resourcesId_key" ON "Fleet"("resourcesId");

-- CreateIndex
CREATE UNIQUE INDEX "ShipGroup_fleetId_type_key" ON "ShipGroup"("fleetId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceNode_coordinatesId_key" ON "ResourceNode"("coordinatesId");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinate_x_y_key" ON "Coordinate"("x", "y");

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_resourcesId_fkey" FOREIGN KEY ("resourcesId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "Coordinate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fleet" ADD CONSTRAINT "Fleet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fleet" ADD CONSTRAINT "Fleet_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fleet" ADD CONSTRAINT "Fleet_resourcesId_fkey" FOREIGN KEY ("resourcesId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipGroup" ADD CONSTRAINT "ShipGroup_fleetId_fkey" FOREIGN KEY ("fleetId") REFERENCES "Fleet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceNode" ADD CONSTRAINT "ResourceNode_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "Coordinate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildOrder" ADD CONSTRAINT "BuildOrder_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
