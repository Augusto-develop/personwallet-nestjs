-- AlterTable
ALTER TABLE "receitas" ADD COLUMN     "categoriaId" TEXT NOT NULL DEFAULT '747518ae-8115-4876-955d-b31936c8b0d0';

-- CreateIndex
CREATE INDEX "receitas_categoriaId_idx" ON "receitas"("categoriaId");

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
