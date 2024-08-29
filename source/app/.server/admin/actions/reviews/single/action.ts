import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {EAdminReviewAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';
import {validationError} from 'remix-validated-form';
import {editReview} from '~/.server/admin/actions/reviews/single/edit-review';
import { deleteReview } from './delete-review';
import { hasAdminRoleOrRedirect } from '~/.server/shared/utils/auth.util';

export async function action({request, params}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request)
  hasAdminRoleOrRedirect(authUser)

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.productsReviews);
  }

  const review = await prisma.review.findFirst({
    where: {id: Number(id)}
  });

  if (!review) {
    return redirect(EAdminNavigation.productsReviews);
  }

  const formData = await request.formData();
  switch (formData.get(FORM_ACTION_FIELD)) {
    case EAdminReviewAction.updateReview:
      return editReview({id: review.id, formData});
    case EAdminReviewAction.deleteReview:
      return deleteReview({id: review.id});
  }

  return validationError({
    fieldErrors: {
      [FORM_ACTION_FIELD]: 'Invalid action'
    }
  });
}
