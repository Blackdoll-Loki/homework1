import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
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

type CategoryOrderByWithRelationInput = Prisma.CategoryOrderByWithRelationInput;


export const reviewQueryValidator = withZod(
  z.object({
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({request}: LoaderFunctionArgs) {
  const searchParams = requestToSearchParams(request);
  const {data} = await reviewQueryValidator.validate(
    searchParams
  );
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



  const reviews = await prisma.reviews.findMany({
    take: pagination.take,
    skip: pagination.skip,
    where: {
      ...searchQuery,
    },
    orderBy
  });

  pagination.count = reviews.length;
  pagination.total = await prisma.category.count({
    where: {
      ...searchQuery,
    }
  });

  pagination.hasNext = hasNextCalculate(pagination);

  return json({reviews: reviews.map(reviewMapper), query: makeQuery(search, sort, data), pagination});
}

export type TAdminReviewsLoader = typeof loader;
export type TAdminReviewsLoaderData = SerializeFrom<typeof loader>;
