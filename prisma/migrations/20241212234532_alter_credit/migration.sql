/*
  Warnings:

  - The `emissor` column on the `credits` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Emissor" AS ENUM ('ITAU', 'BRADESCO', 'BANCOBRASIL', 'SANTANDER', 'CAIXA', 'NUBANK', 'MERCADOPAGO', 'ATACADAO', 'NOVUCARD', 'OUZE', 'RIACHUELO', 'BRASILCARD', 'NEON');

-- AlterTable
ALTER TABLE "credits" DROP COLUMN "emissor",
ADD COLUMN     "emissor" "Emissor";
