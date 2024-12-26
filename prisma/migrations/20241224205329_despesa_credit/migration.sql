/*
  Warnings:

  - You are about to drop the `_CreditDespesas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CreditDespesas" DROP CONSTRAINT "_CreditDespesas_A_fkey";

-- DropForeignKey
ALTER TABLE "_CreditDespesas" DROP CONSTRAINT "_CreditDespesas_B_fkey";

-- DropTable
DROP TABLE "_CreditDespesas";
