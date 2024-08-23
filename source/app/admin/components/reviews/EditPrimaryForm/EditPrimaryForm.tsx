import {BlockStack, Box, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import { TReviewDto } from '~/.server/admin/dto/review.dto';
import { NewReviewCard } from '../NewForm/NewReviewCard';
import { EAdminReviewAction } from '~/admin/constants/action.constant';
import { ValidatedAction } from '~/admin/ui/ValidatedAction/ValidatedAction';


type Props = {
  review: TReviewDto
}

export const EditPrimaryForm: FC<Props> = ({review}) => {
  return (
    <Box paddingBlockEnd="500">
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminReviewAction.updateReview}/>
      </Box>
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <NewReviewCard review={review}/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
