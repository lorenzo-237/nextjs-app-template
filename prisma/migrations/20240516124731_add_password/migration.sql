-- CreateTable
CREATE TABLE "users_passwords" (
    "id" SERIAL NOT NULL,
    "passwordHash" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "users_passwords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_passwords" ADD CONSTRAINT "users_passwords_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
