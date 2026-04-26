/*
  Warnings:

  - You are about to drop the `Loan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInventory` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `routeimg` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Item` table. All the data in the column will be lost.
  - Added the required column `availableStock` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalStock` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Loan";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserInventory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ItemOperation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "observations" TEXT,
    "personId" TEXT,
    "wasSettled" BOOLEAN DEFAULT false,
    "personNames" TEXT NOT NULL,
    "personSurNames" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ItemOperation_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "totalStock" INTEGER NOT NULL,
    "availableStock" INTEGER NOT NULL,
    "typeId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Item_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ItemType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("description", "id", "name") SELECT "description", "id", "name" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "ItemOperation_itemId_createdAt_idx" ON "ItemOperation"("itemId", "createdAt");
