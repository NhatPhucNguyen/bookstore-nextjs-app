/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `isbn` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `B` on the `_AuthorToBook` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - You are about to alter the column `A` on the `_BookToSubject` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - Changed the type of `id` on the `Subject` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_BookToSubject` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_AuthorToBook" DROP CONSTRAINT "_AuthorToBook_B_fkey";

-- DropForeignKey
ALTER TABLE "_BookToSubject" DROP CONSTRAINT "_BookToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToSubject" DROP CONSTRAINT "_BookToSubject_B_fkey";

-- DropIndex
DROP INDEX "Book_isbn_key";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ALTER COLUMN "isbn" SET DATA TYPE VARCHAR(13),
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("isbn");

-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_AuthorToBook" ALTER COLUMN "B" SET DATA TYPE VARCHAR(13);

-- AlterTable
ALTER TABLE "_BookToSubject" ALTER COLUMN "A" SET DATA TYPE VARCHAR(13),
DROP COLUMN "B",
ADD COLUMN     "B" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_BookToSubject_AB_unique" ON "_BookToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToSubject_B_index" ON "_BookToSubject"("B");

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "Book"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToSubject" ADD CONSTRAINT "_BookToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToSubject" ADD CONSTRAINT "_BookToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
