/*
  Warnings:

  - Made the column `userId` on table `carteiras` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `categorias` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `credits` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `despesas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `fornecedores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `movimentos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `receitas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "carteiras" DROP CONSTRAINT "carteiras_userId_fkey";

-- DropForeignKey
ALTER TABLE "categorias" DROP CONSTRAINT "categorias_userId_fkey";

-- DropForeignKey
ALTER TABLE "credits" DROP CONSTRAINT "credits_userId_fkey";

-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_userId_fkey";

-- DropForeignKey
ALTER TABLE "fornecedores" DROP CONSTRAINT "fornecedores_userId_fkey";

-- DropForeignKey
ALTER TABLE "movimentos" DROP CONSTRAINT "movimentos_userId_fkey";

-- DropForeignKey
ALTER TABLE "receitas" DROP CONSTRAINT "receitas_userId_fkey";

-- AlterTable
ALTER TABLE "carteiras" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "categorias" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "credits" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "despesas" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "fornecedores" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "movimentos" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "receitas" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "carteiras" ADD CONSTRAINT "carteiras_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentos" ADD CONSTRAINT "movimentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fornecedores" ADD CONSTRAINT "fornecedores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
