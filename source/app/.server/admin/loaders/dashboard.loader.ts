import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {userMapper} from '~/.server/admin/mappers/user.mapper';
import {prisma} from '~/.server/shared/services/prisma.service';

export async function adminDashboardLoader({request}: LoaderFunctionArgs) {
  const user = await getAuthUser(request)

  return json({user: userMapper(user)});
}
