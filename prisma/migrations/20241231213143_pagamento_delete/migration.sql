/*
  Warnings:

  - You are about to drop the `pagamentos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_carteiraId_fkey";

-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_creditId_fkey";

-- AlterTable
ALTER TABLE "movimentos" ADD COLUMN     "anofat" VARCHAR(4),
ADD COLUMN     "creditId" TEXT,
ADD COLUMN     "mesfat" VARCHAR(2);

-- DropTable
DROP TABLE "pagamentos";

-- AddForeignKey
ALTER TABLE "movimentos" ADD CONSTRAINT "movimentos_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "credits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
