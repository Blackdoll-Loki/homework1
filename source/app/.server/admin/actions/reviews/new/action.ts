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

  const {product, rating, description, customer} = data.data;

  const newReview = await prisma.review.create({
    data: {
      product,
      rating,
      description,
      customer
    }
  });

  return redirect(`${EAdminNavigation.productsReviews}/${newReview.id}`);
}
