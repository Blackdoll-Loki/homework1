import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useRouteLoaderData} from '@remix-run/react';
import {TAdminCategoriesSingleLoader} from '~/.server/admin/loaders/categories/single/loader';
import {EditPrimaryForm} from '~/admin/components/categories/EditPrimaryForm/EditPrimaryForm';
import {editPrimaryFormValidator} from '~/admin/components/categories/EditPrimaryForm/EditPrimaryForm.validator';

export {action} from '~/.server/admin/actions/categories/edit-primary/action';

export default function AdminReviewIdEditPrimary() {
  const data = useRouteLoaderData<TAdminCategoriesSingleLoader>('routes/admin.categories.$id');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  if (!data?.review) {
    return null;
  }

  return (
    <ValidatedForm validator={editPrimaryFormValidator} method="post">
      <Page
        title="Edit category primary info"
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
