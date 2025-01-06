-- AlterTable
ALTER TABLE "movimentos" ALTER COLUMN "cartcredito" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "movimentos_creditId_idx" ON "movimentos"("creditId");
