/*
  Warnings:

  - You are about to drop the column `faturaId` on the `despesas` table. All the data in the column will be lost.
  - You are about to drop the column `faturaId` on the `pagamentos` table. All the data in the column will be lost.
  - Added the required column `creditId` to the `despesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditId` to the `pagamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_faturaId_fkey";

-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_faturaId_fkey";

-- DropIndex
DROP INDEX "despesas_faturaId_idx";

-- DropIndex
DROP INDEX "pagamentos_faturaId_idx";

-- AlterTable
ALTER TABLE "despesas" DROP COLUMN "faturaId",
ADD COLUMN     "creditId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pagamentos" DROP COLUMN "faturaId",
ADD COLUMN     "creditId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "despesas_creditId_idx" ON "despesas"("creditId");

-- CreateIndex
CREATE INDEX "pagamentos_creditId_idx" ON "pagamentos"("creditId");

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "credits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "credits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
