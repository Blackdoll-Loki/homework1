import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {userMapper} from '~/.server/admin/mappers/user.mapper';
import {prisma} from '~/.server/shared/services/prisma.service';
import i18next from '~/i18next.server';

export async function adminDashboardLoader({request}: LoaderFunctionArgs) {
  const user = await getAuthUser(request)
  let lng = await i18next.getLocale(request, "dashboard", { keyPrefix: "welcome" });
  let t = i18next.createInstance().getFixedT(lng);

	let title = t("welcome");

  return json({user: userMapper(user),title});
}
