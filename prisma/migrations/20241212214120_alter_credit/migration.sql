/*
  Warnings:

  - You are about to drop the column `limite` on the `credits` table. All the data in the column will be lost.
  - The `bandeira` column on the `credits` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `valor` to the `credits` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Bandeira" AS ENUM ('VISA', 'MASTERCARD');

-- AlterTable
ALTER TABLE "credits" DROP COLUMN "limite",
ADD COLUMN     "valor" DECIMAL(9,2) NOT NULL,
ALTER COLUMN "diafech" DROP NOT NULL,
ALTER COLUMN "emissor" DROP NOT NULL,
DROP COLUMN "bandeira",
ADD COLUMN     "bandeira" "Bandeira";
