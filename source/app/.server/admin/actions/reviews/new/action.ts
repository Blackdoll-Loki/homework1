import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {newFormValidator} from '~/admin/components/reviews/NewForm/NewForm.validator'
;

export async function action({request}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });
  console.log('Hi from action')
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

  console.log(customerInDB)

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

  return redirect(`${EAdminNavigation.productsReviews}/${newReview.id}`);
}
