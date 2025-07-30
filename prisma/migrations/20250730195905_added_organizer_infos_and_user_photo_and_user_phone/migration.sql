-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "photo_url" TEXT;

-- CreateTable
CREATE TABLE "OrganizerInfos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizerInfos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrganizerInfos_userId_idx" ON "OrganizerInfos"("userId");

-- AddForeignKey
ALTER TABLE "OrganizerInfos" ADD CONSTRAINT "OrganizerInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
