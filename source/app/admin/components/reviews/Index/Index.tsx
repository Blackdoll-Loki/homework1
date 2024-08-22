import {Card, IndexTable, Link,} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import type {NonEmptyArray} from '@shopify/polaris/build/ts/src/types';
import {IndexTableHeading} from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {usePagination} from '~/admin/hooks/usePagination';
import { TReviewDto } from '~/.server/admin/dto/review.dto';
import { TAdminReviewsLoaderData } from '~/.server/admin/loaders/reviews/index/loader';

export interface ListProps {
  reviews: TReviewDto[];
  query?: TAdminReviewsLoaderData['query'];
  pagination: IOffsetPaginationInfoDto;
}


export const Index: FC<ListProps> = ({reviews, query, pagination}) => {
  const paginationProps = usePagination(pagination);
  const resourceName = useMemo(() => ({
    singular: 'review',
    plural: 'reviews',
  }), []);

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(() => ([
    {title: 'review id'},
    {title: 'product id'},
    {title: 'customer id'},
    {title: 'review'},
  ]), []);

  const rowMarkup = reviews.map(
    (
      {id,review,rating,customer,product}, index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
      >
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.productsReviews}/${id}`}>{id}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{product?.id || '-/-'}</IndexTable.Cell>
        <IndexTable.Cell>{customer?.id || '-/-'}</IndexTable.Cell>
        <IndexTable.Cell>{review || '-/-'}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card padding="0">
      <IndexTable
        resourceName={resourceName}
        itemCount={reviews.length}
        selectable={false}
        headings={headings}
        pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
