-- AlterTable
ALTER TABLE "credits" ADD COLUMN     "categoriaId" TEXT;

-- CreateIndex
CREATE INDEX "credits_categoriaId_idx" ON "credits"("categoriaId");
