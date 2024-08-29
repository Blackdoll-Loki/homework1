import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {userMapper} from '~/.server/admin/mappers/user.mapper';
import {prisma} from '~/.server/shared/services/prisma.service';


export async function adminLoader({request}: LoaderFunctionArgs) {
  if (request.url.includes(EAdminNavigation.authLogin)) {
    return json({user: null});
  }

  const user = await getAuthUser(request)

  return json({user: userMapper(user)});
}
