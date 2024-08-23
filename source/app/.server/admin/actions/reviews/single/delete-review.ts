import {prisma} from '~/.server/shared/services/prisma.service';
import {redirect} from '@remix-run/node';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {$Enums} from '@prisma/client';

type Args = {
  id: number;
}

export async function deleteReview({id}: Args) {

  // update product
  await prisma.review.update({
    where: {id: Number(id)},
    data: {
      deletedAt: new Date()
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.productsReviews}/${id}`);
}
