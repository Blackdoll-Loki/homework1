/*
  Warnings:

  - The values [Uk] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('EN', 'UK');
ALTER TABLE "User" ALTER COLUMN "language" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "language" TYPE "Language_new" USING ("language"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "Language_old";
ALTER TABLE "User" ALTER COLUMN "language" SET DEFAULT 'EN';
COMMIT;
