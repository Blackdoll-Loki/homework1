import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {userMapper} from '~/.server/admin/mappers/user.mapper';
import {prisma} from '~/.server/shared/services/prisma.service';
import i18next from '~/.server/shared/services/i18next.service';


export async function adminDashboardLoader({request}: LoaderFunctionArgs) {
  const user = await getAuthUser(request)

  let t = await i18next.getFixedT(request);
	let title = t("page.dashboard.meta.title");

  return json({user: userMapper(user), meta: {title}});
}
