/*
  Warnings:

  - You are about to drop the column `qtdeparcela` on the `credits` table. All the data in the column will be lost.
  - You are about to drop the column `valorparcela` on the `credits` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "credits" DROP COLUMN "qtdeparcela",
DROP COLUMN "valorparcela";
