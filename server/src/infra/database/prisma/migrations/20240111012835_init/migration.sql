-- CreateTable
CREATE TABLE "blog.users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" VARCHAR(6) NOT NULL,

    CONSTRAINT "blog.users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog.posts" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "owner_id" INTEGER,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog.posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog.users_email_key" ON "blog.users"("email");

-- AddForeignKey
ALTER TABLE "blog.posts" ADD CONSTRAINT "blog.posts_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "blog.users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
