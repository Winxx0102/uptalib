-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PhysicalBook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isbn" TEXT,
    "title" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "pnf" TEXT,
    "yearOfPublication" INTEGER NOT NULL,
    "editorial" TEXT,
    "totalStock" INTEGER NOT NULL,
    "availableStock" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DISPONIBLE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PhysicalBook_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PhysicalBook_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PhysicalBook" ("authorId", "availableStock", "categoryId", "createdAt", "editorial", "id", "isbn", "pnf", "status", "title", "totalStock", "updatedAt", "yearOfPublication") SELECT "authorId", "availableStock", "categoryId", "createdAt", "editorial", "id", "isbn", "pnf", "status", "title", "totalStock", "updatedAt", "yearOfPublication" FROM "PhysicalBook";
DROP TABLE "PhysicalBook";
ALTER TABLE "new_PhysicalBook" RENAME TO "PhysicalBook";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
