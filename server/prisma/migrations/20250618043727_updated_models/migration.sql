/*
  Warnings:

  - You are about to drop the column `image` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `kudosType` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Card` table. All the data in the column will be lost.
  - Added the required column `category` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gif` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "image",
DROP COLUMN "kudosType",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "gif" TEXT;

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "image",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "gif" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ALTER COLUMN "voteCount" SET DEFAULT 0;
