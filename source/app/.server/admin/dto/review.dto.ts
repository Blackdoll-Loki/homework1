import type { Review, Customer, Product } from '@prisma/client';
import { TCustomerDto } from './customer.dto';
import { TProductDto } from './product.dto';

type ExcludedField = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
export type TReviewDto = Omit<Review, ExcludedField> & {
  id: string;
  review: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  customer: TCustomerDto;
  product: TProductDto;
}
