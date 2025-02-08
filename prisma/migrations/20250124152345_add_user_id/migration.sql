-- AlterTable
ALTER TABLE "carteiras" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "categorias" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "credits" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "despesas" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "fornecedores" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "movimentos" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "receitas" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "carteiras" ADD CONSTRAINT "carteiras_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentos" ADD CONSTRAINT "movimentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fornecedores" ADD CONSTRAINT "fornecedores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
