-- CreateTable
CREATE TABLE "_CreditDespesas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CreditDespesas_AB_unique" ON "_CreditDespesas"("A", "B");

-- CreateIndex
CREATE INDEX "_CreditDespesas_B_index" ON "_CreditDespesas"("B");

-- AddForeignKey
ALTER TABLE "_CreditDespesas" ADD CONSTRAINT "_CreditDespesas_A_fkey" FOREIGN KEY ("A") REFERENCES "credits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreditDespesas" ADD CONSTRAINT "_CreditDespesas_B_fkey" FOREIGN KEY ("B") REFERENCES "despesas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
