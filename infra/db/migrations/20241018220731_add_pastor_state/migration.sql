/*
  Warnings:

  - Added the required column `state` to the `pastors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pastors` ADD COLUMN `state` VARCHAR(2) NOT NULL;
