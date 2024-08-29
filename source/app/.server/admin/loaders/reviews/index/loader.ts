import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import {Prisma} from '@prisma/client';
import type {SerializeFrom} from '@remix-run/server-runtime';
import { reviewMapper } from '~/.server/admin/mappers/review.mapper'
import {
  hasNextCalculate,
  makeQuery,
  queryToPagination,
  queryToSearch,
  queryToSort,
  requestToSearchParams,
  sortValueToField
} from '~/.server/admin/utils/query.util';
import {containsInsensitive} from '~/.server/shared/utils/prisma.util';
import {ECategoriesSortVariant} from '~/admin/components/categories/Index/Filters';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { getAuthUser } from '~/.server/admin/services/auth.service';

type CategoryOrderByWithRelationInput = Prisma.CategoryOrderByWithRelationInput;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({request}: LoaderFunctionArgs) {
  await getAuthUser(request)

  const searchParams = requestToSearchParams(request);
  const search = await queryToSearch(searchParams);
  const pagination = await queryToPagination(searchParams);
  const sort = await queryToSort(searchParams, ECategoriesSortVariant, ECategoriesSortVariant.createdAt_desc);
  const orderBy = sortValueToField<CategoryOrderByWithRelationInput>(sort);

  let searchQuery;

  if (search) {
    searchQuery = {
      OR: [
        {title: containsInsensitive(search)},
        {slug: containsInsensitive(search)},
      ]
    };
  }



  const reviews = await prisma.review.findMany({
    take: pagination.take,
    skip: pagination.skip,
    where: {
      ...searchQuery,
    },
    orderBy,
    include: {
      product: true,
      customer: true,
    }
  });

  pagination.count = reviews.length;
  pagination.total = await prisma.review.count({
    where: {
      ...searchQuery,
    }
  });

  pagination.hasNext = hasNextCalculate(pagination);

  return json({reviews: reviews.map(reviewMapper), query: makeQuery(search, sort), pagination});
}

export type TAdminReviewsLoader = typeof loader;
export type TAdminReviewsLoaderData = SerializeFrom<typeof loader>;
