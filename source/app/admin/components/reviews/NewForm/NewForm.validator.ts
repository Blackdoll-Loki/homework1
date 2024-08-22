import {withZod} from '@rvf/zod';
import {z} from 'zod';

export const productRule = z.string().trim().min(1, {message: 'Product title is required'});
export const descriptionRule = z.string().trim().max(1024, {message: 'Review is required'})
export const ratingRule = z.string().trim().min(1, {message: 'Rating is required'})
export const customerRule = z.string().trim().min(1, {message: 'Customer fullname is required'});
export const newFormValidator = withZod(
  z.object({
    customer: customerRule,
    rating:ratingRule,
    product: productRule,
    description: descriptionRule,
  })
);
