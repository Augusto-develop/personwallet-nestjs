/*
  Warnings:

  - You are about to drop the `faturas` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeCredit" AS ENUM ('CARTAO', 'EMPRESTIMO', 'FINANCIAMENTO', 'DESPESAFIXA');

-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_faturaId_fkey";

-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_faturaId_fkey";

-- DropTable
DROP TABLE "faturas";

-- CreateTable
CREATE TABLE "credits" (
    "id" TEXT NOT NULL,
    "descricao" VARCHAR(30) NOT NULL,
    "type" "TypeCredit" NOT NULL DEFAULT 'CARTAO',
    "diavenc" VARCHAR(2) NOT NULL,
    "diafech" VARCHAR(2) NOT NULL,
    "limite" DECIMAL(9,2) NOT NULL,
    "emissor" VARCHAR(15) NOT NULL,
    "bandeira" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_faturaId_fkey" FOREIGN KEY ("faturaId") REFERENCES "credits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_faturaId_fkey" FOREIGN KEY ("faturaId") REFERENCES "credits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
