-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "isCompleted" DROP NOT NULL,
ALTER COLUMN "isCompleted" SET DEFAULT false;
