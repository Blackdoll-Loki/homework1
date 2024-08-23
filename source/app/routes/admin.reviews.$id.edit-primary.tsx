import React, {useCallback} from 'react';
import {Page, Box} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useRouteLoaderData} from '@remix-run/react';
import {TAdminReviewsSingleLoader} from '~/.server/admin/loaders/reviews/single/loader';
import {EditPrimaryForm} from '~/admin/components/reviews/EditPrimaryForm/EditPrimaryForm';
import {editPrimaryFormValidator} from '~/admin/components/reviews/EditPrimaryForm/EditPrimaryForm.validator';
import { EAdminReviewAction } from '~/admin/constants/action.constant';
import { ValidatedAction } from '~/admin/ui/ValidatedAction/ValidatedAction';

export {action} from '~/.server/admin/actions/reviews/single/action';

export default function AdminReviewIdEditPrimary() {
  const data = useRouteLoaderData<TAdminReviewsSingleLoader>('routes/admin.reviews.$id');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  if (!data?.review) {
    return null;
  }

  return (
    <ValidatedForm validator={editPrimaryFormValidator} method="post">
      <Page
        title="Edit review primary info"
        backAction={{
          url: `${EAdminNavigation.productsReviews}/${data.review.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <EditPrimaryForm review={data.review}/>
      </Page>
    </ValidatedForm>
  );
}
