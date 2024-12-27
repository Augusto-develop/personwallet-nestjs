/*
  Warnings:

  - Added the required column `emissor` to the `carteiras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carteiras" ADD COLUMN     "emissor" "Emissor" NOT NULL;
