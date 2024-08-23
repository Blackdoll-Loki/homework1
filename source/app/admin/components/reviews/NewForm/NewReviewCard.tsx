import {BlockStack, Card, FormLayout, Text, SelectProps} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import { ValidatedSelect } from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import { TReviewDto } from '~/.server/admin/dto/review.dto';


type Props = {
  review?: Omit<TReviewDto, 'review'>
}

export const NewReviewCard: FC<Props> = (props) => {
  const {review} = props;

  const rateOptions: SelectProps['options'] = useMemo(() => ([
    {
      label: 'Rating',
      value: '0',
    },
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },{
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    }
  ]), []);
  return (
    <Card>
      <BlockStack gap="200">
        <FormLayout>
          <ValidatedTextField
            label="Product"
            type="text"
            name="title"
            autoComplete="off"
            defaultValue={review?.product.title}
          />
          <ValidatedTextField
              label="First Name"
              type="text"
              name="firstName"
              autoComplete="given-name"
              defaultValue={review?.customer.firstName}
            />
          <ValidatedTextField
              label="Last Name"
              type="text"
              name="lastName"
              autoComplete="family-name"
              defaultValue={review?.customer.lastName}
          />
          <ValidatedSelect
            label="Rating"
            name="rating"
            options={rateOptions}
          />
          <ValidatedTextField
            label="Review"
            type="text"
            name="review"
            multiline={4}
            autoComplete="off"
            defaultValue={review?.review}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
