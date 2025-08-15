/*
  Warnings:

  - Added the required column `version` to the `games` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year` on the `games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `games` ADD COLUMN `version` INTEGER NOT NULL,
    DROP COLUMN `year`,
    ADD COLUMN `year` INTEGER NOT NULL;
