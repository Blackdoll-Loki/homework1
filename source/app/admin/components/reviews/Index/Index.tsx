import {Card, IndexTable, Link,} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import type {NonEmptyArray} from '@shopify/polaris/build/ts/src/types';
import {IndexTableHeading} from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {usePagination} from '~/admin/hooks/usePagination';
import { TReviewDto } from '~/.server/admin/dto/review.dto';
import { TAdminReviewsLoaderData } from '~/.server/admin/loaders/reviews/index/loader';
import { Filters } from './Filters';

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
    {title: 'Review Id'},
    {title: 'Product Id'},
    {title: 'Customer Id'},
    {title: 'Review'},
    {title: 'Rating'},
    {title: 'Created At'},
    {title: 'Deleted At'},

  ]), []);

  const rowMarkup = reviews.map(
    (
      {id,review,rating,customer,product, createdAt, deletedAt}, index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
      >
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.productsReviews}/${id}`}>{id}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{product.id || '-/-'}</IndexTable.Cell>
        <IndexTable.Cell>{customer.firstName + ' ' + customer.lastName}</IndexTable.Cell>
        <IndexTable.Cell>{review.slice(0, 15)}</IndexTable.Cell>
        <IndexTable.Cell>{rating}</IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{deletedAt}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card padding="0">
      <Filters query={query}/>
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
