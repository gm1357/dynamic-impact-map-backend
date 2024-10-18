-- CreateTable
CREATE TABLE `pastors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `engagements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pastorId` INTEGER NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `engagements` ADD CONSTRAINT `engagements_pastorId_fkey` FOREIGN KEY (`pastorId`) REFERENCES `pastors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
