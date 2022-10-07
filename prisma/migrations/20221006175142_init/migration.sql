-- CreateTable
CREATE TABLE "TweetPosts" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "TweetPosts_pkey" PRIMARY KEY ("id")
);
