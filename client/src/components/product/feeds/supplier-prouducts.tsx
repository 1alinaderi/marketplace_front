import { useProductQuery } from '@framework/product/get-supplier-product';
import ProductsCarousel from '@components/product/products-carousel';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';

export default function SupplierProducts({_id}) {
  const { data, isLoading, error } = useProductQuery(_id);
  return (
    <ProductsCarousel
      sectionHeading={_id + " Products"}
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.CHIPS_PRODUCTS_LIMITS}
      uniqueKey="chips-product"
      type
    />
  );
}
