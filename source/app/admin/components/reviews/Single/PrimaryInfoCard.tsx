import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC} from 'react';
import { TReviewDto } from '~/.server/admin/dto/review.dto';

export type PrimaryInfoCardProps = {
  review: TReviewDto
}

export const PrimaryInfoCard: FC<PrimaryInfoCardProps> = ({review}) => {
  console.log('hi from primary', review)
  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Primary info
          </Text>
          <Button
            url={`${EAdminNavigation.productsReviews}/${review.id}/edit-primary`}
            accessibilityLabel="Edit primary info"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Review Id
          </Text>
          <Text as="p" variant="bodyMd">
            {review.id}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Product Id
          </Text>
          <Text as="p" variant="bodyMd">
            {review.product?.id || 'blablabal'}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Customer Id
          </Text>
          <Text as="p" variant="bodyMd">
            {review.customer?.id || 'blablabal'}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Rating
          </Text>
          <Text as="p" variant="bodyMd">
            {review.rating || 'blablabal'}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Review
          </Text>
          <Text as="p" variant="bodyMd">
            {review.review || 'blablabal'}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Created At
          </Text>
          <Text as="p" variant="bodyMd">
            {review.createdAt || 'blablabal'}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
        <Text as="h3" variant="headingXs" fontWeight="medium">
            Updated At
          </Text>
          <Text as="p" variant="bodyMd">
            {review.updatedAt || 'blablabal'}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};
