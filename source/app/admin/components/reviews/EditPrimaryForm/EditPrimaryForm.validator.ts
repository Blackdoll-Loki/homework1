import {withZod} from '@rvf/zod';
import {z} from 'zod';
import { EAdminReviewAction, FORM_ACTION_FIELD } from '~/admin/constants/action.constant';
import { firstNameRule, lastNameRule, productRule, ratingRule, reviewRule } from '~/admin/components/reviews/NewForm/NewForm.validator';

export const editPrimaryFormValidator = withZod(
  z.object({
    title: productRule,
    firstName: firstNameRule,
    lastName: lastNameRule,
    rating: ratingRule,
    review: reviewRule,
    [FORM_ACTION_FIELD]: z.literal(EAdminReviewAction.updateReview),
  })
);
