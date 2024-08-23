import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';

export async function action({request, params}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.productsReviews);
  }

  // get category
  const review = await prisma.review.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!review) {
    return redirect(EAdminNavigation.productsReviews);
  }

  // update category
  await prisma.category.update({
    where: {id: Number(id)},
    data: {
      deletedAt: new Date()
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.productsReviews}/${id}`);
}
