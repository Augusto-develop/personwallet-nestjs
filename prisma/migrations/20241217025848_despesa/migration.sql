/*
  Warnings:

  - You are about to drop the column `datacompra` on the `despesas` table. All the data in the column will be lost.
  - Added the required column `lancamento` to the `despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "despesas" DROP COLUMN "datacompra",
ADD COLUMN     "lancamento" TIMESTAMP(3) NOT NULL;
