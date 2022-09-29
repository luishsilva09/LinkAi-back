-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "originalLink" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "acessCount" INTEGER NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);
