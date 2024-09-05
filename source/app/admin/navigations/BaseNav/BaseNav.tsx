import {Navigation} from '@shopify/polaris';
import {HomeIcon, OrderIcon, PersonIcon, ProductIcon, WorkIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {useLocation} from 'react-router';
import { FC, useMemo } from 'react';
import { hasAdminRole } from '~/admin/utils/access.util';
import { TUserDto } from '~/.server/admin/dto/user.dto';
import { useTranslation } from "react-i18next";

type Props = {
  user: TUserDto;
}

export const BaseNav: FC<Props> = ({ user }) => {
  const location = useLocation();
  let { t } = useTranslation();

  const items = useMemo(() => {
    if (!hasAdminRole(user)) {
      return [
        {
          url: EAdminNavigation.dashboard,
          label: t("home"),
          icon: HomeIcon,
          matchPaths: [EAdminNavigation.dashboard],
        },
        {
          url: EAdminNavigation.products,
          label: t("products"),
          icon: ProductIcon,
        },
      ];
    }

    return [
      {
        url: EAdminNavigation.dashboard,
        label: t("home"),
        icon: HomeIcon,
        matchPaths: [EAdminNavigation.dashboard]
      },
      {
        url: EAdminNavigation.users,
        label: t("users"),
        icon: WorkIcon,
        matchPaths: [EAdminNavigation.users]
      },
      {
        url: EAdminNavigation.customers,
        label: t("customers"),
        icon: PersonIcon,
      },
      {
        url: EAdminNavigation.products,
        label: t("products"),
        icon: ProductIcon,
        subNavigationItems: [
          {
            url: EAdminNavigation.categories,
            disabled: false,
            label: 'Categories',
          },
          {
            url: EAdminNavigation.productsReviews,
            disabled: false,
            label: 'Product reviews',
          },
        ],
      },
      {
        url: EAdminNavigation.orders,
        label: t("orders"),
        icon: OrderIcon,
        subNavigationItems: [
          {
            url: EAdminNavigation.carts,
            disabled: false,
            label: 'Carts',
          },
        ],
      },
    ];
  }, [user.role]);


  return (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={items}
      />
    </Navigation>
  );
};
