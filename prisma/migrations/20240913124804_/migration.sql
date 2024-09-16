/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,type,what,remainingTime]` on the table `BuildJob` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BuildJob_ownerId_type_what_remainingTime_key" ON "BuildJob"("ownerId", "type", "what", "remainingTime");
