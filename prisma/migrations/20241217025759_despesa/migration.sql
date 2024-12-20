/*
  Warnings:

  - You are about to drop the column `vencimento` on the `despesas` table. All the data in the column will be lost.
  - Added the required column `datacompra` to the `despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "despesas" DROP COLUMN "vencimento",
ADD COLUMN     "datacompra" TIMESTAMP(3) NOT NULL;
