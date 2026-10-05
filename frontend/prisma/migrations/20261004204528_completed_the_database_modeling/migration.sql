/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 10;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "audio_project" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "text" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "s3key" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "voiceS3Key" TEXT NOT NULL,
    "exaggeration" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "cfgWeight" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "userId" TEXT NOT NULL,
    "createsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audio_project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploaded_voices" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "s3key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uploaded_voices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "audio_project" ADD CONSTRAINT "audio_project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uploaded_voices" ADD CONSTRAINT "uploaded_voices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
