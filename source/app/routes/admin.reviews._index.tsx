import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import {PlusIcon} from '@shopify/polaris-icons';
import {Page} from '@shopify/polaris';
import {Index} from '~/admin/components/reviews/Index/Index';
import {useLoaderData} from '@remix-run/react';
import { TAdminReviewsLoaderData } from "~/.server/admin/loaders/reviews/index/loader";

export {loader} from '~/.server/admin/loaders/reviews/index/loader';

export default function AdminReviewsIndex() {
  const data = useLoaderData<TAdminReviewsLoaderData>();

  return (
    <Page
      fullWidth
      title="Reviews"
      primaryAction={{
        content: 'Create review',
        icon: PlusIcon,
        accessibilityLabel: 'Create review',
        url: EAdminNavigation.reviewCreate,
      }}
    >
      <Index reviews={data.reviews} query={data.query} pagination={data.pagination}/>
    </Page>
  );
}
