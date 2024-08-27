import {Navigation} from '@shopify/polaris';
import {HomeIcon, OrderIcon, PersonIcon, ProductIcon, WorkIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {useLocation} from 'react-router';

export const StuffBaseNav = () => {
  const location = useLocation();

  return (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={[
          {
            url: EAdminNavigation.dashboard,
            label: 'Home',
            icon: HomeIcon,
            matchPaths: [EAdminNavigation.dashboard]
          },
          {
            url: EAdminNavigation.products,
            label: 'Products',
            icon: ProductIcon,
          },
        ]}
      />
    </Navigation>
  );
};
