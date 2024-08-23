import {BlockStack, Card, FormLayout, Text, SelectProps} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import { ValidatedSelect } from '~/admin/ui/ValidatedSelect/ValidatedSelect';


export const NewReviewCard = () => {

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
            name="product"
            autoComplete="off"
          />
          <ValidatedTextField
              label="First Name"
              type="text"
              name="firstName"
              autoComplete="given-name"
            />
          <ValidatedTextField
              label="Last Name"
              type="text"
              name="lastName"
              autoComplete="family-name"
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
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
