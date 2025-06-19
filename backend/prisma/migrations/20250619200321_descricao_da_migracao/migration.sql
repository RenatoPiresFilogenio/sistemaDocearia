/*
  Warnings:

  - The primary key for the `ProductIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[productId,ingredientId]` on the table `ProductIngredient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductIngredient" DROP CONSTRAINT "ProductIngredient_pkey",
ADD COLUMN     "pk_id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductIngredient_pkey" PRIMARY KEY ("pk_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductIngredient_productId_ingredientId_key" ON "ProductIngredient"("productId", "ingredientId");
