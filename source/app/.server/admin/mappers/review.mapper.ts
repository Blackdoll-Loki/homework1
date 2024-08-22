import { Review } from '@prisma/client';
import { TReviewDto } from '~/.server/admin/dto/review.dto';

export const reviewMapper = (review: Review): TReviewDto => {
  return {
    id: String(review.id),
    customerId: String(review.customerId),
    productId: String(review.productId),
    review: review.review,
    rating: review.rating,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
    deletedAt: review.deletedAt ? review.deletedAt.toISOString() : null,
  };
};
