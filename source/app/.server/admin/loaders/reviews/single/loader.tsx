import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {SerializeFrom} from '@remix-run/server-runtime';
import { reviewMapper } from '~/.server/admin/mappers/review.mapper';
import { hasAdminRoleOrRedirect } from '~/.server/shared/utils/auth.util';

export async function loader({request, params}: LoaderFunctionArgs) {
  const authUser = await getAuthUser(request)
  hasAdminRoleOrRedirect(authUser)

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
