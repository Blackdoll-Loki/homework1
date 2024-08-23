import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {EAdminReviewAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';
import {validationError} from 'remix-validated-form';
import {editCategory} from '~/.server/admin/actions/products/single/edit-category';
import { deleteReview } from './delete-review';

export async function action({request, params}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.productsReviews);
  }

  // get product
  const review = await prisma.review.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!review) {
    return redirect(EAdminNavigation.productsReviews);
  }

  const formData = await request.formData();
  switch (formData.get(FORM_ACTION_FIELD)) {
    case EAdminReviewAction.updateReview:
      return editCategory({id: review.id, formData});
    case EAdminReviewAction.deleteReview:
      return deleteReview({id: review.id});
  }

  return validationError({
    fieldErrors: {
      [FORM_ACTION_FIELD]: 'Invalid action'
    }
  });
}
