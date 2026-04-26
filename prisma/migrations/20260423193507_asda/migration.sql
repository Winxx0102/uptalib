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
    "wasSettled" BOOLEAN DEFAULT false,
    "personNames" TEXT NOT NULL,
    "personSurNames" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BookOperation_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "PhysicalBook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BookOperation" ("bookId", "createdAt", "id", "observations", "personId", "personNames", "personSurNames", "quantity", "type", "updatedAt", "wasSettled") SELECT "bookId", "createdAt", "id", "observations", "personId", "personNames", "personSurNames", "quantity", "type", "updatedAt", "wasSettled" FROM "BookOperation";
DROP TABLE "BookOperation";
ALTER TABLE "new_BookOperation" RENAME TO "BookOperation";
CREATE INDEX "BookOperation_bookId_createdAt_idx" ON "BookOperation"("bookId", "createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
