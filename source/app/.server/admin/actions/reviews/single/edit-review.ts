import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {redirect} from '@remix-run/node';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {editPrimaryFormValidator} from '~/admin/components/reviews/EditPrimaryForm/EditPrimaryForm.validator';
import { Toast } from 'node_modules/@shopify/polaris/build/ts/src/index';

type Args = {
  id: number;
  formData: FormData;
}

export async function editReview({id, formData}: Args) {

  // validate form data
  const data = await editPrimaryFormValidator.validate(
    formData
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {title, firstName, lastName, rating, review} = data.data

  await prisma.review.update

  const product = await prisma.product.findFirst({
    where: {
      title
    }
  });

  const customer = await prisma.customer.findFirst({
    where: {
      firstName,
      lastName
    }
  })
  console.log("customer", customer)

  const totalReviews = product.totalReviews + 1;
  const averageRate = Math.round((product.avgRate + Number(rating)) / totalReviews * 100) / 100

  await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      avgRate: averageRate,
      totalReviews: totalReviews
    }
  });

  await prisma.review.update({
    where: {
      id,
    },
    data: {
      rating: Number(rating),
      review
    }
  });


  return redirect(`${EAdminNavigation.productsReviews}/${id}`);
}
