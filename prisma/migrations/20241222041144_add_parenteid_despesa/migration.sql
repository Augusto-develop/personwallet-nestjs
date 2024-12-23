-- AlterTable
ALTER TABLE "despesas" ADD COLUMN     "parentId" TEXT;

-- CreateIndex
CREATE INDEX "despesas_parentId_idx" ON "despesas"("parentId");

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "despesas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
