/*
  Warnings:

  - You are about to drop the column `valor` on the `credits` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "credits" DROP COLUMN "valor",
ADD COLUMN     "valorcredito" DECIMAL(9,2),
ADD COLUMN     "valorparcela" DECIMAL(9,2);
