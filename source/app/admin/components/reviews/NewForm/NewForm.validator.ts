import {withZod} from '@rvf/zod';
import {z} from 'zod';

export const productRule = z.string().trim().min(1, {message: 'Product title is required'});
export const reviewRule = z.string().trim().max(1024, {message: 'Description is required'})
export const ratingRule = z.string().trim().min(1, {message: 'Rating is required'})
export const firstNameRule = z.string().trim().min(1, {message: 'Customer first name is required'});
export const lastNameRule = z.string().trim().min(1, {message: 'Customer last name is required'});
export const newFormValidator = withZod(
  z.object({
    product: productRule,
    firstName: firstNameRule,
    lastName: lastNameRule,
    rating: ratingRule,
    review: reviewRule,
  })
);
