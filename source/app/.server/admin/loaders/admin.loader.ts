import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {userMapper} from '~/.server/admin/mappers/user.mapper';
import {prisma} from '~/.server/shared/services/prisma.service';


export async function adminLoader({request}: LoaderFunctionArgs) {
  if (request.url.includes(EAdminNavigation.authLogin)) {
    return json({user: null});
  }

  const {id} = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const user = await prisma.user.findUnique({where: {id, deletedAt: null}});

  if (!user) {
    return await authenticator.logout(request, {redirectTo: EAdminNavigation.authLogin});
  }


  console.log('request.url.includes(EAdminNavigation.dashboard)', request.url.includes(EAdminNavigation.dashboard))
  console.log('user.role not admin', user.role !== 'ADMIN')
  if (user.role !== 'ADMIN') {
    if (
      request.url.includes(EAdminNavigation.dashboard) ||
      request.url.includes(EAdminNavigation.products) ||
      request.url.includes(EAdminNavigation.authLogout)
    ) {
      return json({ user: userMapper(user) });
    } else {
      return redirect(EAdminNavigation.dashboard);
    }
  }

  return json({user: userMapper(user)});
}
