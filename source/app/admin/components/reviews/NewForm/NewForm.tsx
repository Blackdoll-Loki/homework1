import {BlockStack, Box, Layout} from '@shopify/polaris';
import React from 'react';
import { NewReviewCard } from './NewReviewCard';

export const NewForm = () => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <NewReviewCard/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
