import {Card, IndexTable, Link,} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import type {NonEmptyArray} from '@shopify/polaris/build/ts/src/types';
import {IndexTableHeading} from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {usePagination} from '~/admin/hooks/usePagination';
import type {TAdminReviewsSingleLoader} from '~/.server/admin/loaders/reviews/single/loader';
import { TReviewDto } from '~/.server/admin/dto/review.dto';

export interface ListProps {
  reviews: TReviewDto[];
  query?: TAdminReviewsSingleLoader['query'];
}


export const ReviewsTable: FC<ListProps> = ({reviews, query,}) => {
  // const paginationProps = usePagination(pagination);
  const resourceName = useMemo(() => ({
    singular: 'review',
    plural: 'reviews',
  }), []);


  const headings: NonEmptyArray<IndexTableHeading> = useMemo(() => ([
    {title: 'id'},
    {title: 'customerId'},
    {title: 'review'},
    {title: 'rating'},
  ]), []);

  const rowMarkup = reviews.map(
    (
      {id, customerId, review, rating},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
      >
        <IndexTable.Cell>{id}</IndexTable.Cell>
        <IndexTable.Cell>{customerId}</IndexTable.Cell>
        <IndexTable.Cell>{review.slice(0, 20)}</IndexTable.Cell>
        <IndexTable.Cell>{rating}</IndexTable.Cell>
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
       // pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
