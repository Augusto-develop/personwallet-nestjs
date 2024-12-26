/*
  Warnings:

  - Made the column `categoriaId` on table `despesas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "despesas" ALTER COLUMN "categoriaId" SET NOT NULL;
