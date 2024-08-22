import { Review } from '@prisma/client';
import { TReviewDto } from '~/.server/admin/dto/review.dto';
import { customerMapper } from '~/.server/admin/mappers/customer.mapper';
import { productMapper } from '~/.server/admin/mappers/product.mapper';

export const reviewMapper = (review: Review & { customer: any, product: any }): TReviewDto => {
  return {
    id: String(review.id),
    review: review.review,
    rating: review.rating,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
    deletedAt: review.deletedAt ? review.deletedAt.toISOString() : null,
    customer: customerMapper(review.customer),
    product: productMapper(review.product),
  };
};
