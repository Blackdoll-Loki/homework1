import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {productMapper} from '~/.server/admin/mappers/product.mapper';
import {SerializeFrom} from '@remix-run/server-runtime';
import {categoryMapper} from '~/.server/admin/mappers/category.mapper';
import { reviewMapper } from '~/.server/admin/mappers/review.mapper';

export async function loader({request, params}: LoaderFunctionArgs) {
  await getAuthUser(request)

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.products);
  }

  // get user
  const product = await prisma.product.findFirst({
    include: {
      category: true,
    },
    where: {id: Number(id)}
  });

  // if not exist
  if (!product) {
    return redirect(EAdminNavigation.products);
  }

  const categories = await prisma.category.findMany({
    where: {
      deletedAt: null,
    }
  });

  // const reviews = await prisma.review.findMany({
  //   where: {
  //     productId: Number(id),
  //   }
  // });


  return json({product: productMapper(product), categories: categories.map(categoryMapper), /*reviews: reviews.map(reviewMapper)*/});
}

export type TAdminProductsSingleLoader = typeof loader;
export type TAdminProductsSingleLoaderData = SerializeFrom<typeof loader>;
