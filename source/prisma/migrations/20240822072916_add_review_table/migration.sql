-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReviewCustomerIdIndex" ON "Review"("customerId");

-- CreateIndex
CREATE INDEX "ReviewProductIdIndex" ON "Review"("productId");

-- CreateIndex
CREATE INDEX "ReviewCreatedAtIndex" ON "Review"("createdAt");

-- CreateIndex
CREATE INDEX "ReviewUpdatedAtIndex" ON "Review"("updatedAt");

-- CreateIndex
CREATE INDEX "ReviewDeletedAtIndex" ON "Review"("deletedAt");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
