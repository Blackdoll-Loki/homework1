import {LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';

export async function adminAuthLoader({request}: LoaderFunctionArgs) {
  try{
    await getAuthUser(request);
    return redirect(EAdminNavigation.dashboard)
  }catch(e){
    return null
  }
}
