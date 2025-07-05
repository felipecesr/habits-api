/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_userId_key" ON "Contact"("id", "userId");
