/*
  Warnings:

  - You are about to drop the column `userId` on the `BookOperation` table. All the data in the column will be lost.
  - Added the required column `personNames` to the `BookOperation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personSurNames` to the `BookOperation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BookOperation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "observations" TEXT,
    "personId" TEXT,
    "personNames" TEXT NOT NULL,
    "personSurNames" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BookOperation_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "PhysicalBook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BookOperation" ("bookId", "createdAt", "id", "observations", "quantity", "type", "updatedAt") SELECT "bookId", "createdAt", "id", "observations", "quantity", "type", "updatedAt" FROM "BookOperation";
DROP TABLE "BookOperation";
ALTER TABLE "new_BookOperation" RENAME TO "BookOperation";
CREATE INDEX "BookOperation_bookId_createdAt_idx" ON "BookOperation"("bookId", "createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
