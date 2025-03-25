/*
  Warnings:

  - A unique constraint covering the columns `[sellerProfileId]` on the table `BankAccountDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellerProfileId` to the `BankAccountDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "SellerProfile" DROP CONSTRAINT "SellerProfile_bankAccountId_fkey";

-- AlterTable
ALTER TABLE "BankAccountDetails" ADD COLUMN     "sellerProfileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BankAccountDetails_sellerProfileId_key" ON "BankAccountDetails"("sellerProfileId");

-- AddForeignKey
ALTER TABLE "BankAccountDetails" ADD CONSTRAINT "BankAccountDetails_sellerProfileId_fkey" FOREIGN KEY ("sellerProfileId") REFERENCES "SellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "SellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
