/*
  Warnings:

  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `remember_token` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "remember_token" SET DATA TYPE VARCHAR(255);
