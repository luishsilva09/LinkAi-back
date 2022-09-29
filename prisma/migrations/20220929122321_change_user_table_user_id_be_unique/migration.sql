/*
  Warnings:

  - A unique constraint covering the columns `[urlId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_urlId_key" ON "users"("urlId");
