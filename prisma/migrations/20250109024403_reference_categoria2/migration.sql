-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
