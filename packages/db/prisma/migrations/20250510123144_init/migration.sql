-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "age" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
