/*
  Warnings:

  - Added the required column `description` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;
