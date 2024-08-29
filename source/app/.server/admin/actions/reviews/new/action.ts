import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {newFormValidator} from '~/admin/components/reviews/NewForm/NewForm.validator'
;
import { hasAdminRoleOrRedirect } from '~/.server/shared/utils/auth.util';

export async function action({request}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request)
  hasAdminRoleOrRedirect(authUser)

  // validate form data
  const data = await newFormValidator.validate(
    await request.formData()
  );
  //console.log('action data from', data)

  if (data.error) {
    return validationError(data.error);
  }

  const {title, review, customer} = data.data;

  const rating = parseInt(data.data.rating, 10);

  const productInDB = await prisma.product.findFirst({
    where: {
      OR: [
        { title: data.data.title },
        { slug: data.data.title },
      ],
    },
  });

  if (!productInDB) {
    throw new Error("Product not found");
  }

  let customerInDB = await prisma.customer.findFirst({
    where: {
      firstName: data.data.firstName,
      lastName: data.data.lastName,
    },
  });

  if (!customerInDB) {
    customerInDB = await prisma.customer.create({
      data: {
        firstName: data.data.firstName,
        lastName: data.data.lastName,
      },
    });
  }


  const newReview = await prisma.review.create({
    data: {
      product:{
        connect: { id: productInDB.id },
      },
      rating,
      review,
      customer: {
        connect: {
          id: customerInDB.id
        }
      }
    }
  });

  const totalReviews = productInDB.totalReviews + 1;
  const avgRate = Math.round(((productInDB.avgRate * (productInDB.totalReviews || 0)) + rating) / totalReviews);

  await prisma.product.update({
    where: { id: productInDB.id },
    data: {
      avgRate,
      totalReviews
    }
  });

  return redirect(`${EAdminNavigation.productsReviews}/${newReview.id}`);
}
