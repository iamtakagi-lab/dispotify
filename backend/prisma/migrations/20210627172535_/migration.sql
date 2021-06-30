-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "spotifyId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "webhookUrls" TEXT[],

    PRIMARY KEY ("userId")
);
