import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {SerializeFrom} from '@remix-run/server-runtime';
import { reviewMapper } from '~/.server/admin/mappers/review.mapper';

export async function loader({request, params}: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.productsReviews);
  }

  // get user
  const review = await prisma.review.findFirst({
    where: {id: Number(id)},
    include: {
      customer: true,
      product: true,
    }
  });

  // if not exist
  if (!review) {
    return redirect(EAdminNavigation.productsReviews);
  }

  const mappedReview = reviewMapper(review);

  return json({review: mappedReview});
}

export type TAdminReviewsSingleLoader = typeof loader;
export type TAdminReviewsSingleLoaderData = SerializeFrom<typeof loader>;
