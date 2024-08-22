export default function AdminReviewsIndex() {
  const data = useLoaderData<TAdminProductsLoader>();

  return (
    <Page
      fullWidth
      title="Reviews"
      primaryAction={{
        content: 'Create review',
        icon: PlusIcon,
        accessibilityLabel: 'Create review',
        url: EAdminNavigation.productsCreate,
      }}
    >
      <Index products={data.products} query={data.query} pagination={data.pagination}/>
    </Page>
  );
}
