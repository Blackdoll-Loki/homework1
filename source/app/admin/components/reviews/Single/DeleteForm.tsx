import {Box, Button, Divider, InlineStack, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import type {TProductDto} from '~/.server/admin/dto/product.dto';
import {deleteFormValidator} from '~/admin/components/products/Single/DeleteForm.validator';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';
import { TReviewDto } from '~/.server/admin/dto/review.dto';

type Props = {
  review: Pick<TReviewDto, 'review'>;
  toggleActive: () => void;
}

export const DeleteForm: FC<Props> = (props) => {
  const {review, toggleActive} = props;

  return (
    <ValidatedForm validator={deleteFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.deleteProduct}/>
      </Box>
      <Box padding="400" paddingBlockStart="200">
        <Text as="p">
          Are you sure you want to delete review?
        </Text>
        <Text as="p">
        {review.review}
        </Text>
      </Box>
      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={'Delete'} variant="primary" tone="critical"/>
          <Button onClick={toggleActive}>Cancel</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
