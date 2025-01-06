/*
  Warnings:

  - You are about to drop the column `fixa` on the `despesas` table. All the data in the column will be lost.
  - You are about to drop the column `despesaId` on the `pagamentos` table. All the data in the column will be lost.
  - You are about to drop the column `fixa` on the `receitas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_despesaId_fkey";

-- DropIndex
DROP INDEX "pagamentos_despesaId_idx";

-- AlterTable
ALTER TABLE "despesas" DROP COLUMN "fixa";

-- AlterTable
ALTER TABLE "pagamentos" DROP COLUMN "despesaId";

-- AlterTable
ALTER TABLE "receitas" DROP COLUMN "fixa";
