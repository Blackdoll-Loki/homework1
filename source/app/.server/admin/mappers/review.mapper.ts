import { Review, Customer } from '@prisma/client';
import { TReviewDto } from '~/.server/admin/dto/review.dto';
import { productMapper } from '~/.server/admin/mappers/product.mapper';
import { customerMapper } from './customer.mapper';

// export type TCustomerDto = Pick<Customer, 'id' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
//   id: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
// };

// export const customerMapper = (customer: Customer): TCustomerDto => {
//   return {
//     id: String(customer.id),
//     firstName: customer.firstName,
//     lastName: customer.lastName,
//     createdAt: customer.createdAt.toJSON(),
//     updatedAt: customer.updatedAt.toJSON(),
//     deletedAt: customer.deletedAt ? customer.deletedAt.toJSON() : null,
//   };
// };



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
